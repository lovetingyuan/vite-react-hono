import { Hono } from 'hono';

// We strongly recommend that you use the full API path to define routes.
const api = new Hono()
  .get('/health', (c) => {
    return c.json({ status: 'ok' });
  })
  .get('/test', (c) => {
    return c.json({ text: 'this is api response, count is ' + c.req.query('count') });
  });

/**
 * api definition
 */
export type AppType = typeof api;
export { api };
