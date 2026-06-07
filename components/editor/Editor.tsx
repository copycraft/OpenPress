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
import Library from "@/components/editor/Library";
import SettingsPanel from "@/components/editor/SettingsPanel";

function uid() {
    return Math.random().toString(36).substr(2, 9);
}

interface Props {
    initialBlocks?: Block[];
    onSave?: (blocks: Block[]) => void;
}

function SortableBlock({ block, selected, onSelect, onChange, onInsertAfter, onDelete, onFocus, onBlur }: {
    block: Block;
    selected: boolean;
    onSelect: () => void;
    onChange: (data: Record<string, string>) => void;
    onInsertAfter: (type: BlockType) => void;
    onDelete: () => void;
    onFocus: () => void;
    onBlur: () => void;
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
            <span
                {...listeners}
                {...attributes}
                style={{ cursor: "grab", color: "var(--op-muted)", paddingTop: 8, flexShrink: 0, userSelect: "none" }}
            >⠿</span>

            <div style={{ flex: 1 }}>
                <BlockWrapper
                    block={block}
                    selected={selected}
                    onSelect={onSelect}
                    onChange={onChange}
                    onInsertAfter={onInsertAfter}
                    onDelete={onDelete}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>

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
    const [focusing, setFocusing] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragStart(event: DragStartEvent) {
        const id = event.active.id as string;
        if (id.startsWith("library:")) {
            setDraggingType(id.replace("library:", "") as BlockType);
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setDraggingType(null);
        const activeId = active.id as string;

        if (activeId.startsWith("library:")) {
            const type = activeId.replace("library:", "") as BlockType;
            const newBlock: Block = { id: uid(), type, data: { ...registry[type].defaultData } };
            if (over && !String(over.id).startsWith("library:")) {
                const idx = blocks.findIndex((b) => b.id === over.id);
                setBlocks((bs) => [...bs.slice(0, idx + 1), newBlock, ...bs.slice(idx + 1)]);
            } else {
                setBlocks((bs) => [...bs, newBlock]);
            }
            return;
        }

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

                {selected ? (() => {
                    const block = blocks.find((b) => b.id === selected);
                    return block ? (
                        <SettingsPanel
                            block={block}
                            onChange={(data) => updateBlock(block.id, data)}
                        />
                    ) : null;
                })() : libraryOpen && <Library onAdd={addBlock} />}

                <button
                    onClick={() => setLibraryOpen((o) => !o)}
                    style={{ alignSelf: "flex-start", margin: 8, padding: "4px 8px", fontSize: 12 }}
                >
                    {libraryOpen ? "←" : "→"}
                </button>

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
                                onFocus={() => setFocusing(true)}
                                onBlur={() => setFocusing(false)}
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