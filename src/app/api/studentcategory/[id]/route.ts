import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getById, updateItem, deleteItem } from "@/lib/actions";
import { studentCategorySchema } from "@/lib/validation/validationSchemas";
import StudentCategory from "@/lib/models/StudentCategory";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(StudentCategory, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = studentCategorySchema.parse(body);
    const updated = await updateItem(StudentCategory, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(StudentCategory, params.id);
  return NextResponse.json(deleted);
}
