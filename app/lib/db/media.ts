import dbManager from "@/app/lib/db/db-manager";

const db = dbManager.get("media");

db.exec(`
    CREATE TABLE IF NOT EXISTS media (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         filename TEXT NOT NULL,
                                         filepath TEXT NOT NULL,
                                         uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

export default db;