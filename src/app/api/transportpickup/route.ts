import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TransportPickup from "@/lib/models/TransportPickup";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const query: any = {};

    if (search) {
      query.$or = [
        { pickupId: { $regex: search, $options: "i" } },
        { pickuppoint: { $regex: search, $options: "i" } },
      ];
    }

    const total = await TransportPickup.countDocuments(query);
    const data = await TransportPickup.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data, total }, { status: 200 });
  } catch (err) {
    console.error("GET /api/transportpickup error:", err);
    return NextResponse.json({ error: "Failed To Fetch Transport Pickups" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { pickuppoint, description } = body;

    if (!pickuppoint || !description) {
      return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
    }

    const exists = await TransportPickup.findOne({ pickuppoint, description });
    if (exists) {
      return NextResponse.json({ error: "This Pickup Point Already Exists" }, { status: 400 });
    }

    const count = await TransportPickup.countDocuments();
    const nextId = `TPU-${String(count + 1).padStart(4, "0")}`;

    const newPickup = new TransportPickup({
      pickuppoint,
      description,
      pickupId: nextId,
    });

    await newPickup.save();

    return NextResponse.json({ message: "Pickup Point Created", data: newPickup }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/transportpickup error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
