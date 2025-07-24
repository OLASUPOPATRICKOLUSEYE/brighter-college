import { NextResponse } from "next/server";
import Complaint from "@/lib/models/Complaint";
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
        { complaintId: { $regex: search, $options: "i" } },
        { complaintType: { $regex: search, $options: "i" } },
        { complaintBy: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: complaints, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/complaint error:", error);
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { 
      complaintType,
      source,
      complainBy,
      phone,
      date,
      description,
      actionTaken,
      assignedStaff,
      note,
      attachment,
    } = body;

    if (
      !complaintType || !source || !complainBy || !phone || !date || !description ||
      !actionTaken || !assignedStaff || !note || !attachment
    ) {
      return NextResponse.json({ error: "All field Required" }, { status: 400 });
    }

    const exists = await Complaint.findOne({ 
      complaintType,
      source,
      complainBy,
      phone,
      date,
      description,
      actionTaken,
      assignedStaff,
      note,
      attachment,
    });
    if (exists) {
      return NextResponse.json({ error: "This Complaint Already Exists" }, { status: 400 });
    }

    const count = await Complaint.countDocuments();
    const nextId = `COM-${String(count + 1).padStart(4, "0")}`;

    const newComplaint = new Complaint({
      complaintId: nextId,
      complaintType,
      source,
      complainBy,
      phone,
      date,
      description,
      actionTaken,
      assignedStaff,
      note,
      attachment,
    });

    await newComplaint.save();

    return NextResponse.json({ message: "Complaint Created", data: newComplaint }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/complaint error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}