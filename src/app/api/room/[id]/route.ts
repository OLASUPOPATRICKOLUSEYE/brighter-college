import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { roomSchema } from "@/lib/validation/validationSchemas";
import { getById, updateItem, deleteItem } from "@/lib/actions";
import Room from "@/lib/models/Rooms";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(Room, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = roomSchema.parse(body);
    const updated = await updateItem(Room, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(Room, params.id);
  return NextResponse.json(deleted);
}
