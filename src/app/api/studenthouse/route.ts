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

    const query: any = {};
    if (search) {
      query.studenthouse = { $regex: search, $options: "i" };
    }

    const total = await StudentHouse.countDocuments(query);
    const data = await StudentHouse.find(query)
      .sort({ createdAt: -1 })
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

    if (!body.studenthouse || !body.houseId) {
      return NextResponse.json({ error: "Student house and house ID are required" }, { status: 400 });
    }

    const newEntry = await StudentHouse.create({
      studenthouse: body.studenthouse,
      description: body.description,
      houseId: body.houseId,
    });

    return NextResponse.json({ message: "Student house created", data: newEntry }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/studenthouse error:", error);
    return NextResponse.json({ error: error.message || "Failed to create" }, { status: 500 });
  }
}
