interface Props {
    data: Record<string, string>;
    onChange: (data: Record<string, string>) => void;
}

export default function Text({ data, onChange }: Props) {
    return (
        <div>
            <div style={{ fontSize: 11, color: "var(--op-muted)", marginBottom: 6, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>P</div>
            <textarea
                value={data.text ?? ""}
                placeholder="write something..."
                onChange={(e) => onChange({ ...data, text: e.target.value })}
                rows={3}
                style={{
                    width: "100%",
                    fontSize: parseInt(data.fontSize) || 16,
                    textAlign: (data.align as "left" | "center" | "right") || "left",
                }}
            />
        </div>
    );
}