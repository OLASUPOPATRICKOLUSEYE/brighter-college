import { NextResponse } from "next/server";
import PostalReceive from "@/lib/models/PostalReceive"; // 🔁 Updated model
import { connectDB } from "@/lib/mongodb";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { postalReceiveSchema } from "@/lib/validation/validationSchemas"; // 🔁 Updated schema

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(PostalReceive, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = postalReceiveSchema.parse(body); // 🔁 Validate using correct schema
    const updated = await updateItem(PostalReceive, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(PostalReceive, params.id);
  return NextResponse.json(deleted);
}
