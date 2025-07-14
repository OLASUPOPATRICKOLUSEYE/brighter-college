import { NextResponse } from "next/server";
import AdmissionEnquiry from "@/lib/models/AdmissionEnquiry";
import { connectDB } from "@/lib/mongodb";
import { getById, updateItem, deleteItem } from "@/lib/actions";
import { admissionEnquirySchema } from "@/lib/validation/validationSchemas";

// ✅ GET: Fetch a single admission enquiry by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(AdmissionEnquiry, params.id);
  return NextResponse.json(item);
}

// ✅ PUT: Update a specific admission enquiry by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = admissionEnquirySchema.parse(body);
    const updated = await updateItem(AdmissionEnquiry, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// ✅ DELETE: Delete a specific admission enquiry by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(AdmissionEnquiry, params.id);
  return NextResponse.json(deleted);
}
