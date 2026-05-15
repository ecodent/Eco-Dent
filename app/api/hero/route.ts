import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import dbConnect from "@/lib/mongodb";
import HeroImage from "@/lib/models/HeroImage";
import { verifyAuth, unauthorized } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const images = await HeroImage.find().sort({ order: 1 }).lean();
    return NextResponse.json(images, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("GET /api/hero error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const image = await HeroImage.create(body);
  revalidateTag("hero", "max");
  return NextResponse.json(image, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await (HeroImage as any).findByIdAndDelete(id);
  revalidateTag("hero", "max");
  return NextResponse.json({ success: true });
}
