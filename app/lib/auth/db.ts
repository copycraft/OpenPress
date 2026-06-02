import Database from "better-sqlite3";
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(process.cwd(), "dbs");
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
}
const dbFile = path.resolve(dbPath, 'openpress.db');
const db = new Database(dbFile);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         username TEXT UNIQUE NOT NULL,
                                         password TEXT NOT NULL,
                                         role TEXT DEFAULT 'user'
    );

    CREATE TABLE IF NOT EXISTS media (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         filename TEXT NOT NULL,
                                         filepath TEXT NOT NULL,
                                         uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);
 // i am not sure if default admin is fine, that
// might open up to exploits later on, cuz if someone manually sends an api request
// then it might default to admin, but i ain no expert so correct me if im wrong

const checkUser = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };

if (!checkUser || checkUser.count === 0) {  // ← .count here
    const insertAdmin = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    insertAdmin.run('admin', 'admin');
}

export default db;