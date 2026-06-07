interface Props {
    children: React.ReactNode;
    variant?: "info" | "success" | "danger" | "warning";
}

export default function Badge({ children, variant = "info" }: Props) {
    return <span data-component="badge" data-variant={variant}>{children}</span>;
}