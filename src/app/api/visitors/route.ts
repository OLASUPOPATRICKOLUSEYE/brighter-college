import { NextResponse } from "next/server";
import Visitor from "@/lib/models/Visitor";
import { connectDB } from "@/lib/mongodb";
import { getAll, createItem } from "@/lib/actions";
import { visitorSchema } from "@/lib/validation/validationSchemas";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const data = await getAll(Visitor, {}, { search, page, limit });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = visitorSchema.parse(body);

    await connectDB();
    const newVisitor = await createItem(Visitor, validated);
    return NextResponse.json(newVisitor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
