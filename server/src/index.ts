/**
 * TYPE FIX APPLIED - VITE_APP_PORT & VITE_APP_BUILD_TIME
 */
import { Hono } from 'hono';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { api } from './app'; // 确保正确导入你的 API 路由
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { styleText } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new Hono();

// 定义静态文件扩展名
const staticExtensions = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.json',
  '.xml',
  '.txt',
  '.mp3',
  '.mp4',
  '.map',
  '.webmanifest',
];

// 中间件：日志记录
app.use('*', async (c, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${styleText('magenta', '[Hono]')}: ${c.req.method} ${c.req.url}`);
  }
  await next();
});

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1. 优先处理 API 路由
app.route('/api', api);

// 2. 静态文件处理，hono的vite插件已经处理了静态文件的服务

// 3. SPA 路由回退处理
app.get('*', async (c) => {
  const path = c.req.path;

  // 再次检查是否为静态文件（防止遗漏）
  const hasStaticExtension = staticExtensions.some((ext) => path.endsWith(ext));

  if (hasStaticExtension) {
    // 静态文件已经在上面处理过了，如果到这里说明文件不存在
    return c.notFound();
  }

  // SPA 回退到 index.html

  const indexPath = join(__dirname, 'index.html');

  if (!existsSync(indexPath)) {
    throw new Error(`index.html not found at ${indexPath}`);
  }

  // 读取并返回 index.html
  const content = await readFile(indexPath, 'utf-8');

  return c.html(content, 200, {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  });
});

// 错误处理
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.text('Internal Server Error, ' + err.message, 500);
});

// 404 处理
app.notFound((c) => {
  return c.text('Not Found', 404);
});

export default app;

setTimeout(() => {
  // hono的插件会自动启动服务器
  const port = import.meta.env.VITE_APP_PORT || 3000;
  const buildTime = import.meta.env.VITE_APP_BUILD_TIME;
  console.log(`Build at ${buildTime ? new Date(Number(buildTime)).toLocaleString() : 'unknown'}`);
  console.log(`🌐 Server will be available at ${styleText('cyan', 'http://localhost:' + port)}`);
});
