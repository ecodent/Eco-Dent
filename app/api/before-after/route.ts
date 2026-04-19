import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BeforeAfterCase from "@/lib/models/BeforeAfterCase";
import { verifyAuth, unauthorized } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const cases = await BeforeAfterCase.find().sort({ order: 1 });
  return NextResponse.json(cases);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const item = await BeforeAfterCase.create(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const { _id, ...data } = body;
  const item = await BeforeAfterCase.findByIdAndUpdate(_id, data, { new: true } as any);
  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await (BeforeAfterCase as any).findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
