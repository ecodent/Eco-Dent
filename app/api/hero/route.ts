import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HeroImage from "@/lib/models/HeroImage";
import { verifyAuth, unauthorized } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const images = await HeroImage.find().sort({ order: 1 });
  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const image = await HeroImage.create(body);
  return NextResponse.json(image, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await HeroImage.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
