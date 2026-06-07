"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Editor from "@/compontents/editor/Editor";

interface Page {
    title: string;
    slug: string;
    content: string;
}

export default function EditorPage() {
    const params = useParams();
    const slug = params.slug as string;
    const router = useRouter();

    const [page, setPage] = useState<Page | null>(null);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch(`/api/pages/${slug}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.error) {
                    router.push("/not-found");
                    return;
                }
                setPage(data);
                setTitle(data.title);
                setLoading(false);
            });
    }, [slug]);

    async function save(blocks: unknown) {
        await fetch(`/api/pages/${slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content: blocks }),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    if (loading) return <p>loading...</p>;
    if (!page) return notFound();

    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="page title" />
            {saved && <span>saved!</span>}
            <Editor initialBlocks={JSON.parse(page.content || "[]")} onSave={save} />
        </div>
    );
}