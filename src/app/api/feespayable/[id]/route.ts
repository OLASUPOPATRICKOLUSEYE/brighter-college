import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getById, updateItem, deleteItem } from "@/lib/actions";
import { feesPayableSchema } from "@/lib/validation/validationSchemas";
import FeesPayable from "@/lib/models/FeesPayable";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(FeesPayable, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = feesPayableSchema.parse(body);
    const updated = await updateItem(FeesPayable, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(FeesPayable, params.id);
  return NextResponse.json(deleted);
}
