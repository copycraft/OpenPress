import dbManager from "@/app/lib/db/db-manager";

const db = dbManager.get("pages");

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