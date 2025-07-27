import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StudentAdmission from "@/lib/models/StudentAdmission";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  await connectDB();

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: any[] = XLSX.utils.sheet_to_json(worksheet);

  const inserted: any[] = [];

  for (let row of data) {
    // Optional: Check for duplicates
    const exists = await StudentAdmission.findOne({
      studentName: row.studentName,
      phoneNumber: row.phoneNumber,
      email: row.email,
      admissionDate: row.admissionDate,
    });

    if (!exists) {
      const count = await StudentAdmission.countDocuments();
      row.studentadmissionId = `STD-${String(count + 1).padStart(4, "0")}`;

      const student = new StudentAdmission(row);
      await student.save();
      inserted.push(student);
    }
  }

  return NextResponse.json({ message: "Excel uploaded", total: inserted.length }, { status: 201 });
}
