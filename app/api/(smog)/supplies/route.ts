// ถ้าต้องการให้ข้อมูลที่ได้จาก API มี field ตามที่ SQL query ส่งออกมา
// ต้องแก้ไข schema ให้ครอบคลุม field ทั้งหมดที่ query ส่งกลับมา

import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// ปรับ SupplyResponseSchema ให้ครอบคลุมข้อมูลทั้งหมดที่ได้จาก query
const SupplyResponseSchema = z
  .object({
    id: z.number(),
    hospcode: z.string().min(1),
    hospname: z.string(),
    supplie_id: z.number(),
    suppliename: z.string(),
    supplietype: z.string(),
    suppliecatalog: z.string(),
    quantity_stock: z.number(),
    provcode: z.string(),
    provname: z.string(),
    updated_at: z.string(),
    // ถ้า API ไม่มี fields เหล่านี้ ให้ตั้ง default เป็น 0
    quantity_add: z.number().optional().default(0),
    quantity_minus: z.number().optional().default(0),
    quantity_total: z.number().optional().default(0),
  })
  .transform((data) => ({
    id: data.id,
    hospital_id: data.hospcode, // map hospcode เป็น hospital_id
    hospname: data.hospname,
    supply_id: data.supplie_id, // map supplie_id เป็น supply_id
    suppliename: data.suppliename,
    supplietype: data.supplietype,
    suppliecatalog: data.suppliecatalog,
    quantity_stock: data.quantity_stock,
    provcode: data.provcode,
    provname: data.provname,
    updated_at: data.updated_at,
    quantity_add: data.quantity_add,
    quantity_minus: data.quantity_minus,
    quantity_total: data.quantity_total,
  }));

// Schema สำหรับ Validate Payload ใน POST Endpoint
const SupplySchema = z.object({
  hospital_id: z.string().min(1, "รหัสโรงพยาบาลต้องไม่เป็นค่าว่าง"),
  supply_id: z.number().min(0, "รหัสวัสดุต้องเป็นค่าบวก"),
  quantity_stock: z.number().min(0, "จำนวนต้องเป็นค่าบวก"),
  quantity_add: z.number().min(0, "จำนวนต้องเป็นค่าบวก"),
  quantity_minus: z.number().min(0, "จำนวนต้องเป็นค่าบวก"),
  quantity_total: z.number().min(0, "จำนวนต้องเป็นค่าบวก"),
});

// ฟังก์ชันสำหรับจัดการ Error ของ API
const handleApiError = (error: unknown) => {
  console.error("API Error:", error);
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { message: "Validation Error", errors: error.errors },
      { status: 400 }
    );
  }
  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
};

// ฟังก์ชันตรวจสอบ Token
const validateToken = (token?: string) => {
  if (!token) {
    throw new Error("No token found. Please login.");
  }
  return token;
};

// GET Endpoint สำหรับดึงข้อมูลวัสดุของโรงพยาบาล
export async function GET(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;

    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/frontend/supplyhos",
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
    // Validate และ Transform ข้อมูลด้วย Schema ที่ครอบคลุมทุก field
    const supplies = z.array(SupplyResponseSchema).parse(data);

    return NextResponse.json({ supplies });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST Endpoint สำหรับเพิ่มข้อมูลวัสดุ
export async function POST(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;

    // อ่านและ Validate Payload ที่ส่งเข้ามา
    const rawBody = await request.json();
    const validatedSupply = SupplySchema.parse(rawBody);

    // map hospital_id ไปเป็น key hospcode ตามที่ API ภายนอกต้องการ
    const payloadToExternalAPI = {
      ...validatedSupply,
      hospcode: validatedSupply.hospital_id,
    };

    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/supplies",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadToExternalAPI),
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
