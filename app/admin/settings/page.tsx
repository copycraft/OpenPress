"use client";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const [siteTitle, setSiteTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSiteTitle(data.site_title);
                setLoading(false);
            });
    }, []);

    async function save() {
        await fetch("/api/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ site_title: siteTitle }),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    if (loading) return <p>loading...</p>;
    //ai
    return (
        <div style={{ padding: 24, maxWidth: 480 }}>
            <h1 style={{ marginBottom: 24 }}>settings</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--op-muted)" }}>
                    site title
                </label>
                <input
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    placeholder="OpenPress"
                />
            </div>
            <button
                onClick={save}
                style={{ background: "var(--op-bar)", color: "white", borderColor: "var(--op-bar)" }}
            >
                save
            </button>
            {saved && <span style={{ marginLeft: 12, fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--op-muted)" }}>saved!</span>}
        </div>
    );
}