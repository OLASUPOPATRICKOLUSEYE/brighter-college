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
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;


    let query: any = {};

    if (search) {
      query.$or = [
        { sessionId: { $regex: search, $options: "i" } },
        { session: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Session.countDocuments(query);
    const results = await Session.find(query)
    .sort({ [sortBy]: sortOrder })
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

    const { session, description } = body;

    if (!session || !description) {
      return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
    }

    const exists = await Session.findOne({ session, description });
    if (exists) {
      return NextResponse.json({ error: "This Session Already Exists" }, { status: 400 });
    }

    const count = await Session.countDocuments();
    const nextId = `SES-${String(count + 1).padStart(4, "0")}`;

    const newSession = new Session({
      session,
      description,
      sessionId: nextId,
    });

    await newSession.save();

    return NextResponse.json({ message: "Session Created", data: newSession }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/session error:", error);
    return NextResponse.json({ error: error.message || "Failed to create" }, { status: 500 });
  }
}
