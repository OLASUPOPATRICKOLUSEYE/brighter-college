import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { disableReasonSchema } from "@/lib/validation/validationSchemas";
import DisableReason from "@/lib/models/DisableReason";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(DisableReason, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = disableReasonSchema.parse(body); 
    const updated = await updateItem(DisableReason, params.id, validated); 
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(DisableReason, params.id);
  return NextResponse.json(deleted);
}
