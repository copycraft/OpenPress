interface ParagraphData {
    text: string;
}

interface Props {
    data: ParagraphData;
    onChange: (data: ParagraphData) => void;
}

export default function Paragraph({ data, onChange }: Props) {
    return (
        <div>
            <div style={{ fontSize: 11, color: "var(--op-muted)", marginBottom: 6, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>P</div>
            <textarea
                value={data.text}
                placeholder="write something..."
                onChange={(e) => onChange({ text: e.target.value })}
                rows={3}
                style={{ width: "100%" }}
            />
        </div>
    )
}