import { Block, BlockType, registry} from "./registry";

interface Props {
    block: Block;
    selected: boolean;
    onSelect: () => void;
    onChange: (data: Record<string, string>) => void;
    onInsertAfter: (type: BlockType) => void;
    onDelete: () => void;
}
//fuck this, i am pasting ai, THIS IS SO FUCKING CONFUSING
export default function BlockWrapper({ block, selected, onSelect, onChange, onInsertAfter, onDelete }: Props) {
    const Component = registry[block.type].component;
    return (
        <div onClick={onSelect}>
            <Component data={block.data} onChange={onChange} />
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>delete</button>
            {selected && (
                <div>
                    {Object.keys(registry).map((type) => (
                        <button key={type} onClick={(e) => { e.stopPropagation(); onInsertAfter(type as BlockType); }}>
                            + {type}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
