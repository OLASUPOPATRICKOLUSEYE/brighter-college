import { NextResponse } from "next/server";
import Source from "@/lib/models/Source";
import { connectDB } from "@/lib/mongodb";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { z } from "zod";

// Validation schema for Source
const sourceSchema = z.object({
  source: z.string().min(3, "Source is required"),
  description: z.string().optional(),
});

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(Source, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = sourceSchema.parse(body);
    const updated = await updateItem(Source, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(Source, params.id);
  return NextResponse.json(deleted);
}
