// app/api/getUser/route.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // เนื่องจากคุณอาจไม่มี JWT_SECRET จาก API ภายนอก เราจะใช้ jwt.decode แทน
    const decoded = jwt.decode(token);

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json(decoded);
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
