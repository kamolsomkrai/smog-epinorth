import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  const connection = await mysql.createConnection({
    host: "172.18.1.43",
    user: "root",
    password: "11111111",
    database: "accident",
    port: 3308,
  });

  try {
    const [rows] = await connection.execute(
      "SELECT latitude AS lat, longitude AS lng, image_url AS imageUrl, hospital_treatment AS hospitalTreatment FROM images"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  } finally {
    await connection.end();
  }
}
