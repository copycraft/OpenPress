import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers"
import Topbar from "@/components/Topbar";
import db from "@/app/lib/db/editor-db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
    const row = db.prepare("SELECT value FROM settings WHERE key = ?").get("site_title") as {value: string} | undefined;
    return {
        title: row?.value ?? "OpenPress",
    }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookie = await cookies();
    const isLoggedIn = cookie.has("auth_session");


    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">
        <Topbar isLoggedIn={isLoggedIn} />
        {children}
        </body>
        </html>
    );
}
