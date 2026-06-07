"use client" ;

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface Page {
    id: number;
    title: string;
    slug: string;
    updated_at: string;
}

export default function EditorIndex() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/pages")
        .then(res => res.json())
        .then(data => setPages(data));
    }, [])

    if (loading) return <p>Loading...</p>;

    //still ai, ill learn someday i think???
    return (
        <div>
            <h1>all pages</h1>
            {pages.length === 0 && <p>no pages yet</p>}
            {pages.map((page) => (
                <div key={page.slug}>
                    <span>{page.title}</span>
                    <span> — /{page.slug}</span>
                    <span> — last edited {new Date(page.updated_at).toLocaleDateString()}</span>
                    <button onClick={() => router.push(`/op-admin/editor/${page.slug}`)}>edit</button>
                </div>
            ))}
        </div>
    );
}