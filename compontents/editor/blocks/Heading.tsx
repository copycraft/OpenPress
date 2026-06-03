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
            <div style={{ fontSize: 12 , color : "var(--color-text-primary)", marginBottom: 6, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>H1</div>
            <input
                type="text"
                value={data.text}
                placeholder="heading"
                onChange={(e) => onChange({ text: e.target.value})}
                style={{ width: "100%" }}
            />
        </div>
    )
}