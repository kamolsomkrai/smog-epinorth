import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// สร้าง connection pool เพื่อใช้ในการเชื่อมต่อฐานข้อมูล
const pool = mysql.createPool({
  host: "172.18.1.43",
  user: "root",
  password: "11111111",
  database: "accident",
  port: 3308,
  waitForConnections: true,
  connectionLimit: 10, // จำนวนการเชื่อมต่อสูงสุดที่อนุญาต
  queueLimit: 0,
});

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT latitude AS lat, longitude AS lng, image_url AS imageUrl, hospital_treatment AS hospitalTreatment FROM images"
    );
    return NextResponse.json(rows, {
      headers: {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*", // ปรับให้เป็นโดเมนของคุณแทน "*"
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*", // ปรับให้เป็นโดเมนของคุณแทน "*"
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
      }
    );
  }
}
