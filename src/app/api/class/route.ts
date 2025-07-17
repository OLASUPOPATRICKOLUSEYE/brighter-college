import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Class from "@/lib/models/Class";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    let query: any = {};

    if (startsWith) {
      query.clasName = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.clasName = { $regex: search, $options: "i" };
    }

    const total = await Class.countDocuments(query);
    const reasons = await Class.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: reasons, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/class error:", error);
    return NextResponse.json({ error: "Failed to fetch Class" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.className || body.className.trim().length < 2) {
      return NextResponse.json({ error: "Class name is required" }, { status: 400 });
    }

    const newClass = await Class.create({
      className: body.className.trim(),
    });

    return NextResponse.json(
      { message: "Class created successfully", data: newClass },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/class error:", error);
    return NextResponse.json({ error: "Failed to create Class" }, { status: 500 });
  }
}
