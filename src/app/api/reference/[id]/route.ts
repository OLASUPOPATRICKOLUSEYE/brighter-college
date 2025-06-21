import { NextResponse } from "next/server";
import Reference from "@/lib/models/Reference";
import { connectDB } from "@/lib/mongodb";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { z } from "zod";

// Validation schema for Reference
const referenceSchema = z.object({
  reference: z.string().min(3, "Reference is required"),
  description: z.string().optional(),
});

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(Reference, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = referenceSchema.parse(body);
    const updated = await updateItem(Reference, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(Reference, params.id);
  return NextResponse.json(deleted);
}
