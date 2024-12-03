// app/api/measure2/route.ts
"use server";
import { NextResponse } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับ Measure2
const Measure2Schema = z.object({
  activity_id: z.number().int().min(1),
  measure2_1_1: z.number().int().min(0),
  measure2_1_2: z.number().int().min(0),
  measure2_child: z.number().int().min(0),
  measure2_elderly: z.number().int().min(0),
  measure2_pregnant: z.number().int().min(0),
  measure2_bedridden: z.number().int().min(0),
  measure2_asthma: z.number().int().min(0),
  measure2_copd: z.number().int().min(0),
  measure2_asthma_copd: z.number().int().min(0),
  measure2_health_check_staff: z.number().int().min(0),
  measure2_health_check_volunteer: z.number().int().min(0),
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = Measure2Schema.parse(body);

    // ส่งข้อมูลไปยัง Express API
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure2",
      {
        method: "POST",
        headers: {
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
