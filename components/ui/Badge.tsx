"use client";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "info" | "success" | "danger" | "warning";
}

export default function Badge({ children, variant = "info" }: BadgeProps) {
    return (
        <span data-component="badge" data-variant={variant}>
            {children}
        </span>
    );
}