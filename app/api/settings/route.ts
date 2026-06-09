import { NextResponse} from "next/server";
import db from "@/app/lib/editor-db"

export async function GET() {
    const rows = db.prepare("SELECT key, value FROM settings").all() as {key: string, value: string}[];
    const settings = Object.keys(rows.map(r => [r.key, r.value]));
    return NextResponse.json(settings);
}

export async function PUT(req: Request) {
    const body = await req.json()
    for (const [key, value] of Object.entries(body)) {
        db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?")
            .run(key, value, value);
    }
    return NextResponse.json({ok: true});
}