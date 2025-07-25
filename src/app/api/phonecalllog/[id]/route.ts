import { NextResponse } from "next/server";
import PhoneCallLog from "@/lib/models/PhoneCallLog";
import { connectDB } from "@/lib/mongodb";
import { updateItem, getById, deleteItem } from "@/lib/actions";
import { phoneCallLogSchema } from "@/lib/validation/validationSchemas";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(PhoneCallLog, params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = phoneCallLogSchema.parse(body);
    validated.date = new Date(validated.date);
    validated.nextfollowupdate = new Date(validated.nextfollowupdate);

    const updated = await updateItem(PhoneCallLog, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(PhoneCallLog, params.id);
  return NextResponse.json(deleted);
}
