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
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;


    let query: any = {};

    if (search) {
      query.$or = [
        { bloodGroupId: { $regex: search, $options: "i" } },
        { BloodGroup: { $regex: search, $options: "i" } },
      ];
    }


    const total = await BloodGroup.countDocuments(query);
    const results = await BloodGroup.find(query)
    .sort({ [sortBy]: sortOrder })
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

    const { bloodGroup, description } = body;

    if (!bloodGroup || !description) {
      return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
    }

    const exists = await BloodGroup.findOne({ bloodGroup, description });
    if (exists) {
      return NextResponse.json({ error: "This Blood Group Already Exists" }, { status: 400 });
    }

    const count = await BloodGroup.countDocuments();
    const nextId = `BLG-${String(count + 1).padStart(4, "0")}`;

    const newBloodGroup = new BloodGroup({
      bloodGroup,
      description,
      bloodGroupId: nextId,
    });

    await newBloodGroup.save();

    return NextResponse.json({ message: "Blood Group Created", data: newBloodGroup }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/bloodgroup error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
