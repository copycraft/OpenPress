"use client";

interface SidebarProps {
    children: React.ReactNode;
    open?: boolean;
}

export default function Sidebar({ children, open = true }: SidebarProps) {
    if (!open) return null;
    return <aside data-component="sidebar">{children}</aside>;
}