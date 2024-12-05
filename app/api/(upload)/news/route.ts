// app/api/news/route.ts
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

const uploadDir = path.join(process.cwd(), "public", "uploads", "news");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request: Request) {
  try {
    console.log("Received POST request to /api/news");

    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      multiples: false,
      // ส่งผ่าน headers จากคำขอเพื่อให้ formidable สามารถอ่าน content-length ได้
      headers: Object.fromEntries(request.headers.entries()),
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

    const { title, description } = data.fields;
    const image = data.files.image as formidable.File;

    if (!title || !description || !image) {
      console.error("Missing required fields");
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    const imageUrl = `/uploads/news/${path.basename(image.path)}`;
    console.log("Image URL:", imageUrl);

    const news = await prisma.news.create({
      data: {
        title: title as string,
        description: description as string,
        image_url: imageUrl,
      },
    });

    console.log("News created:", news);
    return NextResponse.json(news, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/news:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    console.log("Received GET request to /api/news");
    const news = await prisma.news.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    console.log("Fetched news:", news);
    return NextResponse.json(news);
  } catch (error: any) {
    console.error("Error in GET /api/news:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลข่าวสาร", error: error.message },
      { status: 500 }
    );
  }
}
