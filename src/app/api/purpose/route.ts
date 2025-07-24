import { NextResponse } from "next/server";
import Purpose from "@/lib/models/Purpose";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings"; 

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    let query: any = {};

    if (search) {
      query.$or = [
        { purposeId: { $regex: search, $options: "i" } },
        { purpose: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Purpose.countDocuments(query); 
    const purposes = await Purpose.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: purposes, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/purpose error:", error);
    return NextResponse.json({ error: "Failed to fetch purposes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { purpose, description } = body;

    if (!purpose || !description) {
      return NextResponse.json({ error: "All field Required" }, { status: 400 });
    }

    const exists = await Purpose.findOne({ purpose, description });
    if (exists) {
      return NextResponse.json({ error: "This Purpose Already Exists" }, { status: 400 });
    }

    const count = await Purpose.countDocuments();
    const nextId = `PUR-${String(count + 1).padStart(4, "0")}`;

    const newPurpose = new Purpose({
      purpose,
      description,
      purposeId: nextId,
    });

    await newPurpose.save();

    return NextResponse.json({ message: "Purpose Created", data: newPurpose }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/purpose error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
