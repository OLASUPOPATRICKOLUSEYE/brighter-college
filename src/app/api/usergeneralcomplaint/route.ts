import { NextResponse } from "next/server";
import UserGeneralComplaint from "@/lib/models/UserGeneralComplaint";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { userGeneralComplaintSchema } from "@/lib/validation/validationSchemas";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const total = await UserGeneralComplaint.countDocuments(query);
    const complaints = await UserGeneralComplaint.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: complaints, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/usergeneralcomplaint error:", error);
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, email, subject, description } = body;

    if (!name || !email || !subject || !description) {
      return NextResponse.json({ error: "All Fields Are Required" }, { status: 400 });
    }

    const exists = await UserGeneralComplaint.findOne({ name, email, subject, description });
    if (exists) {
      return NextResponse.json({ error: "This complaint Already Exists" }, { status: 400 });
    }

    const count = await UserGeneralComplaint.countDocuments();
    const nextId = `UGC-${String(count + 1).padStart(4, "0")}`;

    const newComplaint = new UserGeneralComplaint({
      userId: nextId,
      name,
      email,
      subject,
      description,
      date: new Date(),
    });

    await newComplaint.save();

    return NextResponse.json({ message: "Complaint Submitted", data: newComplaint }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/usergeneralcomplaint error:", error);
    return NextResponse.json({ error: error.message || "Failed To Submit complaint" }, { status: 500 });
  }
}
