import { NextResponse } from "next/server";
import Visitor from "@/lib/models/Visitor"; // Ensure this model exists
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
        { visitorId: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { inTime: { $regex: search, $options: "i" } },
        { outTime: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Visitor.countDocuments(query);
    const visitors = await Visitor.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: visitors, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/visitors error:", error);
    return NextResponse.json({ error: "Failed to fetch visitors" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { 
     purpose,
     meetingWith,
     visitorName,
     phone,
     idCard,
     numberOfPerson,
     date,
     inTime,
     outTime,
     attachment,
     note
     } = body;

    if (
      !purpose || !meetingWith || !visitorName || !phone || !idCard ||
      !numberOfPerson || !date || !inTime || !outTime ||
      !attachment || !note
    ) {
      return NextResponse.json({ error: "All field Required" }, { status: 400 });
    }

    const exists = await Visitor.findOne({ 
     purpose,
     meetingWith,
     visitorName,
     phone,
     idCard,
     numberOfPerson,
     date,
     inTime,
     outTime,
     attachment,
     note,
    });
    if (exists) {
      return NextResponse.json({ error: "This Visitor Already Exists" }, { status: 400 });
    }

    const count = await Visitor.countDocuments();
    const nextId = `VST-${String(count + 1).padStart(4, "0")}`;

    const newVisitor = new Visitor({
    visitorId: nextId,
    purpose,
    meetingWith,
    visitorName,
    phone,
    idCard,
    numberOfPerson,
    date,
    inTime,
    outTime,
    attachment,
    note
    });

    await newVisitor.save();

    return NextResponse.json({ message: "Visitor Created", data: newVisitor }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/visitors Error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}