# Vite项目基础模板包

---

项目初始包集成：
 - 代码规范：Eslint + Prettier + Husky + CommitLint
 - 构建系统：Turborepo
 - 组件库：naive-ui
 - 图标库：@kalimahapps/vue-icons
 - 常用库：echarts、dayjs、rxjs等
 - lib库：集成lib.js（提供：获取URL参数`window.$_getUrlParams`、脚本注入`window.$_ScriptInjector`）


功能特性 **todo**：
 - [ ] manifest改造
 - [ ] 请求库集成
 - [ ] 皮肤库集成
 - [ ] 工具类库集成
 - [ ] 版本插件集成
 - [ ] 配置环境集成
 - [ ] CI/CD集成

### 拉取模板代码
```shell
npx degit https://github.com/fxjs/template-vite-vue-ts.git xxx-lib

# 建议更改 `package.json` 里 name 为对应的项目名，如： { name: 'xxx-lib' }
```

### 安装依赖
> pnpm i


### 启动项目
> pnpm dev


### 打包
> pnpm build


### 配置 `turborepo`
开启缓存 `turbo.json`
```json5
{
  "pipeline": {
    "build": {
      "cache": true, // 开启
    },
  }
}
```
配置远程缓存服务 `.turbo/config.json`
```json5
{
  "teamid": "team_xxx",
  "apiurl": "http://172.19.12.69:9000" // 服务地址
}
```
构建
> pnpm build:turbo
---

