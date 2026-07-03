import db from "@/app/lib/editor-db";
import { notFound } from "next/navigation";
import {marked} from "marked";

interface PageRow {
    title: string;
    content: string;
}

function parseCustomCss(css: string): React.CSSProperties {
    if (!css) return {};
    return Object.fromEntries(
        css.split(";")
            .filter(Boolean)
            .map(s => s.split(":").map(p => p.trim()))
            .filter(([k, v]) => k && v)
            .map(([k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v])
    ) as React.CSSProperties;
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const page = db.prepare("SELECT title, content FROM pages WHERE slug = ?").get(slug) as PageRow;
    if (!page) notFound();

    const blocks = JSON.parse(page.content || "[]");

    return (
        <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] px-4 py-12">
            <div className="max-w-3xl mx-auto space-y-6">
                {blocks.map((block: { id: string; type: string; data: Record<string, string> }) => {
                    const alignment = (block.data.align as "left" | "center" | "right") || "left";

                    const dynamicStyles = {
                        fontSize: block.data.fontSize ? `${block.data.fontSize}px` : undefined,
                        textAlign: alignment,
                        ...parseCustomCss(block.data.customCss ?? ""),
                    };

                    if (block.type === "text") {
                        return (
                            <div
                                key = {block.id}
                                style = {dynamicStyles}
                                dangerouslySetInnerHTML={{ __html: marked.parse(block.data.text || "") }}
                            />
                        );
                    }

                    if (block.type === "image") {
                        return (
                            <div
                                key={block.id}
                                className={`w-full flex ${
                                    alignment === "center" ? "justify-center" : alignment === "right" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <img
                                    src={block.data.src}
                                    alt={block.data.alt || ""}
                                    className="rounded-lg border border-[var(--bg-border)] object-contain max-h-[500px]"
                                    style={{
                                        width: block.data.width || "100%",
                                        ...parseCustomCss(block.data.customCss ?? "")
                                    }}
                                />
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </main>
    );
}