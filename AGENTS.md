# 为编程代理提供的指引信息

## 开发者提示

- **开发环境**: Windows 11 + VSCode + Node 24
- **项目类型**: 基于 React + Vite + Hono + TypeScript 的全栈项目，采用前后端分离架构。
- **构建与运行**:
  - `npm run dev`: 启动开发服务器（app 和 server 会同时运行，借助于 `@hono/vite-dev-server`）。
  - `npm run build`: 全量构建项目。构建产物位于 `dist` 目录。
  - `npm run preview`: 在 `dist` 目录下运行 `server.js` 启动生产环境服务。
- **校验规范**:
  - 本项目严格执行 TypeScript 类型校验及 ESLint 校验。
  - `npm run typecheck`: 执行 TypeScript 类型检查。
  - `npm run lint`: 执行 ESLint 代码风格检查。
- **注释要求**: 对重要的逻辑更改必须提供准确的英文注释，确保代码可维护性。

## 技术实现概览

### 前端架构 (app)

- **核心框架**: React 19 + React Router 7。
- **路由机制**: 采用约定式路由（Convention-based Routing），通过 `vite-plugin-convention-route` 实现，路由定义位于 `app/src/pages` 目录。
- **样式方案**: Tailwind CSS v4 + DaisyUI v5。
- **状态管理**: `react-atomic-store`。这是一个高性能、API 简洁的状态管理库，支持完善的 TypeScript 类型。
- **数据请求**: SWR。结合 Hono RPC 客户端实现类型安全的 API 请求。
- **构建优化**: 使用 `babel-plugin-react-compiler` 提升 React 渲染性能。
- **项目目录**
  - app/src/assets 存放静态资源。
  - app/src/components 存放与业务无关的公共基础组件。
  - app/src/pages 存放与业务相关的页面组件，采用路径约定式路由。
  - app/src/swr 存放使用 swr hook 封装的 API 请求。
  - app/src/store.ts 存放全局状态。

### 后端架构 (server)

- **核心框架**: Hono。
- **API 通讯**: 使用 Hono RPC 模式。通过在 `server/src/app.ts` 中导出 `AppType`，前端可以获得完全类型安全的 API 调用能力。
- **数据校验**: `@hono/zod-validator` + Zod。所有 API 输入（JSON、Query、Param）均需进行严格校验。
- **集成模式**: 开发环境下通过 Vite 插件将 Hono 集成为开发服务器，生产环境下 Hono 负责托管静态文件并提供 API 接口。

### 工程化 (Monorepo)

- **包管理**: 使用 NPM Workspaces 管理 `app` 和 `server` 两个子项目。
- **依赖引用**: `app` 直接引用本地的 `server` 包以共享类型定义。

## 编程指引与规范

- **类型安全**: 始终优先定义接口或 Zod Schema。修改 API 时，必须同步更新 `AppType` 以确保前端感知。
- **路由扩展**: 在 `app/src/pages` 下增加文件即可自动生成路由。遵循目录结构即路由路径的原则。
- **状态修改**: 使用 `react-atomic-store` 进行全局状态管理，参考 `app/src/store.ts`。
- **样式使用**: 优先使用 Tailwind 类名，复杂组件可结合 DaisyUI 提供的 UI 类。
- **API 定义**: API 路由建议在 `server/src/app.ts` 中以链式调用的方式定义，便于类型推导。
- **额外输出规范**: - 每当你完成代码修改、修复或文档更新后，请在回复的末尾提供一个符合 Conventional Commits 规范（https://www.conventionalcommits.org/）的提交信息。

  格式：<类型>[可选作用域]: <描述>

  常见类型：feat (新功能), fix (修补), docs (文档), style (格式), refactor (重构), test (测试), chore (构建/辅助工具)。

  示例：feat(ui): add submit button
