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

    const query: any = {};
    if (search) {
      query.category = { $regex: search, $options: "i" };
    }

    const total = await StudentCategory.countDocuments(query);
    const data = await StudentCategory.find(query)
      .sort({ createdAt: -1 })
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

    if (!body.category || !body.categoryId) {
      return NextResponse.json({ error: "Student Category and Category ID are required" }, { status: 400 });
    }

    const newEntry = await StudentCategory.create({
      category: body.category,
      description: body.description,
      categoryId: body.categoryId,
    });

    return NextResponse.json({ message: "Student Category created", data: newEntry }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/studentcategory error:", error);
    return NextResponse.json({ error: error.message || "Failed to create" }, { status: 500 });
  }
}
