"use client";
import { useState } from "react";
import { Block, BlockType, registry } from "@/components/editor/registry";
import BlockWrapper from "@/components/editor/BlockWrapper";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function uid() {
    return Math.random().toString(36).substr(2, 9);
}

interface Props {
    initialBlocks?: Block[];
    onSave?: (blocks: Block[]) => void;
}

function SortableBlock({ block, selected, onSelect, onChange, onInsertAfter, onDelete }: {
    block: Block;
    selected: boolean;
    onSelect: () => void;
    onChange: (data: Record<string, string>) => void;
    onInsertAfter: (type: BlockType) => void;
    onDelete: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                opacity: isDragging ? 0.3 : 1,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                marginBottom: 4,
            }}
        >
            {/* drag handle */}
            <span
                {...listeners}
                {...attributes}
                style={{ cursor: "grab", color: "var(--op-muted)", paddingTop: 8, flexShrink: 0, userSelect: "none" }}
            >⠿</span>

            {/* block content */}
            <div style={{ flex: 1 }}>
                <BlockWrapper
                    block={block}
                    selected={selected}
                    onSelect={onSelect}
                    onChange={onChange}
                    onInsertAfter={onInsertAfter}
                    onDelete={onDelete}
                />
            </div>

            {/* actions on the right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0, paddingTop: 4 }}>
                {Object.keys(registry).map((type) => (
                    <button
                        key={type}
                        onClick={() => onInsertAfter(type as BlockType)}
                        style={{ fontSize: 11, padding: "2px 6px" }}
                        title={`insert ${type} after`}
                    >
                        +{type}
                    </button>
                ))}
                <button
                    onClick={onDelete}
                    style={{ fontSize: 11, padding: "2px 6px", color: "#ef4444", borderColor: "#ef4444" }}
                >
                    delete
                </button>
            </div>
        </div>
    );
}

export default function Editor({ initialBlocks, onSave }: Props) {
    const [blocks, setBlocks] = useState<Block[]>(initialBlocks ?? []);
    const [selected, setSelected] = useState<string | null>(null);
    const [libraryOpen, setLibraryOpen] = useState(true);
    const [draggingType, setDraggingType] = useState<BlockType | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragStart(event: DragStartEvent) {
        const id = event.active.id as string;
        // if it starts with "library:" it's from the library
        if (id.startsWith("library:")) {
            setDraggingType(id.replace("library:", "") as BlockType);
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setDraggingType(null);

        const activeId = active.id as string;

        // dragging from library into editor
        if (activeId.startsWith("library:")) {
            const type = activeId.replace("library:", "") as BlockType;
            const newBlock: Block = { id: uid(), type, data: { ...registry[type].defaultData } };

            if (over && !String(over.id).startsWith("library:")) {
                // drop onto a block — insert after it
                const idx = blocks.findIndex((b) => b.id === over.id);
                setBlocks((bs) => [...bs.slice(0, idx + 1), newBlock, ...bs.slice(idx + 1)]);
            } else {
                // drop anywhere else — append
                setBlocks((bs) => [...bs, newBlock]);
            }
            return;
        }

        // reordering existing blocks
        if (over && activeId !== over.id) {
            setBlocks((bs) => {
                const oldIdx = bs.findIndex((b) => b.id === activeId);
                const newIdx = bs.findIndex((b) => b.id === over.id);
                return arrayMove(bs, oldIdx, newIdx);
            });
        }
    }

    function addBlock(type: BlockType) {
        const newBlock: Block = { id: uid(), type, data: { ...registry[type].defaultData } };
        setBlocks((bs) => [...bs, newBlock]);
    }

    function insertAfter(id: string, type: BlockType) {
        const idx = blocks.findIndex((b) => b.id === id);
        const newBlock: Block = { id: uid(), type, data: { ...registry[type].defaultData } };
        setBlocks((bs) => [...bs.slice(0, idx + 1), newBlock, ...bs.slice(idx + 1)]);
    }

    function updateBlock(id: string, data: Record<string, string>) {
        setBlocks((bs) => bs.map((b) => (b.id === id ? { ...b, data } : b)));
    }

    function deleteBlock(id: string) {
        setBlocks((bs) => bs.filter((b) => b.id !== id));
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div style={{ display: "flex", gap: 0, minHeight: "100vh" }}>

                {/* library panel */}
                {libraryOpen && (
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
                            <LibraryItem key={type} type={type as BlockType} onClick={() => addBlock(type as BlockType)} />
                        ))}
                    </div>
                )}

                {/* toggle button */}
                <button
                    onClick={() => setLibraryOpen((o) => !o)}
                    style={{ alignSelf: "flex-start", margin: 8, padding: "4px 8px", fontSize: 12 }}
                >
                    {libraryOpen ? "←" : "→"}
                </button>

                {/* editor area */}
                <div style={{ flex: 1, padding: 16 }}>
                    <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                        {blocks.map((block) => (
                            <SortableBlock
                                key={block.id}
                                block={block}
                                selected={selected === block.id}
                                onSelect={() => setSelected(block.id)}
                                onChange={(data) => updateBlock(block.id, data)}
                                onInsertAfter={(type) => insertAfter(block.id, type)}
                                onDelete={() => deleteBlock(block.id)}
                            />
                        ))}
                    </SortableContext>
                    {blocks.length === 0 && (
                        <p style={{ color: "var(--op-muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                            no blocks yet — drag from the library or click a block type →
                        </p>
                    )}
                    {onSave && (
                        <button
                            onClick={() => onSave(blocks)}
                            style={{ marginTop: 16, background: "var(--op-bar)", color: "white", borderColor: "var(--op-bar)" }}
                        >
                            save
                        </button>
                    )}
                </div>

            </div>

            {/* drag overlay — shows what you're dragging */}
            <DragOverlay>
                {draggingType && (
                    <div style={{
                        padding: "6px 12px",
                        background: "var(--op-bar)",
                        color: "white",
                        borderRadius: 4,
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        opacity: 0.9,
                    }}>
                        {draggingType}
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    );
}

function LibraryItem({ type, onClick }: { type: BlockType; onClick: () => void }) {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: `library:${type}` });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={{ opacity: isDragging ? 0.4 : 1 }}
        >
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