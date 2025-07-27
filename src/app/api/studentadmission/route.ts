import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import StudentAdmission from "@/lib/models/StudentAdmission";

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
        { studentadmissionId: { $regex: search, $options: "i" } },
        { studentName: { $regex: search, $options: "i" } },
        { gender: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { className: { $regex: search, $options: "i" } },
      ];
    }

    const total = await StudentAdmission.countDocuments(query);
    const admissions = await StudentAdmission.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: admissions, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/studentadmission error:", error);
    return NextResponse.json({ error: "Failed To Fetch Admissions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      studentName,
      gender,
      dateofBirth,
      category,
      religion,
      session,
      className,
      caste,
      phoneNumber,
      email,
      admissionDate,
      studentAttachment,
      bloodGroup,
      genotype,
      studenthouse,
      height,
      weight,
      measurementDate,
      medicalHistory,
      address,
      siblingClass,
      siblingSession,
      siblingName,
      routeName,
      pickuppoint,
      feesMonth,
      hostelName,
      roomName,
      feeDetails,
      feeDiscountDetail,
      fatherName,
      fatherPhone,
      fatherOccupation,
      fatherAttachment,
      motherName,
      motherPhone,
      motherOccupation,
      motherAttachment,
      guardianIs,
      guardianName,
      guardianRelation,
      guardianEmail,
      guardianPhone,
      guardianOccupation,
      guardianAddress,
      guardianAttachment,
      guardianSameAsCurrent,
      permanentSameAsCurrent,
      permanentAddress,
      accountNumber,
      bankName,
      sortCode,
      nin,
      previousSchoolDetails,
      note,
      title1,
      title1Attachment,
      title2,
      title2Attachment,
      title3,
      title3Attachment,
      title4,
      title4Attachment,
    } = body;

    // Validate required fields (minimum check)
    if (
      !studentName || !gender 

    ) {
      return NextResponse.json({ error: "Required Fields Missing" }, { status: 400 });
    }

    // Optional: Prevent duplicate admission
    const exists = await StudentAdmission.findOne({
      studentName,
      phoneNumber,
      email,
      admissionDate,
    });

    if (exists) {
      return NextResponse.json({ error: "This Student Admission Already Exists" }, { status: 400 });
    }

    // Generate unique admission ID
    const count = await StudentAdmission.countDocuments();
    const nextId = `STD-${String(count + 1).padStart(4, "0")}`;

    const newAdmission = new StudentAdmission({
      studentadmissionId: nextId,
      studentName,
      gender,
      dateofBirth,
      category,
      religion,
      session,
      className,
      caste,
      phoneNumber,
      email,
      admissionDate,
      studentAttachment,
      bloodGroup,
      genotype,
      studenthouse,
      height,
      weight,
      measurementDate,
      medicalHistory,
      address,
      siblingClass,
      siblingSession,
      siblingName,
      routeName,
      pickuppoint,
      feesMonth,
      hostelName,
      roomName,
      feeDetails,
      feeDiscountDetail,
      fatherName,
      fatherPhone,
      fatherOccupation,
      fatherAttachment,
      motherName,
      motherPhone,
      motherOccupation,
      motherAttachment,
      guardianIs,
      guardianName,
      guardianRelation,
      guardianEmail,
      guardianPhone,
      guardianOccupation,
      guardianAddress,
      guardianAttachment,
      guardianSameAsCurrent,
      permanentSameAsCurrent,
      permanentAddress,
      accountNumber,
      bankName,
      sortCode,
      nin,
      previousSchoolDetails,
      note,
      title1,
      title1Attachment,
      title2,
      title2Attachment,
      title3,
      title3Attachment,
      title4,
      title4Attachment,
    });

    await newAdmission.save();

    return NextResponse.json(
      { message: "Student Admission Created", data: newAdmission },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/studentadmission error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create Admission" }, { status: 500 });
  }
}
