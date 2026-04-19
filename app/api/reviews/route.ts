import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Review from "@/lib/models/Review";
import { verifyAuth, unauthorized } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const reviews = await Review.find().sort({ order: 1 });
  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const review = await Review.create(body);
  return NextResponse.json(review, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const { _id, ...data } = body;
  const review = await Review.findByIdAndUpdate(_id, data, { new: true } as any);
  return NextResponse.json(review);
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await (Review as any).findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
