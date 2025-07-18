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
      .sort({ createdAt: -1 })
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

    const validation = userGeneralComplaintSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const newComplaint = await UserGeneralComplaint.create(validation.data);

    return NextResponse.json(
      { message: "Complaint submitted successfully", data: newComplaint },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/usergeneralcomplaint error:", error);
    return NextResponse.json({ error: "Failed to submit complaint" }, { status: 500 });
  }
}
