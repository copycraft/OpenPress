"use client";
import { useState, useEffect } from "react";

interface Props {
    data: Record<string, string>;
    onChange: (data: Record<string, string>) => void;
}

interface MediaItem {
    id: string;
    url: string;
    name: string;
}

export default function ImageBlock({ data, onChange }: Props) {
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");

    useEffect(() => {
        if (!isLibraryOpen) return;

        async function loadLibrary() {
            setIsLoading(true);
            try {
                const res = await fetch("/api/media");
                const json = await res.json();
                if (json.success && json.media) {
                    setMediaItems(json.media);
                }
            } catch (err) {
                setStatusMsg("Failed to connect to the media server.");
            } finally {
                setIsLoading(false);
            }
        }
        loadLibrary();
    }, [isLibraryOpen]);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatusMsg("Uploading...");
        const form = new FormData();
        form.append("file", file);

        try {
            const res = await fetch("/api/media", { method: "POST", body: form });
            const json = await res.json();

            if (json.success && json.file) {
                onChange({ ...data, src: json.file.url, alt: json.file.name });
                setStatusMsg("");
            } else {
                setStatusMsg(json.message || "Upload failed");
            }
        } catch (error) {
            setStatusMsg("Error uploading asset.");
        }
    }

    const alignment = (data.align as "left" | "center" | "right") || "left";

    return (
        <div className="w-full my-4 font-mono">
            <div className="text-[11px] text-[var(--text-muted)] mb-2 tracking-wider uppercase font-bold">
                📸 Image Block
            </div>

            {data.src ? (
                <div className={`flex flex-col space-y-3 text-${alignment}`}>
                    <div
                        className={`w-full flex ${
                            alignment === "center" ? "justify-center" : alignment === "right" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <img
                            src={data.src}
                            alt={data.alt || "Uploaded image"}
                            className="rounded-lg max-h-[400px] object-contain border border-[var(--bg-border)]"
                            style={{ width: data.width || "100%" }}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full bg-[var(--bg-surface)] p-2 rounded-lg border border-[var(--bg-border)]">
                        <input
                            type="text"
                            value={data.alt ?? ""}
                            placeholder="Add descriptive alt text..."
                            onChange={(e) => onChange({ ...data, alt: e.target.value })}
                            className="flex-1 px-3 py-1 text-xs rounded border border-[var(--bg-border)] bg-[var(--bg-base)] text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)]"
                        />

                        <div className="flex rounded border border-[var(--bg-border)] overflow-hidden bg-[var(--bg-base)]">
                            {(["left", "center", "right"] as const).map((dir) => (
                                <button
                                    key={dir}
                                    type="button"
                                    onClick={() => onChange({ ...data, align: dir })}
                                    className={`px-3 py-1 text-[11px] capitalize border-none rounded-none transition ${
                                        alignment === dir
                                            ? "bg-[var(--brand-primary)] text-white"
                                            : "hover:bg-[var(--bg-hover)] text-[var(--text-muted)]"
                                    }`}
                                >
                                    {dir}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsLibraryOpen(true)}
                            className="px-3 py-1 text-xs rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] whitespace-nowrap"
                        >
                            Change Image
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <label className="flex-1 flex flex-col items-center justify-center gap-2 h-32 border border-dashed border-[var(--bg-border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] cursor-pointer rounded-lg transition text-xs text-[var(--text-muted)] select-none">
                        <span>📥 Drop file here or click to upload</span>
                        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                    </label>

                    <button
                        type="button"
                        onClick={() => setIsLibraryOpen(true)}
                        className="sm:w-48 flex flex-col items-center justify-center h-32 border border-[var(--bg-border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] rounded-lg text-xs text-[var(--text-primary)] gap-2 transition"
                    >
                        <span>📁 Choose Existing</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-normal">From Media Vault</span>
                    </button>
                </div>
            )}

            {statusMsg && (
                <p className="text-[11px] mt-1 text-[var(--accent-amber)] font-medium">
                    {statusMsg}
                </p>
            )}

            {isLibraryOpen && (
                <div
                    data-component="modal-overlay"
                    onClick={() => setIsLibraryOpen(false)}
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
                >
                    <div
                        data-component="modal"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl max-h-[80vh] flex flex-col bg-[var(--bg-elevated)] border border-[var(--bg-border)] rounded-xl shadow-2xl p-6"
                    >
                        <div data-component="modal-header" className="flex justify-between items-center pb-3 border-b border-[var(--bg-border)] mb-4">
                            <span className="text-sm font-bold text-[var(--text-primary)]">Select Media Asset</span>
                            <button
                                onClick={() => setIsLibraryOpen(false)}
                                className="bg-transparent border-none text-[var(--text-muted)] hover:text-[var(--text-primary)] text-base p-0"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-1 min-h-[250px]">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-48">
                                    <div data-component="spinner" />
                                </div>
                            ) : mediaItems.length === 0 ? (
                                <div data-component="empty-state" className="py-12 border border-dashed border-[var(--bg-border)] rounded-lg text-center">
                                    <p className="text-xs text-[var(--text-muted)]">No historical upload logs found in your database.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {mediaItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => {
                                                onChange({ ...data, src: item.url, alt: item.name });
                                                setIsLibraryOpen(false);
                                            }}
                                            className="group relative cursor-pointer border border-[var(--bg-border)] hover:border-[var(--brand-primary)] bg-[var(--bg-base)] p-1.5 rounded-lg transition overflow-hidden"
                                        >
                                            <div className="aspect-square w-full rounded overflow-hidden bg-[var(--bg-surface)] flex items-center justify-center">
                                                <img
                                                    src={item.url}
                                                    alt={item.name}
                                                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition duration-150"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="mt-1 text-[10px] text-[var(--text-muted)] truncate px-0.5 group-hover:text-[var(--text-primary)]">
                                                {item.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}