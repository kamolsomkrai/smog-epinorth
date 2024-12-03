// app/api/measure3/route.ts
"use server";
import { NextResponse } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับ Measure3
const Measure3Schema = z.object({
  activity_id: z.number().int().min(1),
  measure3_pollution_clinic_open: z.number().int().min(0),
  measure3_pollution_clinic_service: z.number().int().min(0),
  measure3_online_clinic_open: z.number().int().min(0),
  measure3_online_clinic_service: z.number().int().min(0),
  measure3_nursery_dust_free_open: z.number().int().min(0),
  measure3_nursery_dust_free_service: z.number().int().min(0),
  measure3_gov_dust_free_open: z.number().int().min(0),
  measure3_gov_dust_free_service: z.number().int().min(0),
  measure3_active_teams_3_doctors_total: z.number().int().min(0),
  measure3_active_teams_3_doctors_add: z.number().int().min(0),
  measure3_active_teams_mobile_total: z.number().int().min(0),
  measure3_active_teams_mobile_add: z.number().int().min(0),
  measure3_active_teams_citizens_total: z.number().int().min(0),
  measure3_active_teams_citizens_add: z.number().int().min(0),
  measure3_personal_protective_gear: z.number().int().min(0),
  measure3_elderly_N95_mask: z.number().int().min(0),
  measure3_elderly_surgical_mask: z.number().int().min(0),
  measure3_children_N95_mask: z.number().int().min(0),
  measure3_children_surgical_mask: z.number().int().min(0),
  measure3_pregnant_N95_mask: z.number().int().min(0),
  measure3_pregnant_surgical_mask: z.number().int().min(0),
  measure3_bedridden_N95_mask: z.number().int().min(0),
  measure3_bedridden_surgical_mask: z.number().int().min(0),
  measure3_disease_N95_mask: z.number().int().min(0),
  measure3_disease_surgical_mask: z.number().int().min(0),
  measure3_sky_doctor: z.number().int().min(0),
  measure3_ambulance: z.number().int().min(0),
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = Measure3Schema.parse(body);

    // ส่งข้อมูลไปยัง Express API
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure3",
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
      "https://epinorth-api.ddc.moph.go.th/api/measure3",
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
