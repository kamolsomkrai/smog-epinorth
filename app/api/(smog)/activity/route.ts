// app/api/supplies/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับข้อมูล Activity ตามตารางที่ออกแบบไว้
const ActivitySchema = z.object({
  activityType: z.number().int().min(1).optional(),
  year: z.string().optional(),
});

// Schema สำหรับการตอบกลับของ API
const ApiResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  data: z.array(ActivitySchema),
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

// Utility function เพื่อ validate token
const validateToken = (token?: string) => {
  if (!token) {
    throw new Error("No token found. Please login.");
  }
  return token;
};

export async function GET(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/activities",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      }
    );
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`การดึงข้อมูลล้มเหลว: ${res.status} ${errorText}`);
    }
    const data = await res.json();
    const apiResponse = ApiResponseSchema.parse(data);
    const supplies = apiResponse.data;
    return NextResponse.json({
      supplies,
      total: supplies.length,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;
    // Parse และ validate request body
    const rawBody = await request.json();
    const validatedActivity = ActivitySchema.parse(rawBody);

    // ส่งข้อมูลไปยัง Express API ที่จัดการกับตาราง activity
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/activities",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedActivity),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`การเพิ่มข้อมูลล้มเหลว: ${res.status} ${errorText}`);
    }

    const responseData = await res.json();
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
