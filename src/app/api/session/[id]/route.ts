import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Session from "@/lib/models/Session";
import { sessionSchema } from "@/lib/validation/validationSchemas";
import { getById, updateItem, deleteItem } from "@/lib/actions";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(Session, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = sessionSchema.parse(body);
    const updated = await updateItem(Session, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(Session, params.id);
  return NextResponse.json(deleted);
}
