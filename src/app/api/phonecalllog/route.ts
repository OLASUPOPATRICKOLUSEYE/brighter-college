import { NextResponse } from "next/server";
import PhoneCallLog from "@/lib/models/PhoneCallLog";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
const sortBy = searchParams.get("sortBy") || "createdAt";
const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;


  let query: any = {};
    if (search) {
      // Search by name, phone or description (optional, add/remove fields)
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { note: { $regex: search, $options: "i" } },
      ];
    }

    const total = await PhoneCallLog.countDocuments(query);
    const phonecalllogs = await PhoneCallLog.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);      

    return NextResponse.json({ data: phonecalllogs, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/phonecalllog error:", error);
    return NextResponse.json({ error: "Failed to fetch phone call logs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const requiredFields = ["name", "phone", "date", "description", "nextfollowupdate", "callduration", "note", "calltype"];

    for (const field of requiredFields) {
      if (!body[field] || body[field].toString().trim() === "") {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const newPhoneCallLog = await PhoneCallLog.create({
      name: body.name,
      phone: body.phone,
      date: new Date(body.date),
      description: body.description,
      nextfollowupdate: new Date(body.nextfollowupdate),
      callduration: body.callduration,
      note: body.note,
      calltype: body.calltype,
    });

    return NextResponse.json(
      { message: "Phone Call Log created successfully", data: newPhoneCallLog },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/phonecalllog error:", error);
    return NextResponse.json({ error: "Failed to create phone call log" }, { status: 500 });
  }
}
