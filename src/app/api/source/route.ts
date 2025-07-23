import { NextResponse } from "next/server";
import Source from "@/lib/models/Source";
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

    if (startsWith) {
      query.source = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.source = { $regex: search, $options: "i" };
    }

    const total = await Source.countDocuments(query);
    const sources = await Source.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);


    return NextResponse.json({ data: sources, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/source error:", error);
    return NextResponse.json({ error: "Failed to fetch sources" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { source, description } = body;

    if (!source || !description) {
      return NextResponse.json({ error: "All Field Required" }, { status: 400 });
    }

    const exists = await Source.findOne({ source, description });
    if (exists) {
      return NextResponse.json({ error: "This Source Already Exists" }, { status: 400 });
    }

    const count = await Source.countDocuments();
    const nextId = `SRC-${String(count + 1).padStart(4, "0")}`;

    const newSource = new Source({
      source,
      description,
      sourceId: nextId,
    });

    await newSource.save();

    return NextResponse.json({ message: "Source Created", data: newSource }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/source error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
