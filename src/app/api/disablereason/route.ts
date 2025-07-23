import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import DisableReason from "@/lib/models/DisableReason";
import { ITEM_PER_PAGE } from "@/lib/settings";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
  
    const query: any = {};
    if (search) {
      query.disablereason = { $regex: search, $options: "i" };
    }

    const total = await DisableReason.countDocuments(query);
    const data = await DisableReason.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);
    
    return NextResponse.json({ data, total }, { status: 200 });
  } catch (err) {
    console.error("GET /api/disablereason error:", err);
    return NextResponse.json({ error: "Failed to fetch Disable Reasons" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { disablereason, description } = body;

    if (!disablereason || !description) {
      return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
    }

    const exists = await DisableReason.findOne({ disablereason, description });
    if (exists) {
      return NextResponse.json({ error: "This Disable Reason Already Exists" }, { status: 400 });
    }

    const count = await DisableReason.countDocuments();
    const nextId = `DSR-${String(count + 1).padStart(4, "0")}`;

    const newDisableReason = new DisableReason({
      disablereason,
      description,
      disablereasonId: nextId,
    });

    await newDisableReason.save();

    return NextResponse.json({ message: "Disable Reason Created", data: newDisableReason }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/disablereason error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}