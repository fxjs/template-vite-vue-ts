# 文档

---

项目初始包集成：
 - 代码规范：Eslint + Prettier + Husky + CommitLint
 - 构建系统：Turborepo
 - 组件库：naive-ui
 - 图标库：@kalimahapps/vue-icons
 - 常用库：echarts、dayjs、rxjs等
 - lib.js集成：取URL参数`window.$_getUrlParams`、脚本注入`window.$_ScriptInjector`
 - 请求库集成：[使用文档](https://www.npmjs.com/package/@tanzerfe/http)
 - 皮肤库集成：扩展tailwindcss配置，支持亮色、暗色、自定义配色
 - Hooks集成：常用钩子函数封装


### 安装依赖
> pnpm i


### 启动项目
> pnpm dev


### 打包
> pnpm build


### 启动 mock 服务
进`mock`文件夹，执行：
> pnpm i && pnpm start

#### 默认账号： admin/123456


---
