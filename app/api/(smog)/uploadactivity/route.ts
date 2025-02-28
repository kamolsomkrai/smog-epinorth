// app/api/uploadactivity/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // ปิด body parser ของ Next.js
  },
};

export async function POST(request: Request) {
  try {
    // ใช้ request.formData() แทน unstable_parseMultipartFormData
    const formData = await request.formData();
    const files = formData.getAll("files");
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles: any[] = [];

    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = file.name;
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        uploadedFiles.push({
          filePath,
          fileName,
          fileType: file.type,
          extension: fileName.split(".").pop() || "",
          fileSize: file.size.toString(),
        });
      }
    }

    return NextResponse.json({ files: uploadedFiles }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
