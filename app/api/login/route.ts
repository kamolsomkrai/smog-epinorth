// app/api/login/route.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  try {
    // ส่งคำขอไปยัง API ภายนอกเพื่อทำการล็อกอิน
    const res = await fetch("https://epinorth-api.ddc.moph.go.th/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      // รับ JWT token จาก API ภายนอก
      const token = data.token;

      // Decode token เพื่อรับข้อมูลผู้ใช้
      const decoded = jwt.decode(token);

      // สร้าง response และตั้งค่าคุกกี้
      const response = NextResponse.json({ message: "Login successful", user: decoded });

      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 3600, // หรือเวลาที่คุณต้องการ
        secure: process.env.NODE_ENV === "production", // ควรตั้งค่าเป็น true ใน production
        sameSite: "lax",
      });

      // ส่ง response ที่ตั้งค่าคุกกี้แล้วกลับไป
      return response;
    } else {
      return NextResponse.json(
        { message: data.message || "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
