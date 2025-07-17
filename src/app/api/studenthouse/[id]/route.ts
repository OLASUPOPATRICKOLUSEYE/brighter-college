import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getById, updateItem, deleteItem } from "@/lib/actions";
import { studentHouseSchema } from "@/lib/validation/validationSchemas";
import StudentHouse from "@/lib/models/StudentHouse";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(StudentHouse, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = studentHouseSchema.parse(body);
    const updated = await updateItem(StudentHouse, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(StudentHouse, params.id);
  return NextResponse.json(deleted);
}
