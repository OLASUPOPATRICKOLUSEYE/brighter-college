import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import DisableReason from "@/lib/models/DisableReason";


export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    let query: any = {};

    if (startsWith) {
      query.description = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.description = { $regex: search, $options: "i" };
    }

    const total = await DisableReason.countDocuments(query);
    const reasons = await DisableReason.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: reasons, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/disablereason error:", error);
    return NextResponse.json({ error: "Failed to fetch Disable Reasons" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.description || body.description.trim().length < 5) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const newReason = await DisableReason.create({
      description: body.description.trim(),
    });

    return NextResponse.json(
      { message: "Disable Reason created successfully", data: newReason },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/disablereason error:", error);
    return NextResponse.json({ error: "Failed to create Disable Reason" }, { status: 500 });
  }
}
