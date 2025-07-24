import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import StudentCategory from "@/lib/models/StudentCategory";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const query: any = {};

    if (search) {
      query.$or = [
        { categoryId: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const total = await StudentCategory.countDocuments(query);
    const data = await StudentCategory.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);


    return NextResponse.json({ data, total }, { status: 200 });
  } catch (err) {
    console.error("GET /api/studentcategory error:", err);
    return NextResponse.json({ error: "Failed to fetch Student Category" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { category, description } = body;

    if (!category || !description) {
      return NextResponse.json({ error: "All fields Required" }, { status: 400 });
    }

    const exists = await StudentCategory.findOne({ category, description });
    if (exists) {
      return NextResponse.json({ error: "This Student Category Already Exists" }, { status: 400 });
    }

    const count = await StudentCategory.countDocuments();
    const nextId = `SCG-${String(count + 1).padStart(4, "0")}`; 

    const newCategory = new StudentCategory({
      category,
      description,
      categoryId: nextId,
    });

    await newCategory.save();

    return NextResponse.json({ message: "Student Category Created", data: newCategory }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/studentcategory error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}