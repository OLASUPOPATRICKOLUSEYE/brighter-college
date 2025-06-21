import { NextResponse } from "next/server";
import ComplaintType from "@/lib/models/ComplaintType";
import { connectDB } from "@/lib/mongodb";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { complaintTypeSchema } from "@/lib/validation/validationSchemas";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(ComplaintType, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = complaintTypeSchema.parse(body);
    const updated = await updateItem(ComplaintType, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(ComplaintType, params.id);
  return NextResponse.json(deleted);
}
