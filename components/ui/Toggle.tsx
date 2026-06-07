interface Props {
    on: boolean;
    onChange: (val: boolean) => void;
    label?: string;
}

export default function Toggle({ on, onChange, label }: Props) {
    return (
        <label>
            <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} role="switch" />
            {label && <span>{label}</span>}
        </label>
    );
}