import dbManager from "@/app/lib/db/db-manager";

const db = dbManager.get("users");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         username TEXT UNIQUE NOT NULL,
                                         password TEXT NOT NULL,
                                         role TEXT DEFAULT 'user'
    )
`);
const checkUser = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };

if (!checkUser || checkUser.count === 0) {  // ← .count here
    const insertAdmin = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    insertAdmin.run('admin', 'admin');
}
export default db;