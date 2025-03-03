// app/api/measure3/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับ Measure3
const Measure3Schema = z.object({
  activityId: z.number().int().min(1),
  pollutionClinicTotal: z.number().int().min(0),
  pollutionCliniService: z.number().int().min(0),
  onlinePollutionClinicTotal: z.number().int().min(0),
  onlinePollutionCliniService: z.number().int().min(0),
  mosquitoNetTotal: z.number().int().min(0),
  mosquitoNetService: z.number().int().min(0),
  nurseryDustFreeTotal: z.number().int().min(0),
  nurseryDustFreeService: z.number().int().min(0),
  publicHealthDustFreeTotal: z.number().int().min(0),
  publicHealthDustFreeService: z.number().int().min(0),
  officeDustFreeTotal: z.number().int().min(0),
  officeDustFreeService: z.number().int().min(0),
  buildingDustFreeTotal: z.number().int().min(0),
  buildingDustFreeService: z.number().int().min(0),
  otherDustFreeTotal: z.number().int().min(0),
  otherDustFreeService: z.number().int().min(0),
  team3DoctorTotal: z.number().int().min(0),
  team3DoctorService: z.number().int().min(0),
  mobileDoctorTotal: z.number().int().min(0),
  mobileDoctorService: z.number().int().min(0),
  civilTakeCareTotal: z.number().int().min(0),
  civilTakeCareService: z.number().int().min(0),
  shertTeamProvTotal: z.number().int().min(0),
  shertTeamProvService: z.number().int().min(0),
  shertTeamDistTotal: z.number().int().min(0),
  shertTeamDistService: z.number().int().min(0),
  envoCccuTotal: z.number().int().min(0),
  envoCccuService: z.number().int().min(0),
  n95MaskGiveCivil: z.number().int().min(0),
  surgicalMaskGiveCivil: z.number().int().min(0),
  n95MaskGiveChild: z.number().int().min(0),
  surgicalMaskGiveChild: z.number().int().min(0),
  n95MaskGiveOlder: z.number().int().min(0),
  surgicalMaskGiveOlder: z.number().int().min(0),
  n95MaskGivePregnant: z.number().int().min(0),
  surgicalMaskGivePregnant: z.number().int().min(0),
  n95MaskGiveBedridden: z.number().int().min(0),
  surgicalMaskGiveBedridden: z.number().int().min(0),
  n95MaskGiveSick: z.number().int().min(0),
  surgicalMaskGiveSick: z.number().int().min(0),
  n95MaskGiveHeart: z.number().int().min(0),
  surgicalMaskGiveHeart: z.number().int().min(0),
  n95MaskGiveCopd: z.number().int().min(0),
  surgicalMaskGiveCopd: z.number().int().min(0),
  skyDoctor: z.number().int().min(0),
  ambulance: z.number().int().min(0),
  year: z.number().int().min(1),
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

export async function PUT(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;
    const body = await request.json();
    const validatedData = Measure3Schema.parse(body);

    // ส่งข้อมูลไปยัง Express API
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/measure3",
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
