interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?:string;
}

export default function Checkbox({checked,onChange,label}: Props) {
    return (
        <label>
            <input type={"checkbox"} checked={checked} onChange={(e) => onChange(e.target.checked)} />
            {label && <span>{label}</span>}
        </label>
    )
}
