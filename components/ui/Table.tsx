interface TableProps {
    headers: string[];
    rows: React.ReactNode[][];
}

export default function Table({ headers, rows }: TableProps) {
    return (
        <table>
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={`${header}-${index}`}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}