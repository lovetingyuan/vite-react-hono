import { Hono } from 'hono'

const api = new Hono()

// Mock database
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]

// We strongly recommend that you use the full API path to define routes.
api.get('/test', c => {
  return c.json({ text: 'this is api response, count is ' + c.req.query('count') })
})

// Example 1: GET items list
api.get('/items', c => {
  return c.json(items)
})

// Example 2: POST add item
api.post('/items', async c => {
  const { name } = await c.req.json()
  const newItem = { id: Date.now(), name }
  items.push(newItem)
  return c.json(newItem, 201)
})

// Example 3: DELETE item
api.delete('/items/:id', c => {
  const id = Number(c.req.param('id'))
  items = items.filter(item => item.id !== id)
  return c.json({ success: true })
})

export { api }
