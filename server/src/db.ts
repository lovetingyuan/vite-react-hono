import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';

const dbPath = join(process.cwd(), 'todos.db');
const db = new DatabaseSync(dbPath);

// 初始化表
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export { db };
