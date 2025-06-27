import { Hono } from 'hono'

const api = new Hono()

api.get('/test', c => {
  return c.json({ text: 'this is api response' })
})

export { api }
