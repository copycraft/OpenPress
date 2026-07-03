import { NextResponse} from "next/server"
import db from "@/app/lib/db/pages";
import { createUniqueSlug} from "@/app/lib/slug-tool";

export async function GET() {
    const pages = db.prepare( "SELECT id, title, slug, created_at, updated_at FROM pages").all();
    return NextResponse.json( pages );
}

export async function POST(req:  Request) {
    const {title} = await req.json();

    if( !title ) return NextResponse.json({error: "Missing title"}, {status:400});
    const slug = await createUniqueSlug(title);
    const result = db.prepare("INSERT INTO pages (title, slug) VALUES (?, ?)").run(title, slug);
    const id  = result.lastInsertRowid
    return NextResponse.json({id , title, slug});
}