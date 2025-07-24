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
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;


    let query: any = {};

    if (search) {
      query.$or = [
        { classId: { $regex: search, $options: "i" } },
        { className: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Class.countDocuments(query);
    const reasons = await Class.find(query)
    .sort({ [sortBy]: sortOrder })
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

    const { className, description } = body;

    if (!className || !description) {
      return NextResponse.json({ error: "All field required" }, { status: 400 });
    }

    const exists = await Class.findOne({ className, description });
    if (exists) {
      return NextResponse.json({ error: "This Class Already Exists" }, { status: 400 });
    }

    const count = await Class.countDocuments();
    const nextId = `CLS-${String(count + 1).padStart(4, "0")}`;

    const newClass = new Class({
      className,
      description,
      classId: nextId,
    });

    await newClass.save();

    return NextResponse.json({ message: "Class Created", data: newClass }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/class error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
