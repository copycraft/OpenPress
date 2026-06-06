"use client";
import { useState } from "react";
import { AnimatePresence, motion} from "framer-motion";
import { useRouter } from "next/navigation";
import LoginForm from "./login"
import Spinner from "@/compontents/ui/Spinner";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    function handleLoginSuccess() {
        setIsLoggedIn(true);
        setTimeout(() => router.push("/op-admin/dashboard"), 300)
    }

    return (
        <main className="main bg-slate-950 min-h-screen">
            <AnimatePresence mode="wait">
                {!isLoggedIn ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="admin"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4"
                    >
                        <Spinner />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}