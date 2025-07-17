import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import BloodGroup from "@/lib/models/BloodGroup";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    let query: any = {};

    if (startsWith) {
      query.bloodGroup = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.bloodGroup = { $regex: search, $options: "i" };
    }

    const total = await BloodGroup.countDocuments(query);
    const results = await BloodGroup.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: results, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/bloodgroup error:", error);
    return NextResponse.json({ error: "Failed to fetch Blood Group" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.bloodGroup || body.bloodGroup.trim().length < 2) {
      return NextResponse.json(
        { error: "Blood group is required" },
        { status: 400 }
      );
    }

    const newBloodGroup = await BloodGroup.create({
      bloodGroup: body.bloodGroup.trim(),
    });

    return NextResponse.json(
      { message: "Blood Group created successfully", data: newBloodGroup },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/bloodgroup error:", error);
    return NextResponse.json({ error: "Failed to create Blood Group" }, { status: 500 });
  }
}
