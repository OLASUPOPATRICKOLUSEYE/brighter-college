import { NextResponse } from "next/server";
import PostalReceive from "@/lib/models/PostalReceive"; // ✅ Updated model
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings"; // ✅ Pagination setting

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
        { postalreceiveId: { $regex: search, $options: "i" } },
        { referenceNo: { $regex: search, $options: "i" } },
        { toTitle: { $regex: search, $options: "i" } },
        { fromTitle: { $regex: search, $options: "i" } },
      ];
    }
    
    const total = await PostalReceive.countDocuments(query);
    const receives = await PostalReceive.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);
    
    return NextResponse.json({ data: receives, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/postalreceive error:", error);
    return NextResponse.json({ error: "Failed to fetch postal receives" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { 
      fromTitle,
      referenceNo,
      address,
      note,
      toTitle,
      date,
      attachment,
    } = body;

    if (
      !toTitle || !referenceNo || !address || !note || !fromTitle || !date ||
      !attachment 
    ) {
      return NextResponse.json({ error: "All field Required" }, { status: 400 });
    }

    const exists = await PostalReceive.findOne({ 
      fromTitle,
      referenceNo,
      address,
      note,
      toTitle,
      date,
      attachment,
    });
    if (exists) {
      return NextResponse.json({ error: "This Postal Receive Already Exists" }, { status: 400 });
    }

    const count = await PostalReceive.countDocuments();
    const nextId = `POR-${String(count + 1).padStart(4, "0")}`;

    const newPostalReceive = new PostalReceive({
      postalreceiveId: nextId,
      fromTitle,
      referenceNo,
      address,
      note,
      toTitle,
      date,
      attachment,
    });

    await newPostalReceive.save();

    return NextResponse.json({ message: "Postal Receive Created", data: newPostalReceive }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/postalreceive error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}