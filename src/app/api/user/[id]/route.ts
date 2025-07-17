import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongodb";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { userLoginSchema } from "@/lib/validation/validationSchemas";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(User, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = userLoginSchema.parse(body);
    const updated = await updateItem(User, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(User, params.id);
  return NextResponse.json(deleted);
}
