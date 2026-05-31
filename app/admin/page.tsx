"use client";
import { useState } from "react";

// here i used claude to clean all this fucking mess up-

export default function Home() {
    const [usr, setUsr] = useState("");
    const [psw, setPsw] = useState("");
    const [result, setResult] = useState("");

    async function checkLogin() {
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: usr, password: psw }),
        });
        const data = await res.json();
        setResult(data.message);
    }

    return (
        <div>
            <input value={usr} onChange={e => setUsr(e.target.value)} />
            <input value={psw} onChange={e => setPsw(e.target.value)} type="password" />
            <button onClick={checkLogin}>Login</button>
            <p>{result}</p>
        </div>
    );
}