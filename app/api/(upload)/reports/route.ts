// app/api/reports/route.ts
import { NextResponse } from "next/server";
import { IncomingForm, Fields, Files } from "formidable";
import fs from "fs";
import { prisma } from "../../../lib/prisma";
import path from "path";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public", "uploads", "reports");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request: Request) {
  try {
    console.log("Received POST request to /api/reports");

    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      multiples: false,
    });

    // แปลง Web ReadableStream เป็น Node.js Readable Stream
    const stream = Readable.fromWeb(request.body);

    const data: { fields: Fields; files: Files } = await new Promise(
      (resolve, reject) => {
        form.parse(stream, (err, fields, files) => {
          if (err) {
            console.error("Error parsing form:", err);
            reject(err);
          }
          resolve({ fields, files });
        });
      }
    );

    console.log("Parsed fields:", data.fields);
    console.log("Parsed files:", data.files);

    const { name, link, date, type } = data.fields;
    const file = data.files.file as formidable.File;

    if (!name || !date || !type || !file) {
      console.error("Missing required fields");
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    if (type !== "pdf" && type !== "image") {
      console.error("Invalid report type:", type);
      return NextResponse.json(
        { message: "ประเภทไฟล์ไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const fileUrl = `/uploads/reports/${path.basename(file.path)}`;
    console.log("File URL:", fileUrl);

    const report = await prisma.report.create({
      data: {
        name: name as string,
        link: link as string,
        date: new Date(date as string),
        type: type as "pdf" | "image",
        file_url: fileUrl,
      },
    });

    console.log("Report created:", report);
    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/reports:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    console.log("Received GET request to /api/reports");
    const reports = await prisma.report.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    console.log("Fetched reports:", reports);
    return NextResponse.json(reports);
  } catch (error: any) {
    console.error("Error in GET /api/reports:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลรายงาน", error: error.message },
      { status: 500 }
    );
  }
}
