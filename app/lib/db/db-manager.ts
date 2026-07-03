import Database from "better-sqlite3";
import path from 'path';
import fs from 'fs';

class DatabaseManager {
    private connections: Map<string, Database.Database> = new Map();
    private dbFolder: string;

    constructor() {
        this.dbFolder = path.resolve(process.cwd(), "dbs");
        if (!fs.existsSync(this.dbFolder)) {
            fs.mkdirSync(this.dbFolder, { recursive: true });
        }
    }

    public get (name:string): Database.Database {
        if (this.connections.has(name)) {
            return this.connections.get(name)!;
        }

        const dbFile = path.resolve(this.dbFolder, `${name}.db`);
        const db = new Database(dbFile, {timeout:5000,});
        db.pragma("journal_mode = WAL")
        db.pragma("synchronous = NORMAL") //ai said this makes it faster
        this.connections.set(name, db);
        return db;
    }


}
const dbManager = new DatabaseManager();
export default dbManager;