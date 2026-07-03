import db from "./db/editor-db";

export function generateSlug(title:string): string{
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}
export function createUniqueSlug(title:string) : string {
    const base = generateSlug(title);

    const exists = db.prepare("SELECT slug FROM pages WHERE slug = ?");

    if (!exists) return base;
    let count = 2;
    while (true) {
        const candid = `${base}-${count}`;
        const taken = db.prepare("SELECT slug FROM pages WHERE slug = ?").get(candid);
        if (!taken) return candid;
        count++;
    }
}
