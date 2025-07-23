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
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;


    let query: any = {};
    if (startsWith) {
      query.genotype = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.genotype = { $regex: search, $options: "i" };
    }

    const total = await Genotype.countDocuments(query);
    const results = await Genotype.find(query)
    .sort({ [sortBy]: sortOrder })
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

    const { genotype, description } = body;

    if (!genotype || !description) {
      return NextResponse.json({ error: "All Field Required" }, { status: 400 });
    }

    const exists = await Genotype.findOne({ genotype, description });
    if (exists) {
      return NextResponse.json({ error: "This Genotype Already Exists" }, { status: 400 });
    }

    const count = await Genotype.countDocuments();
    const nextId = `GNT-${String(count + 1).padStart(4, "0")}`;

    const newGenotype = new Genotype({
      genotype,
      description,
      genotypeId: nextId,
    });

    await newGenotype.save();

    return NextResponse.json({ message: "Genotype Created", data: newGenotype }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/genotype error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}

