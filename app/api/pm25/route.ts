import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// สร้าง schema สำหรับข้อมูล body โดยแต่ละ key สามารถมีหรือไม่มีได้ (optional)
const PM25Schema = z.object({
  province: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  search: z.number().optional(),
});

// Centralized API Error Handling
const handleApiError = (error: unknown) => {
  console.error("API Error:", error);

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        message: "Validation Error",
        errors: error.errors.map((err) => err.message),
      },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
};

const validateToken = (token?: string) => {
  if (!token) {
    throw new Error("No token found. Please login.");
  }
  return token;
};

export async function POST(request: NextRequest) {
  try {
    // const token = validateToken(request.cookies.get("token")?.value);
    // const cookieHeader = `token=${token}`;

    // รับข้อมูล body แล้ว validate ด้วย PM25Schema
    const body = await request.json();
    const validatedData = PM25Schema.parse(body);

    // ส่งข้อมูลไปยัง API ใหม่ (pm25)
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/public/pm25",
      {
        method: "POST",
        credentials: "include",
        headers: {
          // Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Express API Error: ${res.status} ${errorText}`);
    }

    const responseData = await res.json();
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
