import {NextResponse} from "next/server";
import db from "../../lib/auth/db";
import {cookies} from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();
    const usr = body.username;
    const psw = body.password;
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(usr) as any; //ai recomended this part

    if (user && user.password === psw) {
        const cookie = await cookies();

        cookie.set("auth_session", user.username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });

        return NextResponse.json({success:true, message:"YUPPEE!"})
    } else {
        return NextResponse.json({success:false, message:"not YUPPEE."})
    }
}