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

    if (startsWith) {
      query.complaintType = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.complaintType = { $regex: search, $options: "i" };
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

    const requiredFields = [
      "complaintType",
      "source",
      "complainBy",
      "phone",
      "date",
      "description",
      "actionTaken",
      "assignedStaff",
      "note",
      "attachment",
    ];

    for (const field of requiredFields) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        (typeof body[field] === "string" && body[field].trim() === "") ||
        (Array.isArray(body[field]) && body[field].length === 0)
      ) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const newComplaint = await Complaint.create({
      complaintType: body.complaintType,
      source: body.source,
      complainBy: body.complainBy,
      phone: body.phone,
      date: body.date,
      description: body.description,
      actionTaken: body.actionTaken,
      assignedStaff: body.assignedStaff,
      note: body.note,
      attachment: body.attachment,
    });

    return NextResponse.json(
      { message: "Complaint Created Successfully", data: newComplaint },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/complaint error:", error);
    return NextResponse.json({ error: "Failed to Create Complaint" }, { status: 500 });
  }
}
