import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../db';

const todoSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  completed: z.boolean(),
  created_at: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;

interface TodoRow {
  id: number;
  title: string;
  completed: number;
  created_at: string;
}

const todoRoute = new Hono()
  .get('/', (c) => {
    const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all() as unknown as TodoRow[];
    const result: Todo[] = todos.map(t => ({
      id: t.id,
      title: t.title,
      completed: !!t.completed,
      created_at: t.created_at
    }));
    return c.json(result);
  })
  .post('/', zValidator('json', todoSchema.pick({ title: true })), (c) => {
    const { title } = c.req.valid('json');
    const insert = db.prepare('INSERT INTO todos (title) VALUES (?)');
    const result = insert.run(title);
    return c.json({ id: Number(result.lastInsertRowid), title, completed: false }, 201);
  })
  .put('/:id', zValidator('json', todoSchema.partial()), (c) => {
    const id = c.req.param('id');
    const { title, completed } = c.req.valid('json');
    
    if (title !== undefined) {
      db.prepare('UPDATE todos SET title = ? WHERE id = ?').run(title, id);
    }
    if (completed !== undefined) {
      db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(completed ? 1 : 0, id);
    }
    
    return c.json({ success: true });
  })
  .delete('/:id', (c) => {
    const id = c.req.param('id');
    db.prepare('DELETE FROM todos WHERE id = ?').run(id);
    return c.json({ success: true });
  });

export default todoRoute;
