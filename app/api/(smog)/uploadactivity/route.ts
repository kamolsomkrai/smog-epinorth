// app/api/uploadactivity/route.ts
import { NextResponse } from "next/server";
import formidable from "formidable";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import path from "path";
// import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// สร้างชื่อไฟล์ใหม่เป็น UUID + นามสกุลเดิม
const generateUniqueFilename = (originalFilename: string): string => {
  const ext = path.extname(originalFilename); // .jpg, .png, etc.
  const uniqueId = uuidv4(); // สร้าง UUID
  return `${uniqueId}${ext}`;
};

export async function OPTIONS() {
  // ตั้งค่า CORS ถ้าจำเป็น
  const response = NextResponse.json({});
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function POST(request: Request) {
  // ตรวจสอบ content-type ว่าต้องเป็น multipart/form-data
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Unsupported Media Type" },
      { status: 415 }
    );
  }

  // แปลง Request เป็น stream เพื่อส่งให้ formidable
  const buffer = await request.arrayBuffer();
  const stream = Readable.from(Buffer.from(buffer));

  // แปลง Header ให้เป็น object
  const headersObj = Object.fromEntries(request.headers.entries());

  // สร้าง request แบบ IncomingMessage สำหรับ formidable
  const req = Object.assign(stream, {
    headers: headersObj,
    method: request.method,
    url: request.url,
  }) as unknown as IncomingMessage;

  // กำหนด config ให้ formidable
  const form = formidable({
    uploadDir: "./public/uploads", // โฟลเดอร์ปลายทาง
    keepExtensions: true, // เก็บนามสกุลไฟล์
    filename: (originalName, ext, part) => {
      const originalFilename = part.originalFilename || "file";
      return generateUniqueFilename(originalFilename);
    },
  });

  try {
    // ใช้ Promise เพื่อรองรับ async/await
    const { fields, files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // สร้าง array สำหรับเก็บข้อมูลไฟล์ที่อัปโหลด
    const uploadedFiles: any[] = [];

    // วนลูปไฟล์ทั้งหมด
    const fileEntries = Object.values(files);
    for (const fileOrFiles of fileEntries) {
      const fileArray = Array.isArray(fileOrFiles)
        ? fileOrFiles
        : [fileOrFiles];
      for (const f of fileArray) {
        if (!f) continue;
        // f.filepath คือ path ของไฟล์ที่อัปโหลดแล้ว (เปลี่ยนชื่อไฟล์ด้วยฟังก์ชัน filename ข้างบน)
        const fileName = path.basename(f.filepath);
        const filePath = `/uploads/${fileName}`;
        uploadedFiles.push({
          fileName,
          fileType: f.mimetype,
          fileSize: f.size,
          extension: path.extname(filePath).slice(1),
          filePath,
        });
      }
    }

    return NextResponse.json(
      {
        message: "Files uploaded successfully",
        files: uploadedFiles,
        fields, // ถ้าต้องการดูค่า fields ที่ส่งมา (form fields)
      },
      { status: 200 }
    );
  } catch (parseError) {
    console.error("Error parsing the files:", parseError);
    return NextResponse.json(
      { error: "Error parsing the files" },
      { status: 500 }
    );
  }
}
