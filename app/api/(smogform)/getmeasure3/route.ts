// app/api/measure2/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับ Measure2
// const Measure2Schema = z.object({
//   activity_id: z.number().int().min(1),
//   risk_health_monitoring_1_1: z.number().int().min(0),
//   risk_health_monitoring_1_2: z.number().int().min(0),
//   child: z.number().int().min(0),
//   elderly: z.number().int().min(0),
//   pregnant: z.number().int().min(0),
//   bedridden: z.number().int().min(0),
//   asthma: z.number().int().min(0),
//   copd: z.number().int().min(0),
//   asthma_copd: z.number().int().min(0),
//   health_check_staff: z.number().int().min(0),
//   health_check_volunteer: z.number().int().min(0),
// });

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

// Utility function to validate token
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
    // const body = await request.json();
    // const validatedData = Measure2Schema.parse(body);

    // ส่งข้อมูลไปยัง Express API
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure3/show",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(validatedData),
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
