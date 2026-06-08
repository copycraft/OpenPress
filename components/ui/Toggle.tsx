"use client";

interface ToggleProps {
    on: boolean;
    onChange: (val: boolean) => void;
    label?: string;
    disabled?: boolean;
}

export default function Toggle({ on, onChange, label, disabled }: ToggleProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-mono text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed">
            <input
                type="checkbox"
                checked={on}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                role="switch"
                className="w-4 h-4 cursor-pointer accent-[var(--brand-primary)]"
            />
            {label && <span>{label}</span>}
        </label>
    );
}