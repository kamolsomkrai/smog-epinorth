// app/api/supplies/route.ts
"use server";

import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log("Extracted Token:", token);

    if (!token) {
      console.log("No token found in cookies.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/supplies",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("External API Response Status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Error fetching supplies: ${res.status} ${res.statusText} - ${errorText}`
      );
      return NextResponse.json(
        { message: `Failed to fetch supplies: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("Supplies Data Fetched:", data);

    // Adjust based on the external API's response structure
    return NextResponse.json({ supplies: data.supplies || data });
  } catch (error) {
    console.error("Error fetching supplies:", error);
    return NextResponse.json(
      { message: "Error fetching supplies" },
      { status: 500 }
    );
  }
}

// app/api/supplies/route.ts
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/supplies",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to add supply");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding supply:", error);
    return NextResponse.json(
      { message: "Error adding supply" },
      { status: 500 }
    );
  }
}
