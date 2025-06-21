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

    let query: any = {};

    if (startsWith) {
      query.complainttype = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.complainttype = { $regex: search, $options: "i" };
    }

    const total = await ComplaintType.countDocuments(query);
    const complaintTypes = await ComplaintType.find(query)
      .sort({ createdAt: -1 })
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

    if (!body.complainttype || body.complainttype.trim() === "") {
      return NextResponse.json({ error: "Complaint type is required" }, { status: 400 });
    }

    const newComplaintType = await ComplaintType.create({
      complainttype: body.complainttype,
      description: body.description || "",
    });

    return NextResponse.json(
      { message: "Complaint type created successfully", data: newComplaintType },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/complainttype error:", error);
    return NextResponse.json({ error: "Failed to create complaint type" }, { status: 500 });
  }
}
