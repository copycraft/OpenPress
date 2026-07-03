import dbManager from "@/app/lib/db/db-manager";

const db = dbManager.get("settings");

db.exec(`
    CREATE TABLE IF NOT EXISTS settings(
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
    );
`);

const checkSettings= db.prepare("SELECT count(*) as count FROM settings").get() as { count: number };
if (checkSettings.count === 0) {
    db.prepare("INSERT INTO settings (key,value) VALUES (?, ?)").run("site_title", "OpenPress")
}

export default db;