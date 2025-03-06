// app/api/supplies/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema for Supply Validation
const SupplySchema = z.object({
  id: z.number().optional(),
  hospcode: z.string().min(1, "รหัสโรงพยาบาลต้องไม่เป็นค่าว่าง"),
  hospname: z.string().min(1, "ชื่อโรงพยาบาลต้องไม่เป็นค่าว่าง"),
  supplie_id: z.number().min(0, "รหัสวัสดุต้องเป็นค่าบวก"),
  suppliename: z.string().min(1, "ชื่อวัสดุต้องไม่เป็นค่าว่าง"),
  supplietype: z.string().min(1, "ประเภทวัสดุต้องไม่เป็นค่าว่าง"),
  suppliecatalog: z.string().min(1, "แคตตาล็อกวัสดุต้องไม่เป็นค่าว่าง"),
  quantity_stock: z.number().min(0, "จำนวนต้องเป็นค่าบวก"),
  provcode: z.string().min(1, "รหัสจังหวัดต้องไม่เป็นค่าว่าง"),
  provname: z.string().min(1, "ชื่อจังหวัดต้องไม่เป็นค่าว่าง"),
  updated_at: z.string().min(1, "วันที่อัพเดทต้องไม่เป็นค่าว่าง"),
});

// เพิ่ม Schema สำหรับการตอบกลับของ API
const ApiResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  data: z.array(SupplySchema),
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

export async function GET(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);

    // สร้างค่า Cookie ที่จะส่งไปยัง API ภายนอก
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

    // เนื่องจาก API ส่งกลับเป็น Array เราจึง validate ด้วย Schema แบบ Array
    const supplies = z.array(SupplySchema).parse(data);

    return NextResponse.json({
      supplies,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = validateToken(request.cookies.get("token")?.value);
    const cookieHeader = `token=${token}`;
    // Parse and validate request body
    const rawBody = await request.json();
    const validatedSupply = SupplySchema.parse(rawBody);

    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/supplies",
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

// // Optional: Add PUT and DELETE methods similarly
// export async function PUT(request: NextRequest) {
//   try {
//     const token = validateToken(request.cookies.get("token")?.value);
//     const cookieHeader = `token=${token}`;
//     const rawBody = await request.json();
//     const validatedSupply = SupplySchema.parse(rawBody);
//     console.log(validatedSupply);
//     const res = await fetch(
//       `https://epinorth-api.ddc.moph.go.th/api/supplies/${validatedSupply.id}`,
//       {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Cookie: cookieHeader,
//         },
//         body: JSON.stringify(validatedSupply),
//       }
//     );

//     if (!res.ok) {
//       const errorText = await res.text();
//       throw new Error(`การแก้ไขข้อมูลล้มเหลว: ${res.status} ${errorText}`);
//     }

//     const responseData = await res.json();
//     return NextResponse.json(responseData);
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const token = validateToken(request.cookies.get("token")?.value);
//     const cookieHeader = `token=${token}`;
//     // Extract ID from request URL
//     const url = new URL(request.url);
//     const id = url.searchParams.get("id");

//     if (!id) {
//       throw new Error("ต้องระบุ ID ของรายการที่ต้องการลบ");
//     }

//     const res = await fetch(
//       `https://epinorth-api.ddc.moph.go.th/api/supplies/${id}`,
//       {
//         method: "DELETE",
//         // credentials: "include",
//         headers: {
//           Cookie: cookieHeader,
//         },
//       }
//     );

//     if (!res.ok) {
//       const errorText = await res.text();
//       throw new Error(`การลบข้อมูลล้มเหลว: ${res.status} ${errorText}`);
//     }

//     return NextResponse.json({ message: "ลบรายการสำเร็จ" }, { status: 200 });
//   } catch (error) {
//     return handleApiError(error);
//   }
// }
