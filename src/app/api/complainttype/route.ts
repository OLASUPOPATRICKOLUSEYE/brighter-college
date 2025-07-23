import { NextResponse } from "next/server";
import ComplaintType from "@/lib/models/ComplaintType";
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

    if (startsWith) {
      query.complainttype = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.complainttype = { $regex: search, $options: "i" };
    }

    const total = await ComplaintType.countDocuments(query);
    const complaintTypes = await ComplaintType.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: complaintTypes, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/complainttype error:", error);
    return NextResponse.json({ error: "Failed to fetch complaint types" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { complainttype, description } = body;

    if (!complainttype || !description) {
      return NextResponse.json({ error: "All Field Required" }, { status: 400 });
    }

    const exists = await ComplaintType.findOne({ complainttype, description });
    if (exists) {
      return NextResponse.json({ error: "This Complaint Type Already Exists" }, { status: 400 });
    }

    const count = await ComplaintType.countDocuments();
    const nextId = `CMT-${String(count + 1).padStart(4, "0")}`;

    const newComplaintType = new ComplaintType({
      complainttype,
      description,
      complainttypeId: nextId,
    });

    await newComplaintType.save();

    return NextResponse.json({ message: "Complaint Type Created", data: newComplaintType }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/complaintype error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
