import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับการรับข้อมูล Activity
const ActivitySchema = z.object({
  password: z.string().min(8),
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
export async function POST(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;
    // Parse and validate request body
    const rawBody = await request.json();
    const validatedSupply = ActivitySchema.parse(rawBody);

    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/activities",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedSupply),
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
