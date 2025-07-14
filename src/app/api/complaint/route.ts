import { NextResponse } from "next/server";
import Complaint from "@/lib/models/Complaint";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings"; // ✅ Pagination setting

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    let query: any = {};

    if (startsWith) {
      query.complaintType = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.complaintType = { $regex: search, $options: "i" };
    }

    const total = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
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
      "sno",
      "complaintType",
      "source",
      "complainBy",
      "phone",
      "date",
      "description",
      "actionTaken",
      "assign",
      "note",
      "attachDocument",
    ];

    for (const field of requiredFields) {
      if (!body[field] || body[field].toString().trim() === "") {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const newComplaint = await Complaint.create({
      sno: body.sno,
      complaintType: body.complaintType,
      source: body.source,
      complainBy: body.complainBy,
      phone: body.phone,
      date: body.date,
      description: body.description,
      actionTaken: body.actionTaken,
      assign: body.assign,
      note: body.note,
      attachDocument: body.attachDocument,
    });

    return NextResponse.json(
      { message: "Complaint created successfully", data: newComplaint },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/complaint error:", error);
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 });
  }
}
