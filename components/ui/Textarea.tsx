"use client";

interface TextareaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
}

export default function Textarea({ value, onChange, placeholder, rows = 4, disabled }: TextareaProps) {
    return (
        <textarea
            value={value}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
        />
    );
}