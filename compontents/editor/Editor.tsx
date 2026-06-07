import {useState} from 'react';
import { Block, BlockType, registry} from "@/compontents/editor/registry";
import BlockWrapper from "@/compontents/editor/BlockWrapper";

function uid() {
    return Math.random().toString(36).substr(2, 9);
}

interface Props {
    initialBlocks?: Block[];
    onSave? : (blocks: Block[]) => void;
}

export default function Editor({ initialBlocks, onSave }: Props) {
    const [blocks, setBlocks] = useState<Block[]>(initialBlocks ?? []);
    const [selected, setSelected] = useState<BlockType | null>(null);
    const [libraryOpen, setLibraryOpen] = useState(true);

    function insertAfter(id: string, type: BlockType) {
        const idx = blocks.findIndex(block => block.id === id);
        const newBlock: Block = { id: uid(), type, data : { ...registry[type].defaultData } } ;
        setBlocks((bs) => [...bs.slice(0, idx +1), newBlock, ...bs.slice(idx +1)]);
    }

    function updateBlock(id: string, data: Record<string, string>) {
        setBlocks((bs) => bs.map((b) => (b.id === id ? { ...b, data } : b)));
    }
    function deleteBlock(id: string) {
        setBlocks((bs) => bs.filter(b => b.id !== id));
    }
    function addBlock(type: BlockType) {
        const newBlock: Block = { id: uid(), type, data : { ...registry[type].defaultData } };
        setBlocks((bs) => [...bs, newBlock]);
    }

    //again, im sorry i wont even try
    return (
        <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
                {blocks.map((block) => (
                    <BlockWrapper
                        key={block.id}
                        block={block}
                        selected={selected === block.id}
                        onSelect={() => setSelected(block.id)}
                        onChange={(data) => updateBlock(block.id, data)}
                        onInsertAfter={(type) => insertAfter(block.id, type)}
                        onDelete={() => deleteBlock(block.id)}
                    />
                ))}
                {blocks.length === 0 && <p>no blocks yet, add one from the library →</p>}
                {onSave && <button onClick={() => onSave(blocks)}>save</button>}
            </div>

            <div style={{ width: libraryOpen ? 200 : 32, flexShrink: 0, transition: "width 0.2s" }}>
                <button onClick={() => setLibraryOpen((o) => !o)}>
                    {libraryOpen ? "→ close" : "←"}
                </button>
                {libraryOpen && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
                        {Object.keys(registry).map((type) => (
                            <button key={type} onClick={() => addBlock(type as BlockType)}>
                                {type}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}