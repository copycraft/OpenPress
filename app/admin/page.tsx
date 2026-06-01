"use client";
import { useState } from "react";
import LoginForm from "./login"


export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <main className="main">
            {!isLoggedIn ? (
                <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
                    <h1 className="text-4xl font-bold text-center text-white">
                        ADMIN PAGE
                    </h1>
                </div>
            )}




        </main>
    )

}