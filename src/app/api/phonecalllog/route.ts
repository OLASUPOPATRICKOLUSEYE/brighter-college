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
      query.$or = [
        { phonecalllogId: { $regex: search, $options: "i" } },
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

    const { 
    name,
    phone,
    date,
    description,
    nextfollowupdate,
    callduration,
    note,
    calltype,
    } = body;

    if (
      !name || !phone || !date || !description || !nextfollowupdate || !callduration ||
      !note || !calltype      
    ) {
      return NextResponse.json({ error: "All field Required" }, { status: 400 });
    }

    const exists = await PhoneCallLog.findOne({ 
    name,
    phone,
    date,
    description,
    nextfollowupdate,
    callduration,
    note,
    calltype,     });
    if (exists) {
      return NextResponse.json({ error: "This Phone Call Log Already Exists" }, { status: 400 });
    }

    const count = await PhoneCallLog.countDocuments();
    const nextId = `PCL-${String(count + 1).padStart(4, "0")}`;

    const newPhoneCallLog = new PhoneCallLog({
      phonecalllogId: nextId,
      name,
      phone,
      date,
      description,
      nextfollowupdate,
      callduration,
      note,
      calltype,
    });

    await newPhoneCallLog.save();

    return NextResponse.json({ message: "Phone Call Log Created", data: newPhoneCallLog }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/phonecalllog error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
