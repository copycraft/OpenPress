import ReactMarkdown from "react-markdown";

interface Props {
    data: Record<string, string>;
    onChange: (data: Record<string, string>) => void;
    selected?: boolean;
}

export default function Text({ data, onChange }: Props) {
    const text = data.text ?? "";
    const fontSize = parseInt(data.fontSize) || 16; //the || is by default right? i think... i put it there cuz if it wasnt set it needs a default this is actually me typing this just to say im human
    const textAlign = (data.align as "left" | "center" | "right") || "left" //this is like since this isnt really a part of the markdown format i do this


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
            />  <div style = {{fontSize: fontSize, textAlign: textAlign}}>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
        </div>
    );
}