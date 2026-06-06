interface Props {
    message: string;
    action?: React.ReactNode;
}

export default function EmptyState({ message, action }: Props) {
    return (
        <div data-component="empty-state">
            <p>{message}</p>
            {action && <div>{action}</div>}
        </div>
    );
}