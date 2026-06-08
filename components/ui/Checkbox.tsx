"use client";

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-mono text-[var(--text-primary)]">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-[var(--brand-primary)]"
            />
            {label && <span>{label}</span>}
        </label>
    );
}