import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongodb";
import { userLoginSchema } from "@/lib/validation/validationSchemas";
import { ITEM_PER_PAGE } from "@/lib/settings";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const query = search
      ? { email: { $regex: search, $options: "i" } }
      : {};

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: users, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const validated = userLoginSchema.parse(body);

    const existingUser = await User.findOne({ email: validated.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email." },
        { status: 409 }
      );
    }

    const newUser = await User.create(validated);

    return NextResponse.json(
      { message: "User created successfully", data: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
