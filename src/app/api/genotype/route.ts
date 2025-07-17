import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Genotype from "@/lib/models/Genotype";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    let query: any = {};
    if (startsWith) {
      query.genotype = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.genotype = { $regex: search, $options: "i" };
    }

    const total = await Genotype.countDocuments(query);
    const results = await Genotype.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: results, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/genotype error:", error);
    return NextResponse.json({ error: "Failed to fetch Genotype" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.genotype || body.genotype.trim().length < 2) {
      return NextResponse.json(
        { error: "Genotype is required and must be at least 2 characters" },
        { status: 400 }
      );
    }

    const newGenotype = await Genotype.create({
      genotype: body.genotype.trim(),
      description: body.description || "",
    });

    return NextResponse.json(
      { message: "Genotype created successfully", data: newGenotype },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/genotype error:", error);
    return NextResponse.json({ error: "Failed to create Genotype" }, { status: 500 });
  }
}
