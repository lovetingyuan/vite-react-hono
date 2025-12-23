import { hc } from 'hono/client'
import type { AppType } from '../server/app'

// 直接导出 hc 创建的客户端。
// 由于后端使用 app.route('/api', api) 将路由挂载在 /api 下，
// 且 AppType 定义了该 api 实例下的所有路由（不带 /api 前缀），
// 故此处设置基础路径为 '/api'。
export const api = hc<AppType>('/api')
