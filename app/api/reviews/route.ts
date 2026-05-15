import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Review from "@/lib/models/Review";
import { verifyAuth, unauthorized } from "@/lib/auth";

const getCachedReviews = unstable_cache(
  async () => {
    await dbConnect();
    const reviews = await Review.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(reviews));
  },
  ["reviews-api"],
  { tags: ["reviews"], revalidate: 3600 },
);

export async function GET() {
  const reviews = await getCachedReviews();
  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const review = await Review.create(body);
  revalidateTag("reviews", "max");
  return NextResponse.json(review, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const { _id, ...data } = body;
  const review = await Review.findByIdAndUpdate(_id, data, { new: true } as any);
  revalidateTag("reviews", "max");
  return NextResponse.json(review);
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await (Review as any).findByIdAndDelete(id);
  revalidateTag("reviews", "max");
  return NextResponse.json({ success: true });
}
