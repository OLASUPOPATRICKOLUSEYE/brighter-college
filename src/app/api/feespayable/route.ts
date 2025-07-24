import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FeesPayable from "@/lib/models/FeesPayable";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    let query: any = {};

    if (search) {
      query.$or = [
        { feesId: { $regex: search, $options: "i" } },
        { feeName: { $regex: search, $options: "i" } },
        { monthly: { $regex: search, $options: "i" } },
      ];
    }

    const total = await FeesPayable.countDocuments(query);
    const results = await FeesPayable.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: results, total }, { status: 200 });

  } catch (error) {
    console.error("GET /api/feespayable error:", error);
    return NextResponse.json({ error: "Failed To Fetch FeesPayable" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { feeName, description, monthly } = body;

      if (!feeName || !description || typeof monthly !== "boolean") {
        return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
      }

    const exists = await FeesPayable.findOne({ feeName, description, monthly });
    if (exists) {
      return NextResponse.json({ error: "This FeesPayable Already Exists" }, { status: 400 });
    }

    const count = await FeesPayable.countDocuments();
    const nextId = `FP-${String(count + 1).padStart(4, "0")}`;

    const newFees = new FeesPayable({
      feeName,
      description,
      monthly,
      feesId: nextId,
    });

    await newFees.save();

    return NextResponse.json({ message: "FeesPayable Created", data: newFees }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/feespayable error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
