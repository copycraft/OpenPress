import { NextResponse} from "next/server"
import db from "@/app/lib/editor-db";
import { createUniqueSlug} from "@/app/lib/slug-tool";

export async function GET(_req: Request, {params} : {params: {slug: string}}) {
    const pages = db.prepare( "SELECT * FROM pages WHERE slug = ?").get(params.slug);
    return NextResponse.json( pages );
}

export async function POST(req:  Request) {
    const {title, content} = await req.json();

    db.prepare("UPDATE pages SET title=?, content = ?, content = ? , updated_at =  WHERE slug = ?")

    return NextResponse.json({ok: true});
}