interface Props {
    headers: string[];
    rows: React.ReactNode[][];
}

export default function Table({ headers, rows }: Props) {
    return (
        <table>
            <thead>
            <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
            {rows.map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
            </tbody>
        </table>
    );
}