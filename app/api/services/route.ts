import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { verifyAuth, unauthorized } from "@/lib/auth";

const getCachedServices = unstable_cache(
  async (navbar: boolean) => {
    await dbConnect();
    const filter = navbar ? { showInNavbar: true } : {};
    const services = await (Service as any).find(filter).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(services));
  },
  ["services-api"],
  { tags: ["services"], revalidate: 3600 },
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const navbar = searchParams.get("navbar") === "true";
  const services = await getCachedServices(navbar);
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const service = await Service.create(body);
  revalidateTag("services", "max");
  return NextResponse.json(service, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const { _id, ...data } = body;
  const service = await Service.findByIdAndUpdate(_id, data, { new: true } as any);
  revalidateTag("services", "max");
  return NextResponse.json(service);
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await (Service as any).findByIdAndDelete(id);
  revalidateTag("services", "max");
  return NextResponse.json({ success: true });
}
