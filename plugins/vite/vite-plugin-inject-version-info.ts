import { Plugin } from 'vite';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 获取最新的 commit id 和 commit 时间
function getGitCommitInfo() {
  const version = process.env.XF_VER || '';
  // const commit = execSync('git rev-parse HEAD').toString().trim(); // 获取最新的 commit id
  // const commitDate = execSync('git log -1 --format=%cd').toString().trim(); // 获取最新的提交时间
  const buildTime = new Date().toLocaleString();
  return { version, buildTime };
}

// 读取并解析 config.js 文件，如果不存在则返回一个空配置
function loadExistingConfig(filePath: string): any {
  if (fs.existsSync(filePath)) {
    const configContent = fs.readFileSync(filePath, 'utf-8');
    // 使用 `eval` 来解析 `config.js` 文件中的 window.$SYS_CFG
    const configEval = new Function('window', configContent);
    const window: any = { $SYS_CFG: {} };
    configEval(window);
    return window.$SYS_CFG;
  }
  return {}; // 如果文件不存在，返回一个空对象
}

// 写入配置文件
function writeConfig(filePath: string, config: any) {
  const configContent = `window.$SYS_CFG = ${JSON.stringify(config, null, 2)};`;
  fs.writeFileSync(filePath, configContent);
}

export function injectVersionInfoPlugin(): Plugin {
  return {
    name: 'inject-version-info',
    apply: 'build',
    closeBundle() {
      const configDir = path.resolve(__dirname, './../../dist/com/');

      // 获取所有 config-* 文件和 config.js
      const configFiles = fs
        .readdirSync(configDir)
        .filter((file) => file.startsWith('config-') || file === 'config.js');

      // 获取最新的 version 信息
      const versionInfo = getGitCommitInfo();

      // 更新每个配置文件的 version 信息
      configFiles.forEach((file) => {
        const filePath = path.join(configDir, file);
        const existingConfig = loadExistingConfig(filePath);
        existingConfig.version = versionInfo;
        writeConfig(filePath, existingConfig);
      });
    },
  };
}
