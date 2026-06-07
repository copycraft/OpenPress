interface ImageData {
    src: string;
    alt: string;
}

interface Props {
    data: ImageData;
    onChange: (imageData: ImageData) => void;
}

export default function Image({ data, onChange }: Props) {
    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const form = new FormData();
        form.append("file", file);

        const res = await fetch("/api/media", { method: "POST", body: form });
        const json = await res.json();

        if (json.success) {
            onChange({ ...data, src: json.url });
        }
    }

    return (
        <div>
            <div style={{ fontSize: 11, color: "var(--op-muted)", marginBottom: 8, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>IMG</div>

            {data.src ? (
                <div>
                    <img src={data.src} alt={data.alt} style={{ maxWidth: "100%", display: "block", marginBottom: 8 }} />
                    <input
                        type="text"
                        value={data.alt}
                        placeholder="alt text..."
                        onChange={(e) => onChange({ ...data, alt: e.target.value })}
                    />
                </div>
            ) : (
                <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 120, border: "1px dashed var(--op-border)", cursor: "pointer", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--op-muted)", borderRadius: 4 }}>
                    drop image or click to upload
                    <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
                </label>
            )}
        </div>
    );
}