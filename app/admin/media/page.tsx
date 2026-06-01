"use client";
import {useState, useRef} from "react";

export default function MediaAdminPage() {
    const [msg, setMsg] = useState("");

    async function upload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files[0];
        if (!file) return;

        setMsg("upload");

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/media", {
            method: "POST",
            body: formData,
        })
        const data = await res.json();
        setMsg(data.message);
    }
    return (
        <div style={{padding:"20px", color: "white"}}>
            <h1 style={{margin:"0 10px"}}>Upload Media</h1>
            <input type="file" accept="image/*" onChange={upload} />
            <p>{msg}</p>
        </div>
    )

}