import { NextResponse } from "next/server";
import PostalDispatch from "@/lib/models/PostalDispatch";
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
        { postaldispatchId: { $regex: search, $options: "i" } },
        { referenceNo: { $regex: search, $options: "i" } },
        { toTitle: { $regex: search, $options: "i" } },
        { fromTitle: { $regex: search, $options: "i" } },
      ];
    }

    const total = await PostalDispatch.countDocuments(query);
    const dispatches = await PostalDispatch.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);
    
    return NextResponse.json({ data: dispatches, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/postaldispatch error:", error);
    return NextResponse.json({ error: "Failed to fetch postal dispatches" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { 
      toTitle,
      referenceNo,
      address,
      note,
      fromTitle,
      date,
      attachment,
    } = body;

    if (
      !toTitle || !referenceNo || !address || !note || !fromTitle || !date ||
      !attachment 
    ) {
      return NextResponse.json({ error: "All field Required" }, { status: 400 });
    }

    const exists = await PostalDispatch.findOne({ 
      toTitle,
      referenceNo,
      address,
      note,
      fromTitle,
      date,
      attachment,
    });
    if (exists) {
      return NextResponse.json({ error: "This Postal Dispatch Already Exists" }, { status: 400 });
    }

    const count = await PostalDispatch.countDocuments();
    const nextId = `POD-${String(count + 1).padStart(4, "0")}`;

    const newPostalDispatch = new PostalDispatch({
      postaldispatchId: nextId,
      toTitle,
      referenceNo,
      address,
      note,
      fromTitle,
      date,
      attachment,
    });

    await newPostalDispatch.save();

    return NextResponse.json({ message: "Postal Dispatch Created", data: newPostalDispatch }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/postaldispatch error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}