import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { dir: string[] } }
) {
  const dir = params.dir.join("/");
  if (!dir) {
    return new NextResponse(null, { status: 500 });
  }

  // ป้องกัน path traversal โดยใช้ path.posix.normalize เพื่อรักษาเครื่องหมาย /
  const safeDir = path.posix.normalize(dir).replace(/^(\.\.(\/|\\|$))+/, "");
  if (safeDir !== dir) {
    return new NextResponse(null, { status: 400 });
  }

  // ตรวจสอบประเภทไฟล์ที่อนุญาต
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".pdf"];
  const ext = path.extname(safeDir).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), "public", safeDir);

    // ตรวจสอบว่าไฟล์มีอยู่จริง
    if (!fs.existsSync(filePath)) {
      return new NextResponse(null, { status: 404 });
    }

    // ส่งไฟล์เป็น stream พร้อมกำหนด Content-Type ให้ถูกต้อง
    const stream = fs.createReadStream(filePath);
    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        "Content-Type": getContentType(ext),
      },
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

// กำหนด Content-Type ตามนามสกุลไฟล์
function getContentType(ext: string): string {
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}
