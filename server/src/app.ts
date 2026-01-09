import { Hono } from 'hono';
import todoRoute from './routes/todo';

// We strongly recommend that you use the full API path to define routes.
const api = new Hono()
  .get('/health', (c) => {
    return c.json({ status: 'ok' });
  })
  .get('/test', (c) => {
    return c.json({ text: 'this is api response, count is ' + c.req.query('count') });
  })
  .route('/todos', todoRoute);

/**
 * api definition
 */
export type AppType = typeof api;
export { api };
