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

    let query: any = {};

    if (startsWith) {
      query.source = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.source = { $regex: search, $options: "i" };
    }

    const total = await Source.countDocuments(query);
    const sources = await Source.find(query)
      .sort({ createdAt: -1 })
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

    if (!body.source || body.source.trim() === "") {
      return NextResponse.json({ error: "Source is required" }, { status: 400 });
    }

    const newSource = await Source.create({
      source: body.source,
      description: body.description || "",
    });

    return NextResponse.json(
      { message: "Source created successfully", data: newSource },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/source error:", error);
    return NextResponse.json({ error: "Failed to create source" }, { status: 500 });
  }
}
