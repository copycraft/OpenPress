interface Props {
    children: React.ReactNode;
}

export default function Card({ children }: Props) {
    return <div data-component="card">{children}</div>;
}