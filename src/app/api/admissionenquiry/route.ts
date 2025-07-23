import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import AdmissionEnquiry from "@/lib/models/AdmissionEnquiry";

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
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { assignedstaff: { $regex: search, $options: "i" } },
      ];
    }

    const total = await AdmissionEnquiry.countDocuments(query);
    const enquiries = await AdmissionEnquiry.find(query)
    .sort({ [sortBy]: sortOrder })
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

    const { 
      name,
      phone,
      email,
      address,
      description,
      note,
      date,
      nextfollowupdate,
      assignedstaff,
      reference,
      source,
      classenquiry,
      numberofchild,      
     } = body;

    if (
      !name || !phone || !email || !address || !description || !note ||
      !date || !nextfollowupdate || !assignedstaff || !reference ||
      !source || !classenquiry || !numberofchild      
    ) {
      return NextResponse.json({ error: "All field Required" }, { status: 400 });
    }

    const exists = await AdmissionEnquiry.findOne({ 
      name,
      phone,
      email,
      address,
      description,
      note,
      date,
      nextfollowupdate,
      assignedstaff,
      reference,
      source,
      classenquiry,
      numberofchild,      
     });
    if (exists) {
      return NextResponse.json({ error: "This Admission Enquiry Already Exists" }, { status: 400 });
    }

    const count = await AdmissionEnquiry.countDocuments();
    const nextId = `AEQ-${String(count + 1).padStart(4, "0")}`;

    const newAdmissionEnquiry = new AdmissionEnquiry({
      admissionenquiryId: nextId,
      name,
      phone,
      email,
      address,
      description,
      note,
      date,
      nextfollowupdate,
      assignedstaff,
      reference,
      source,
      classenquiry,
      numberofchild,
    });

    await newAdmissionEnquiry.save();

    return NextResponse.json({ message: "Admission Enquiry Created", data: newAdmissionEnquiry }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admissionenquiry error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}

