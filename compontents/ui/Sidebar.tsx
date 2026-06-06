interface Props {
    children: React.ReactNode;
    open?: boolean;
}

export default function Sidebar({ children, open = true }: Props) {
    if (!open) return null;
    return <aside data-component="sidebar">{children}</aside>;
}