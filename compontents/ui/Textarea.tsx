interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
}

export default function Textarea({value, onChange, placeholder, rows = 4}: Props) {
    return (
        <textarea
            value={value}
            placeholder={placeholder}
            rows={rows}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}