import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TransportRoute from "@/lib/models/TransportRoute";

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
        { routeId: { $regex: search, $options: "i" } },
        { routeName: { $regex: search, $options: "i" } },
      ];
    }

    const total = await TransportRoute.countDocuments(query);
    const data = await TransportRoute.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    return NextResponse.json({ data, total }, { status: 200 });
  } catch (err) {
    console.error("GET /api/transportroute error:", err);
    return NextResponse.json({ error: "Failed To Fetch Transport Routes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { routeName, description } = body;

    if (!routeName || !description) {
      return NextResponse.json({ error: "All Fields Required" }, { status: 400 });
    }

    const exists = await TransportRoute.findOne({ routeName, description });
    if (exists) {
      return NextResponse.json({ error: "This Transport Route Already Exists" }, { status: 400 });
    }

    const count = await TransportRoute.countDocuments();
    const nextId = `TR-${String(count + 1).padStart(4, "0")}`;

    const newTransportRoute = new TransportRoute({
      routeName,
      description,
      routeId: nextId,
    });

    await newTransportRoute.save();

    return NextResponse.json({ message: "Transport Route Created", data: newTransportRoute }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/transportroute error:", error);
    return NextResponse.json({ error: error.message || "Failed To Create" }, { status: 500 });
  }
}
