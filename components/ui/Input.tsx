"use client";

interface InputProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}

export default function Input({ value, onChange, placeholder, type = "text", disabled }: InputProps) {
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
        />
    );
}