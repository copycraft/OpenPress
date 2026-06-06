import db from "@/app/lib/editor-db";
import { notFound } from "next/navigation";

interface PageRow {
    title: string;
    content: string;
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const page = db.prepare("SELECT title, content FROM pages WHERE slug = ?").get(slug) as PageRow;

    if (!page) notFound();

    const blocks = JSON.parse(page.content || "[]");

    return (
        <div>
            {blocks.map((block: { id: string; type: string; data: Record<string, string> }) => {
                if (block.type === "heading") return <h1 key={block.id}>{block.data.text}</h1>;
                if (block.type === "paragraph") return <p key={block.id}>{block.data.text}</p>;
                if (block.type === "image") return <img key={block.id} src={block.data.src} alt={block.data.alt} />;
                return null;
            })}
        </div>
    );
}