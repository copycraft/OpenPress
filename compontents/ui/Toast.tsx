interface Props {
    message: string;
    type?: "info" | "success" | "danger";
    onClose: () => void;
}

export default function Toast({ message, type = "info", onClose }: Props) {
    return (
        <div data-component="toast" data-type={type}>
            <span>{message}</span>
            <button onClick={onClose}>✕</button>
        </div>
    );
}