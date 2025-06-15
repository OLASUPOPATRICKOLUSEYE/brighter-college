import { NextResponse } from "next/server";
import Purpose from "@/lib/models/Purpose";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { purposeSchema } from "@/lib/validation/validationSchemas";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await getById(Purpose, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validated = purposeSchema.parse(body);
    const updated = await updateItem(Purpose, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const deleted = await deleteItem(Purpose, params.id);
  return NextResponse.json(deleted);
}
