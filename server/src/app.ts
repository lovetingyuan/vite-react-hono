import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const counterQuerySchema = z.object({
  count: z.coerce.number().int().safe(),
});

// We strongly recommend that you use the full API path to define routes.
const api = new Hono()
  .get('/counter', zValidator('query', counterQuerySchema), (c) => {
    const { count } = c.req.valid('query');
    return c.json({
      count,
      text: `Server received count ${count}`,
    });
  });

/**
 * api definition
 */
export type AppType = typeof api;
export { api };
