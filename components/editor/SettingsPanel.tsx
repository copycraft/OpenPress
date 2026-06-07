"use client";
import { Block , registry, SettingField} from "@/components/editor/registry";

interface Props {
    block: Block,
    onChange: (data: Record<string, string>) => void,
}

export default function SettingPanel({block, onChange}: Props) {
    const settings= registry[block.type].settings ?? [];

    function update(key: string, value: string) {
        onChange({ ...block.data, [key]: value });
    }

    //ai, shmuckle the frontend here:
    return (
        <div style={{
            width: 220,
            flexShrink: 0,
            borderLeft: "1px solid var(--op-border)",
            background: "var(--op-library-bg)",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 13,
        }}>
      <span style={{ color: "var(--op-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {block.type} settings
      </span>

            {settings.map((field: SettingField) => (
                <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, color: "var(--op-muted)" }}>{field.label}</label>

                    {field.type === "select" ? (
                        <select
                            value={block.data[field.key] ?? ""}
                            onChange={(e) => update(field.key, e.target.value)}
                        >
                            {field.options?.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            value={block.data[field.key] ?? ""}
                            onChange={(e) => update(field.key, e.target.value)}
                        />
                    )}
                </div>
            ))}

            {/* custom css */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: "auto" }}>
                <label style={{ fontSize: 11, color: "var(--op-muted)" }}>custom css</label>
                <textarea
                    value={block.data.customCss ?? ""}
                    placeholder="color: red; font-size: 20px;"
                    rows={4}
                    onChange={(e) => update("customCss", e.target.value)}
                    style={{ fontFamily: "var(--font-mono)", fontSize: 12, resize: "vertical" }}
                />
            </div>
        </div>
    );
    //: got it boss
}