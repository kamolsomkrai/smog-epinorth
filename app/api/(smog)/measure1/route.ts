// app/api/measure1/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับ Measure1
const Measure1Schema = z.object({
  activity_id: z.number().int().min(1),
  sub_measure_1_1: z.string().min(1, "sub_measure_1_1 ต้องไม่เป็นค่าว่าง"),
  sub_measure_1_2: z.string().min(1, "sub_measure_1_2 ต้องไม่เป็นค่าว่าง"),
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
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;
    // Parse and validate request body
    const body = await request.json();
    const validatedData = Measure1Schema.parse(body);

    // ส่งข้อมูลไปยัง Express API
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure1",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
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

export async function GET() {
  try {
    // ส่งคำขอ GET ไปยัง Express API
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Express API Error: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
