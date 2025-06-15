import { NextResponse } from "next/server";
import Visitor from "@/lib/models/Visitor";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { visitorSchema } from "@/lib/validation/validationSchemas";



export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await getById(Visitor, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validated = visitorSchema.parse(body);

    const updated = await updateItem(Visitor, params.id, validated);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const deleted = await deleteItem(Visitor, params.id);
  return NextResponse.json(deleted);
}
