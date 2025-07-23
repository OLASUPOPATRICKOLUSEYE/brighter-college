import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import StudentHouse from "@/lib/models/StudentHouse";

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
      query.studenthouse = { $regex: search, $options: "i" };
    }

    const total = await StudentHouse.countDocuments(query);
    const data = await StudentHouse.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);


    return NextResponse.json({ data, total }, { status: 200 });
  } catch (err) {
    console.error("GET /api/studenthouse error:", err);
    return NextResponse.json({ error: "Failed to fetch student houses" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { studenthouse, description } = body;

    if (!studenthouse || !description) {
      return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
    }

    const exists = await StudentHouse.findOne({ studenthouse, description });
    if (exists) {
      return NextResponse.json({ error: "This Student House Already Exists" }, { status: 400 });
    }

    const count = await StudentHouse.countDocuments();
    const nextId = `SHS-${String(count + 1).padStart(4, "0")}`;

    const newStudentHouse = new StudentHouse({
      studenthouse,
      description,
      houseId: nextId,
    });

    await newStudentHouse.save();

    return NextResponse.json({ message: "Student House Created", data: newStudentHouse }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/studenthouse error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
