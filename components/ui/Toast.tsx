"use client";

interface ToastProps {
    message: string;
    type?: "info" | "success" | "danger";
    onClose: () => void;
}

export default function Toast({ message, type = "info", onClose }: ToastProps) {
    return (
        <div data-component="toast" data-type={type}>
            <span>{message}</span>
            <button onClick={onClose} aria-label="Dismiss toast">✕</button>
        </div>
    );
}