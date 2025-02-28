// app/api/uploadactivity/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// ลบ export const config ออกไป เนื่องจากถูกยกเลิกใช้งานแล้ว

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    // ดึงเฉพาะ file objects จาก key "files"
    const files = formData
      .getAll("files")
      .filter((item) => item instanceof File) as File[];
    // หากต้องการให้รับ custom name จาก key "fileNames"
    // const customNames = formData.getAll("fileNames");
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles: any[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      // สมมุติว่าในฐานข้อมูลคุณต้องการใช้ชื่อที่ส่งจาก client (customName)
      // ถ้าไม่ส่งมา ใช้ file.name แทน
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

    return NextResponse.json({ files: uploadedFiles }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
