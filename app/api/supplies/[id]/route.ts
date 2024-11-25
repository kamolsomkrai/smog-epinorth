// app/api/supplies/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(`https://epinorth-api.ddc.moph.go.th/api/supplies/${params.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Failed to update supply");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating supply:", error);
    return NextResponse.json(
      { message: "Error updating supply" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`https://epinorth-api.ddc.moph.go.th/api/supplies/${params.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete supply");
    }

    return NextResponse.json({ message: "Supply deleted successfully" });
  } catch (error) {
    console.error("Error deleting supply:", error);
    return NextResponse.json(
      { message: "Error deleting supply" },
      { status: 500 }
    );
  }
}
