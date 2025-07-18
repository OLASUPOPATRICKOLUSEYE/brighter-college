import { NextResponse } from "next/server";
import UserGeneralComplaint from "@/lib/models/UserGeneralComplaint"; // ✅ Update model
import { connectDB } from "@/lib/mongodb";
import { getById, updateItem, deleteItem } from "@/lib/actions";
import { userGeneralComplaintSchema } from "@/lib/validation/validationSchemas"; // ✅ Update schema

// ✅ GET: Fetch a single general complaint by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await getById(UserGeneralComplaint, params.id);
  return NextResponse.json(item);
}

// ✅ PUT: Update a specific general complaint by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const validated = userGeneralComplaintSchema.parse(body); // ✅ Validate input
    const updated = await updateItem(UserGeneralComplaint, params.id, validated);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// ✅ DELETE: Delete a specific general complaint by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await deleteItem(UserGeneralComplaint, params.id);
  return NextResponse.json(deleted);
}
