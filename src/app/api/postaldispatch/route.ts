import { NextResponse } from "next/server";
import PostalDispatch from "@/lib/models/PostalDispatch";
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
      query.toTitle = { $regex: `^${startsWith}`, $options: "i" };
    } else if (search) {
      query.toTitle = { $regex: search, $options: "i" };
    }

    const total = await PostalDispatch.countDocuments(query);
    const dispatches = await PostalDispatch.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE);
    
    return NextResponse.json({ data: dispatches, total }, { status: 200 });
  } catch (error) {
    console.error("GET /api/postaldispatch error:", error);
    return NextResponse.json({ error: "Failed to fetch postal dispatches" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const requiredFields = [
      "toTitle",
      "referenceNo",
      "address",
      "note",
      "fromTitle",
      "date",
      "attachment",
    ];

    for (const field of requiredFields) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        (typeof body[field] === "string" && body[field].trim() === "") ||
        (Array.isArray(body[field]) && body[field].length === 0)
      ) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const newDispatch = await PostalDispatch.create({
      toTitle: body.toTitle,
      referenceNo: body.referenceNo,
      address: body.address,
      note: body.note,
      fromTitle: body.fromTitle,
      date: body.date,
      attachment: body.attachment,
    });

    return NextResponse.json(
      { message: "Postal Dispatch Created Successfully", data: newDispatch },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/postaldispatch error:", error);
    return NextResponse.json({ error: "Failed to Create Postal Dispatch" }, { status: 500 });
  }
}
