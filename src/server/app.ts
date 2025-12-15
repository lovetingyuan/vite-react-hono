import { Hono } from 'hono'

const api = new Hono()

// We strongly recommend that you use the full API path to define routes.
api.get('/test', c => {
  return c.json({ text: 'this is api response, count is ' + c.req.query('count') })
})

export { api }
