import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Room from "@/lib/models/Rooms";

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
        { roomId: { $regex: search, $options: "i" } },
        { roomName: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Room.countDocuments(query);
    const results = await Room.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);


    return NextResponse.json({ data: results, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/room error:", error);
    return NextResponse.json({ error: "Failed to fetch Room" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { roomName, description } = body;

    if (!roomName || !description) {
      return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
    }

    const exists = await Room.findOne({ roomName, description });
    if (exists) {
      return NextResponse.json({ error: "This Room Already Exists" }, { status: 400 });
    }

    const count = await Room.countDocuments();
    const nextId = `RM-${String(count + 1).padStart(4, "0")}`;

    const newRoom = new Room({
      roomName,
      description,
      roomId: nextId,
    });

    await newRoom.save();

    return NextResponse.json({ message: "Room Created", data: newRoom }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/room error:", error);
    return NextResponse.json({ error: error.message || "Failed to Create" }, { status: 500 });
  }
}
