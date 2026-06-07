"use client";
import React from "react";

interface Props {
    isLoggedIn: boolean;
}

export default function Topbar({ isLoggedIn }: Props) {
    if (!isLoggedIn) return null;

    return (
        <div style={{ padding: "0 20px 0 0" }}>
            <nav style={{ background: "#374475", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 48, borderRadius: "0 999px 999px 0" }}>
                <a
                    href="/op-admin/dashboard"
                    style={{ color: "white", fontWeight: "bold", textDecoration: "none", background: "rgba(255,255,255,0.15)", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontSize: 14 }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                >
                    OP
                </a>

                <div style={{ display: "flex", gap: 4 }}>
                    {[
                        { label: "pages", href: "/op-admin/pages" },
                        { label: "media", href: "/op-admin/media" },
                        { label: "settings", href: "/op-admin/settings" },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            style={{ color: "white", padding: "4px 12px", borderRadius: 999, textDecoration: "none", fontSize: 14 }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </nav>
        </div>
    );
}