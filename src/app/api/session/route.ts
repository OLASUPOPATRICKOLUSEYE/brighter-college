import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Session from "@/lib/models/Session";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    let query: any = {};

    if (startsWith) {
      query.session = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.session = { $regex: search, $options: "i" };
    }

    const total = await Session.countDocuments(query);
    const results = await Session.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data: results, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/session error:", error);
    return NextResponse.json({ error: "Failed to fetch Session" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.session || body.session.trim().length < 9) {
      return NextResponse.json(
        { error: "Session is required and must be in the format e.g., 2012/2013" },
        { status: 400 }
      );
    }

    const newSession = await Session.create({
      session: body.session.trim(),
    });

    return NextResponse.json(
      { message: "Session created successfully", data: newSession },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/session error:", error);
    return NextResponse.json({ error: "Failed to create Session" }, { status: 500 });
  }
}
