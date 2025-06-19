import { NextResponse } from "next/server";
import PhoneCallLog from "@/lib/models/PhoneCallLog";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const phoneCallLogs = await PhoneCallLog.find();
    return NextResponse.json({ data: phoneCallLogs }, { status: 200 });
  } catch (error) {
    console.error("GET /api/phonecalllog error:", error);
    return NextResponse.json({ error: "Failed to fetch phone call logs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || body.name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newPhoneCallLog = await PhoneCallLog.create({
      name: body.name,
      phone: body.phone,
      date: body.date,
      description: body.description || "",
      nextFollowUpDate: body.nextFollowUpDate || "",
      duration: body.duration || "",
      callType: body.callType || "",
      note: body.note || "",
    });

    return NextResponse.json(
      { message: "Phone call log created successfully", data: newPhoneCallLog },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/phonecalllog error:", error);
    return NextResponse.json({ error: "Failed to create phone call log" }, { status: 500 });
  }
}
