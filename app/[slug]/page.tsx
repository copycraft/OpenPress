import db from "@/app/lib/editor-db";
import { notFound } from "next/navigation";

interface PageRow {
    title: string;
    content: string;
}

function parseCustomCss(css: string): Record<string, string> {
    if (!css) return {};
    return Object.fromEntries(
        css.split(";")
            .filter(Boolean)
            .map(s => s.split(":").map(p => p.trim()))
            .filter(([k, v]) => k && v)
            .map(([k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v])
    );
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const page = db.prepare("SELECT title, content FROM pages WHERE slug = ?").get(slug) as PageRow;
    if (!page) notFound();

    const blocks = JSON.parse(page.content || "[]");

    return (
        <div>
            {blocks.map((block: { id: string; type: string; data: Record<string, string> }) => {
                const style = {
                    fontSize: block.data.fontSize ? parseInt(block.data.fontSize) : undefined,
                    textAlign: (block.data.align as "left" | "center" | "right") || undefined,
                    ...parseCustomCss(block.data.customCss ?? ""),
                };

                if (block.type === "heading") return <h1 key={block.id} style={style}>{block.data.text}</h1>;
                if (block.type === "paragraph") return <p key={block.id} style={style}>{block.data.text}</p>;
                if (block.type === "image") return (
                    <div key={block.id} style={{ textAlign: style.textAlign }}>
                        <img src={block.data.src} alt={block.data.alt} style={{ width: block.data.width || "100%" }} />
                    </div>
                );
                return null;
            })}
        </div>
    );
}