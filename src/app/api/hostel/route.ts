import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Hostel from "@/lib/models/Hostel";

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
        { hostelId: { $regex: search, $options: "i" } },
        { hostelName: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Hostel.countDocuments(query);
    const results = await Hostel.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);


    return NextResponse.json({ data: results, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/hostel error:", error);
    return NextResponse.json({ error: "Failed to fetch Hostel" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { hostelName, description } = body;

    if (!hostelName || !description) {
      return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
    }

    const exists = await Hostel.findOne({ hostelName, description });
    if (exists) {
      return NextResponse.json({ error: "This Hostel Already Exists" }, { status: 400 });
    }

    const count = await Hostel.countDocuments();
    const nextId = `HT-${String(count + 1).padStart(4, "0")}`;

    const newHostel = new Hostel({
      hostelName,
      description,
      hostelId: nextId,
    });

    await newHostel.save();

    return NextResponse.json({ message: "Hostel Created", data: newHostel }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/hostel error:", error);
    return NextResponse.json({ error: error.message || "Failed to Create" }, { status: 500 });
  }
}
