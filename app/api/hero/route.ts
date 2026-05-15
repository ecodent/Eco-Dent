import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import HeroImage from "@/lib/models/HeroImage";
import { verifyAuth, unauthorized } from "@/lib/auth";

const getCachedHero = unstable_cache(
  async () => {
    await dbConnect();
    const images = await HeroImage.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(images));
  },
  ["hero-api"],
  { tags: ["hero"], revalidate: 3600 },
);

export async function GET() {
  const images = await getCachedHero();
  return NextResponse.json(images);
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
