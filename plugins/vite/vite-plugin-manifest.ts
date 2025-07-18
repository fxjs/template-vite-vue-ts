import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

export interface ManifestOptions {
  output?: string; // 新生成 manifest.json 的输出目录，默认为 dist
  filename?: string; // manifest 文件名，默认为 manifest.json
  preload?: string[]; // 预加载资源列表，既可以配置手动指定的资源，也会从自动生成的 manifest 中提取资源名称
  exclude?: string[]; // 要排除的资源列表，支持使用通配符 '*' 进行模糊匹配
  enableLog?: boolean; // 日志开关，默认关
}

/**
 * 创建日志对象
 * 根据 options.enableLog 判断是否输出日志，会在日志中附带时间戳和详细信息
 */
function createLogger(options: ManifestOptions) {
  const enableLog = !!options.enableLog;
  const getTime = () => new Date().toLocaleString();
  return {
    log: (...args: any[]) => {
      if (enableLog) {
        console.log(`[${getTime()}] [INFO]`, ...args);
      }
    },
    warn: (...args: any[]) => {
      if (enableLog) {
        console.warn(`[${getTime()}] [WARN]`, ...args);
      }
    },
    error: (...args: any[]) => {
      if (enableLog) {
        console.error(`[${getTime()}] [ERROR]`, ...args);
      }
    },
  };
}

/**
 * 判断 file 是否符合排除规则
 * @param file 要判断的文件名
 * @param patterns 排除规则数组，支持通配符 '*'，如 "chunk-*.js"
 * @returns 如果 file 匹配任一规则，则返回 true
 */
function isExcluded(file: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    // 转义正则特殊字符后将 '*' 转换为 '.*'
    const regexStr = '^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$';
    const regex = new RegExp(regexStr);
    return regex.test(file);
  });
}

export function manifestPlugin(options: ManifestOptions = {}): Plugin {
  // 使用默认选项配置
  const outputDir = options.output || 'dist';
  const filename = options.filename || 'manifest.json';
  const manualPreload = options.preload || [];
  const exclude = options.exclude || [];
  const logger = createLogger(options); // 封装后的日志输出对象

  return {
    name: 'manifest',
    apply: 'build',
    async closeBundle() {
      logger.log('开始生成新的 Manifest 文件');
      logger.log('当前工作目录：', process.cwd());
      logger.log('产物目录设置为：', outputDir);

      // 自动生成的 manifest 文件路径（位于产物目录下的 .vite 目录内）
      const autoManifestPath = path.resolve(process.cwd(), outputDir, '.vite', 'manifest.json');
      logger.log('自动生成的 manifest 路径：', autoManifestPath);
      let autoManifest: Record<string, any> = {};

      try {
        if (fs.existsSync(autoManifestPath)) {
          logger.log('检测到自动生成的 manifest 文件，正在读取...');
          const content = fs.readFileSync(autoManifestPath, 'utf-8');
          autoManifest = JSON.parse(content);
          logger.log('成功读取自动生成的 manifest 文件');
        } else {
          logger.warn(`未找到自动生成的 manifest 文件: ${autoManifestPath}`);
        }
      } catch (error) {
        logger.error(`解析自动生成 manifest 文件时发生错误: ${error}`);
      }

      // 提取每一项的 file 字段和 css 数组中的所有文件，统计排除以及保留的资源
      logger.log('开始提取预加载资源');
      const autoResources: string[] = [];
      const excludedResources: string[] = [];

      Object.values(autoManifest).forEach((item: any) => {
        if (item.file) {
          if (!isExcluded(item.file, exclude)) {
            autoResources.push(item.file);
          } else {
            excludedResources.push(item.file);
          }
        }
        if (item.css && Array.isArray(item.css)) {
          item.css.forEach((cssFile: string) => {
            if (!isExcluded(cssFile, exclude)) {
              autoResources.push(cssFile);
            } else {
              excludedResources.push(cssFile);
            }
          });
        }
      });

      logger.log('自动收集到的资源数量：', autoResources.length);
      logger.log('被 exclude 排除的资源数量：', excludedResources.length);
      if (excludedResources.length > 0) {
        logger.log('被排除的资源列表：', excludedResources);
      }

      // 合并手动预加载和自动收集的资源，避免重复
      const preloadSet = new Set([...manualPreload, ...autoResources]);
      logger.log('最终预加载资源总数（包含手动配置）：', preloadSet.size);
      const manifestData = {
        preload: Array.from(preloadSet),
        exclude, // （可选）记录排除列表
        buildTime: Date.now(),
      };

      // 写入新的 manifest 文件
      const manifestOutputPath = path.resolve(process.cwd(), outputDir, filename);
      logger.log('将写入新的 manifest 文件到：', manifestOutputPath);
      try {
        fs.mkdirSync(path.dirname(manifestOutputPath), { recursive: true });
        fs.writeFileSync(manifestOutputPath, JSON.stringify(manifestData, null, 2));
        logger.log(`新的 Manifest 文件生成成功: ${manifestOutputPath}`);
      } catch (error) {
        logger.error(`生成新的 Manifest 文件失败: ${error}`);
      }

      // 删除产物目录下的 .vite 目录
      const viteDir = path.resolve(process.cwd(), outputDir, '.vite');
      logger.log('开始清理临时目录：', viteDir);
      try {
        if (fs.existsSync(viteDir)) {
          fs.rmSync(viteDir, { recursive: true, force: true });
          logger.log(`临时目录已成功删除: ${viteDir}`);
        } else {
          logger.log('无临时目录需要删除');
        }
      } catch (error) {
        logger.error(`删除 .vite 目录失败: ${error}`);
      }
      logger.log('Manifest 生成流程结束');
    },
  };
}
