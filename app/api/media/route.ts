import {NextRequest, NextResponse} from "next/server";
import {writeFile, mkdir} from "fs/promises";
import {existsSync} from "node:fs";
import path from "path";
import db from "@/app/lib/db/media";

export async function GET() {
    try {
        const rows = db.prepare("SELECT * FROM media ORDER BY id DESC").all() as any[];
        const media = rows.map(row => ({
            id: row.id.toString(),
            url: `/media/uploads/${row.filename}`,
            name: row.filename
        }));
        return NextResponse.json({success: true, media})
    } catch(error) {
        console.error("GET MEDIA ERROR: ", error);
        return NextResponse.json({success: false, error: error});
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({success: false, message: "No file selected"}, {status:400});
        }
        const uploadFolder = path.join(process.cwd(), "public", "media", "uploads");

        if(!existsSync(uploadFolder)){
            await mkdir(uploadFolder, {recursive: true});
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`; // what is this???? ai told me  this, is this like name formatting????
        const absolutePath = path.join(uploadFolder, uniqueFilename);
        await writeFile(absolutePath, buffer);
        db.prepare("INSERT INTO media (filename, filepath) VALUES (?, ?)")
            .run(uniqueFilename, absolutePath);
        return NextResponse.json({
            success: true,
            message: "YUPPEEE! FILE SAVED!!",
            url: `/media/uploads/${uniqueFilename}`
        });
    } catch (error) {
        console.error("ERROR(if this is not me, dm me on slack or create a github issue)", error)
        return NextResponse.json(
            { success: false, message: error.message || "errored" },
            { status: 500 }
        );
    } //im pretty sure this is how try catch works
}