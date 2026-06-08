"use client";

interface CardProps {
    children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
    return <div data-component="card">{children}</div>;
}