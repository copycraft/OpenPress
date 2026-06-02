import Database from "better-sqlite3";
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(process.cwd(), "dbs");
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
}
const dbFile = path.resolve(dbPath, 'editor.db');
const db = new Database(dbFile);

db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
                                         id         INTEGER PRIMARY KEY AUTOINCREMENT,
                                         title      TEXT NOT NULL,
                                         slug       TEXT UNIQUE NOT NULL,
                                         content    TEXT DEFAULT '[]',
                                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

export default db;