"use client";
import { useSortable } from "@dnd-kit/sortable";
import { BlockType, registry } from "@/components/editor/registry";

function LibraryItem({ type, onClick }: { type: BlockType; onClick: () => void }) {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: `library:${type}` });

    return (
        <div ref={setNodeRef} {...attributes} style={{ opacity: isDragging ? 0.4 : 1 }}>
            <button
                {...listeners}
                onClick={onClick}
                style={{
                    width: "100%",
                    textAlign: "left",
                    cursor: "grab",
                    background: "none",
                    border: "1px solid var(--op-border)",
                    padding: "6px 10px",
                    borderRadius: 4,
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--foreground)",
                }}
            >
                ⠿ {type}
            </button>
        </div>
    );
}

interface Props {
    onAdd: (type: BlockType) => void;
}

export default function Library({ onAdd }: Props) {
    return (
        <div style={{
            width: 160,
            flexShrink: 0,
            background: "var(--op-library-bg)",
            borderRight: "1px solid var(--op-border)",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 6,
        }}>
            <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--op-muted)", marginBottom: 4 }}>blocks</span>
            {Object.keys(registry).map((type) => (
                <LibraryItem key={type} type={type as BlockType} onClick={() => onAdd(type as BlockType)} />
            ))}
        </div>
    );
}