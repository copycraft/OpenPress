import { NextResponse } from "next/server";
import db from "@/app/lib/db/pages";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = db.prepare("SELECT * FROM pages WHERE slug = ?").get(slug);
    if (!page) return NextResponse.json({ error: "page not found" }, { status: 404 });
    return NextResponse.json(page);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { title, content } = await req.json();
    db.prepare("UPDATE pages SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?")
        .run(title, JSON.stringify(content), slug);
    return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    db.prepare("DELETE FROM pages WHERE slug = ?").run(slug);
    return NextResponse.json({ ok: true });
}

//used ai here cuz im confused?