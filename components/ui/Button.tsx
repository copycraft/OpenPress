"use client";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
}

export default function Button({ children, onClick, variant = "primary", disabled }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            data-variant={variant}
            className="disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
            {children}
        </button>
    );
}