import { NextResponse } from "next/server";
import formidable from "formidable";
import mysql from "mysql2/promise";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import path from "path";

import { v4 as uuidv4 } from "uuid"; // สำหรับสร้าง UUID

const generateUniqueFilename = (originalFilename: string): string => {
  const ext = path.extname(originalFilename); // ดึงนามสกุลไฟล์
  const uniqueId = uuidv4(); // สร้าง UUID
  return `${uniqueId}${ext}`; // รวม UUID กับนามสกุลไฟล์
};

export async function OPTIONS() {
  const response = NextResponse.json({});
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Unsupported Media Type" },
      { status: 415 }
    );
  }

  const buffer = await request.arrayBuffer();
  const stream = Readable.from(Buffer.from(buffer));

  const headersObj = Object.fromEntries(request.headers.entries());

  const req = Object.assign(stream, {
    headers: headersObj,
    method: request.method,
    url: request.url,
  }) as unknown as IncomingMessage;

  const form = formidable({
    uploadDir: "./public/uploads",
    keepExtensions: true,
    filename: (name, ext, part) => {
      const originalFilename = part.originalFilename || "file";
      return generateUniqueFilename(originalFilename); // ใช้ชื่อไฟล์ใหม่
    },
  });

  try {
    const { fields, files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // Extract single values from fields
    const getSingleValue = (field: string | string[] | undefined): string => {
      if (Array.isArray(field)) return field[0];
      return field as string;
    };

    const latitudeValue = parseFloat(getSingleValue(fields.latitude));
    const longitudeValue = parseFloat(getSingleValue(fields.longitude));
    const ageValue = parseInt(getSingleValue(fields.age), 10);
    const genderValue = parseInt(getSingleValue(fields.gender), 10);

    console.log("Fields received:", fields);
    console.log("Files received:", files);

    const connection = await mysql.createConnection({
      host: "172.18.1.43",
      user: "root",
      password: "11111111",
      database: "accident",
      port: 3308,
    });

    try {
      const uploadedFiles = Object.values(files);
      for (const file of uploadedFiles) {
        if (!file) continue;
        const fileArray = Array.isArray(file) ? file : [file];
        for (const f of fileArray) {
          if (!f) continue;
          const imageUrl = `/uploads/${path.basename(f.filepath)}`;

          await connection.execute(
            `INSERT INTO images (
              image_url, latitude, longitude, gender, grade, classroom, age, has_accident,
              accident_type, accident_location, accident_date, hospital_treatment, risk_area
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              imageUrl,
              latitudeValue,
              longitudeValue,
              genderValue,
              getSingleValue(fields.grade),
              getSingleValue(fields.classroom),
              ageValue,
              getSingleValue(fields.hasAccident),
              getSingleValue(fields.accidentType),
              getSingleValue(fields.accidentLocation),
              getSingleValue(fields.accidentDate),
              getSingleValue(fields.hospitalTreatment),
              getSingleValue(fields.riskArea),
            ]
          );
        }
      }

      return NextResponse.json({
        message: "Files uploaded and saved to database successfully",
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save data to database" },
        { status: 500 }
      );
    } finally {
      await connection.end();
    }
  } catch (parseError) {
    console.error("Error parsing the files:", parseError);
    return NextResponse.json(
      { error: "Error parsing the files" },
      { status: 500 }
    );
  }
}
