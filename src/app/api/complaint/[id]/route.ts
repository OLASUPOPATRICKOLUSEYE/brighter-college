import { NextResponse } from "next/server";
import Complaint from "@/lib/models/Complaint";
import { connectDB } from "@/lib/mongodb";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { complaintSchema } from "@/lib/validation/validationSchemas";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(Complaint, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = complaintSchema.parse(body);
    const updated = await updateItem(Complaint, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(Complaint, params.id);
  return NextResponse.json(deleted);
}
