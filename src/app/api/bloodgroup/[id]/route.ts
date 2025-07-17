import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BloodGroup from "@/lib/models/BloodGroup";
import { bloodGroupSchema } from "@/lib/validation/validationSchemas";
import { getById, updateItem, deleteItem } from "@/lib/actions";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(BloodGroup, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = bloodGroupSchema.parse(body);
    const updated = await updateItem(BloodGroup, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(BloodGroup, params.id);
  return NextResponse.json(deleted);
}
