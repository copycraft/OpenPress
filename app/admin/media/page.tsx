"use client";
import {useState, useRef, useEffect} from "react";

interface Props {
    id: string;
    url: string;
    name: string;
}

export default function MediaAdminPage() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [selectedId, setSelectedId] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchExistingMedia() {
            setIsLoading(true);
            try {
                const res = await fetch("/api/media");
                const data = await res.json();
                if(data.media) {
                    setMedia(data.media);
                }
            } catch (error) {
                setMsg("failed to fetch media");
            } finally  {
                setIsLoading(false);
            }
        }
        fetchExistingMedia();
    }, []);

    async function upload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setMsg("upload");

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/media", {
            method: "POST",
            body: formData,
        })
        const data = await res.json();
        setMsg(data.message);
    }
    return (
        <div className="p-6 min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--bg-border)] pb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight m-0">Media Manager</h1>
                        <p className="text-sm text-[var(--text-muted)] m-0 mt-1">
                            Select an existing item from your gallery or upload a new one.
                        </p>
                    </div>

                    {/* Styled Upload Control */}
                    <label className="inline-flex items-center justify-center px-4 py-2 font-mono text-xs rounded border border-[var(--bg-border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] cursor-pointer transition select-none">
                        <span>📤 Upload New File</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={upload}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Status Messages */}
                {msg && (
                    <div className="text-xs font-mono p-3 rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] text-[var(--text-muted)]">
                        Status: <span className="text-[var(--text-primary)]">{msg}</span>
                    </div>
                )}

                {/* Main Content Area */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div data-component="spinner" aria-label="loading" />
                    </div>
                ) : media.length === 0 ? (
                    <div data-component="empty-state" className="border border-dashed border-[var(--bg-border)] rounded-lg">
                        <p>No media files found. Upload your first asset to get started!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {media.map((item) => {
                            const isSelected = selectedId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    data-component="card"
                                    onClick={() => setSelectedId(item.id)}
                                    className={`relative group cursor-pointer overflow-hidden p-2 transition-all duration-150 rounded-lg flex flex-col justify-between ${
                                        isSelected
                                            ? "ring-2 ring-[var(--brand-primary)] bg-[var(--bg-hover)] border-transparent"
                                            : "hover:border-[var(--text-muted)]"
                                    }`}
                                >
                                    {/* Thumbnail Preview wrapper */}
                                    <div className="aspect-square w-full rounded bg-[var(--bg-base)] overflow-hidden flex items-center justify-center border border-[var(--bg-border)]">
                                        <img
                                            src={item.url}
                                            alt={item.name}
                                            className="object-contain max-h-full max-w-full transition group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Asset Title Metadata */}
                                    <div className="mt-2 text-xs font-mono truncate text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                                        {item.name}
                                    </div>

                                    {/* Selected Indicator Checkmark Bubble */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                                            ✓
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}