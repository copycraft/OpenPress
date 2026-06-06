"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Page {
    id: number;
    title: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export default function PagesAdmin() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/pages")
            .then((r) => r.json())
            .then((data) => { setPages(data); setLoading(false); });
    }, []);

    async function createPage() {
        const title = prompt("page title?");
        if (!title) return;

        const res = await fetch("/api/pages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });

        const page = await res.json();
        router.push(`/op-admin/editor/${page.slug}`);
    } // ← createPage closes here

    async function deletePage(slug: string) {
        if (!confirm(`delete ${slug}?`)) return;
        await fetch(`/api/pages/${slug}`, { method: "DELETE" });
        setPages((ps) => ps.filter((p) => p.slug !== slug));
    }

    if (loading) return <p>loading...</p>;

    return (
        <div>
            <button onClick={createPage}>+ new page</button>

            {pages.length === 0 && <p>no pages yet</p>}

            {pages.map((page) => (
                <div key={page.slug}>
                    <span>{page.title}</span>
                    <span> — /{page.slug}</span>
                    <button onClick={() => router.push(`/op-admin/editor/${page.slug}`)}>edit</button>
                    <button onClick={() => deletePage(page.slug)}>delete</button>
                </div>
            ))}
        </div>
    );
} // ai for react strikes again!