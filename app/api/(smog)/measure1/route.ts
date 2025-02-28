// app/api/measure1/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับ Measure1 พร้อมไฟล์อัปโหลด
const Measure1Schema = z.object({
  activityId: z.number().int().min(1),
  activityDetail: z.string().optional(),
  activityDate: z.string().optional(),
  year: z.number().int().min(1),
  files: z
    .array(
      z.object({
        filePath: z.string(),
        fileName: z.string(),
        fileType: z.string(),
        extension: z.string(),
        fileSize: z.number(),
      })
    )
    .optional(),
});

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

export async function PUT(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;
    const body = await request.json();
    const validatedData = Measure1Schema.parse(body);

    // ส่งข้อมูลไปยัง Express API โดยใช้ method PUT สำหรับ update
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure1",
      {
        method: "PUT",
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
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure1",
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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
