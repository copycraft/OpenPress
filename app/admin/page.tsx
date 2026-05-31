"use client";
import { useState } from "react";

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
            <div className="w-full max-w-xs bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 shadow-2xl">

                <h1 className="text-2xl font-bold text-center tracking-tight text-slate-200">
                    Administrator
                </h1>

                <div className="space-y-3">
                    <input
                        placeholder="Username"
                        value={usr}
                        onChange={e => setUsr(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-blue-500 transition text-sm"
                    />

                    <input
                        placeholder="Password"
                        value={psw}
                        onChange={e => setPsw(e.target.value)}
                        type="password"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-blue-500 transition text-sm"
                    />
                </div>

                <button
                    onClick={checkLogin}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 font-semibold rounded-lg transition text-sm"
                >
                    Login
                </button>

                {result && (
                    <p className={`text-center text-sm font-bold mt-2 ${result === "YUPPEE!" ? "text-emerald-400" : "text-rose-400"}`}>
                        {result}
                    </p>
                )}

            </div>
        </div>
    );
}