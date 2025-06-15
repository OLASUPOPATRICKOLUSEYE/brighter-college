import { NextResponse } from "next/server";
import Purpose from "@/lib/models/Purpose";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const purposes = await Purpose.find();
    return NextResponse.json({ data: purposes }, { status: 200 });
  } catch (error) {
    console.error("GET /api/purpose error:", error);
    return NextResponse.json({ error: "Failed to fetch purposes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.purpose || body.purpose.trim() === "") {
      return NextResponse.json({ error: "Purpose is required" }, { status: 400 });
    }

    const newPurpose = await Purpose.create({
      purpose: body.purpose,
      description: body.description || "",
    });

    return NextResponse.json({ message: "Purpose created successfully", data: newPurpose }, { status: 201 });
  } catch (error) {
    console.error("POST /api/purpose error:", error);
    return NextResponse.json({ error: "Failed to create purpose" }, { status: 500 });
  }
}
