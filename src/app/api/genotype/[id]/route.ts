import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Genotype from "@/lib/models/Genotype";
import { genotypeSchema } from "@/lib/validation/validationSchemas";
import { getById, updateItem, deleteItem } from "@/lib/actions";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(Genotype, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = genotypeSchema.parse(body);
    const updated = await updateItem(Genotype, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(Genotype, params.id);
  return NextResponse.json(deleted);
}
