"use client";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    disabled?: boolean;
}

export default function Select({ value, onChange, options, disabled }: SelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}