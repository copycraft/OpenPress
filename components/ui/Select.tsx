interface Option {
    label: string;
    value: string;
}

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
}

export default function Select({ value, onChange, options }: Props) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
} // ai to debug syntax