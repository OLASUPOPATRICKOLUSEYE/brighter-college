import { NextResponse } from "next/server";
import AdmissionEnquiry from "@/lib/models/AdmissionEnquiry";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { admissionEnquirySchema } from "@/lib/validation/validationSchemas"; 

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
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { assignedstaff: { $regex: search, $options: "i" } },
      ];
    }

    const total = await AdmissionEnquiry.countDocuments(query);
    const enquiries = await AdmissionEnquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: enquiries, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/admissionenquiry error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // ✅ Validate using Zod schema
    const validation = admissionEnquirySchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const newEnquiry = await AdmissionEnquiry.create(validation.data);

    return NextResponse.json(
      { message: "Admission enquiry created successfully", data: newEnquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admissionenquiry error:", error);
    return NextResponse.json({ error: "Failed to create admission enquiry" }, { status: 500 });
  }
}
