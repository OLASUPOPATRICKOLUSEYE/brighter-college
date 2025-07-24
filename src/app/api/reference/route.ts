import { NextResponse } from "next/server";
import Reference from "@/lib/models/Reference";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";

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
        { referenceId: { $regex: search, $options: "i" } },
        { reference: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Reference.countDocuments(query);
    const references = await Reference.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: references, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/reference error:", error);
    return NextResponse.json({ error: "Failed to fetch references" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { reference, description } = body;

    if (!reference || !description) {
      return NextResponse.json({ error: "All field are required" }, { status: 400 });
    }

    const exists = await Reference.findOne({ reference, description });
    if (exists) {
      return NextResponse.json({ error: "This Reference Already Exists" }, { status: 400 });
    }

    const count = await Reference.countDocuments();
    const nextId = `REF-${String(count + 1).padStart(4, "0")}`;

    const newReference = new Reference({
      reference,
      description,
      referenceId: nextId,
    });

    await newReference.save();

    return NextResponse.json({ message: "Reference Created", data: newReference }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/reference error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
