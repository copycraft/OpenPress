"use client";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
    if (!open) return null;

    return (
        <div data-component="modal-overlay" onClick={onClose}>
            <div data-component="modal" onClick={(e) => e.stopPropagation()}>
                <div data-component="modal-header">
                    {title && <span>{title}</span>}
                    <button onClick={onClose} aria-label="Close modal">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}