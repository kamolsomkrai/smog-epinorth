// app/api/measure2/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับ Measure2
const Measure2Schema = z.object({
  activityId: z.number().int().min(1),
  riskHealthInfo: z.number().int().min(0),
  riskHealthSocial: z.number().int().min(0),
  riskChildTotal: z.number().int().min(0),
  riskChildTakeCare: z.number().int().min(0),
  riskOlderTotal: z.number().int().min(0),
  riskOlderTakeCare: z.number().int().min(0),
  riskPregnantTotal: z.number().int().min(0),
  riskPregnantTakeCare: z.number().int().min(0),
  riskBedriddenTotal: z.number().int().min(0),
  riskBedriddenTakeCare: z.number().int().min(0),
  riskHeartTotal: z.number().int().min(0),
  riskHeartTakeCare: z.number().int().min(0),
  riskCopdTotal: z.number().int().min(0),
  riskCopdTakeCare: z.number().int().min(0),
  healthcareOfficer: z.number().int().min(0),
  year: z.number().int().min(1),
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

// Utility function to validate token
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
    const validatedData = Measure2Schema.parse(body);

    // ส่งข้อมูลไปยัง Express API
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure2",
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
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    // ส่งคำขอ GET ไปยัง Express API
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure2",
      {
        method: "GET",
        credentials: "include",
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
