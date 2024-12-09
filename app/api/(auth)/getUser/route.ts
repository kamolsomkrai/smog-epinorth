// app/api/(auth)/getUser/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
