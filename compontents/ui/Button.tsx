interface Props {
    children : React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | "danger";
    disabled?: boolean;
}

export default function Button ({children, onClick, variant="primary", disabled} : Props) {
    return (
        <button onClick={onClick} disabled={disabled} data-variant={variant}>
            {children}
        </button>
    )
}