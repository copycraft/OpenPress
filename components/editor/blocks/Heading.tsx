interface HeadingData {
    text: string;
}

interface Props {
    data: HeadingData;
    onChange: (data: HeadingData) => void;
}

export default function Heading({ data, onChange }: Props) {
    return (
        <div>
            <div style={{ fontSize: 11, color: "var(--op-muted)", marginBottom: 6, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>H1</div>
            <input
                type="text"
                value={data.text}
                placeholder="heading..."
                onChange={(e) => onChange({ text: e.target.value })}
                style={{
                    width: "100%",
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: "var(--font-sans)",
                    border: "none",
                    outline: "none",
                    background: "none",
                    color: "var(--foreground)",
                    padding: 0,
                }}
            />
        </div>
    );
}