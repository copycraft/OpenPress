"use client";
import { useState } from "react";

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
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

        if (data.message === "YUPPEE!") {
            onLoginSuccess();
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[var(--bg-base)] text-[var(--text-primary)]">
            <div className="w-full max-w-xs p-6 rounded-xl space-y-4 shadow-2xl bg-[var(--bg-surface)] border border-[var(--bg-border)]">

                <h1 className="text-2xl font-bold text-center tracking-tight text-[var(--text-primary)]">
                    Administrator
                </h1>

                <div className="space-y-3">
                    <input
                        placeholder="Username"
                        value={usr}
                        onChange={e => setUsr(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg outline-none transition text-sm bg-[var(--bg-base)] border border-[var(--bg-border)] focus:border-[var(--brand-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                    />

                    <input
                        placeholder="Password"
                        value={psw}
                        onChange={e => setPsw(e.target.value)}
                        type="password"
                        className="w-full px-3 py-2 rounded-lg outline-none transition text-sm bg-[var(--bg-base)] border border-[var(--bg-border)] focus:border-[var(--brand-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                    />
                </div>

                <button
                    onClick={checkLogin}
                    className="w-full py-2 font-semibold rounded-lg transition text-sm bg-[var(--brand-primary)] hover:bg-[var(--bg-hover)] active:bg-[var(--brand-secondary)] text-[var(--text-primary)]"
                >
                    Login
                </button>

                {result && (
                    <p className={`text-center text-sm font-bold mt-2 ${result === "YUPPEE!" ? "text-[var(--accent-teal)]" : "text-[var(--accent-amber)]"}`}>
                        {result === "YUPPEE!" ? "Success!" : result}
                    </p>
                )}

            </div>
        </div>
    );
}