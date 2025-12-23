import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

// Define Zod schemas
const CreateItemSchema = z.object({
  name: z.string().min(1),
})

// Mock database
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]

// We strongly recommend that you use the full API path to define routes.
const api = new Hono()
  .get('/test', c => {
    return c.json({ text: 'this is api response, count is ' + c.req.query('count') })
  })
  .get('/items', c => {
    return c.json(items)
  })
  .post('/items', zValidator('json', CreateItemSchema), async c => {
    const { name } = c.req.valid('json')
    const newItem = { id: Date.now(), name }
    items.push(newItem)
    return c.json(newItem, 201)
  })
  .delete('/items/:id', zValidator('param', z.object({ id: z.string().transform(Number) })), c => {
    const { id } = c.req.valid('param')
    items = items.filter(item => item.id !== id)
    return c.json({ success: true })
  })

export type AppType = typeof api
export { api }
