interface Props {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}

export default function Input({value, onChange, placeholder, type = "text", disabled}: Props) {
    return (
        <input
            type = {type}
            value={value}
            placeholder = {placeholder}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            />
    )
}