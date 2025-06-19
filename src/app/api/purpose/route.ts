import { NextResponse } from "next/server";
import Purpose from "@/lib/models/Purpose";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings"; // ✅ Pagination setting

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";
    const page = parseInt(searchParams.get("page") || "1", 10); // ✅ page from query param

    let query: any = {};

    if (startsWith) {
      query.purpose = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.purpose = { $regex: search, $options: "i" };
    }

    const total = await Purpose.countDocuments(query); // ✅ total for pagination
    const purposes = await Purpose.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE) // ✅ skip for pagination
      .limit(ITEM_PER_PAGE); // ✅ limit for pagination

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

    if (!body.purpose || body.purpose.trim() === "") {
      return NextResponse.json({ error: "Purpose is required" }, { status: 400 });
    }

    const newPurpose = await Purpose.create({
      purpose: body.purpose,
      description: body.description || "",
    });

    return NextResponse.json(
      { message: "Purpose created successfully", data: newPurpose },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/purpose error:", error);
    return NextResponse.json({ error: "Failed to create purpose" }, { status: 500 });
  }
}
