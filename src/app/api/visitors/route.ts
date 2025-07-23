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

    if (startsWith) {
      query.visitorName = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.visitorName = { $regex: search, $options: "i" };
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

    const requiredFields = [
      "purpose",
      "meetingWith",
      "visitorName",
      "phone",
      "idCard",
      "numberOfPerson",
      "date",
      "inTime",
      "outTime",
      "attachment",
      "note",
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

    const newVisitor = await Visitor.create({
      purpose: body.purpose,
      meetingWith: body.meetingWith,
      visitorName: body.visitorName,
      phone: body.phone,
      idCard: body.idCard,
      numberOfPerson: body.numberOfPerson,
      date: body.date,
      inTime: body.inTime,
      outTime: body.outTime,
      attachment: body.attachment,
      note: body.note,
    });

    return NextResponse.json(
      { message: "Visitor Created Successfully", data: newVisitor },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/visitors error:", error);
    return NextResponse.json({ error: "Failed to create visitor" }, { status: 500 });
  }
}
