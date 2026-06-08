"use client";

interface EmptyStateProps {
    message: string;
    action?: React.ReactNode;
}

export default function EmptyState({ message, action }: EmptyStateProps) {
    return (
        <div data-component="empty-state" className="flex flex-col items-center justify-center gap-3">
            <p className="m-0">{message}</p>
            {action && <div className="mt-1">{action}</div>}
        </div>
    );
}