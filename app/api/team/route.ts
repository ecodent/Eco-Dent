import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/lib/models/TeamMember";
import { verifyAuth, unauthorized } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const members = await TeamMember.find().sort({ order: 1 });
  return NextResponse.json(members);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const member = await TeamMember.create(body);
  return NextResponse.json(member, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const { _id, ...data } = body;
  const member = await TeamMember.findByIdAndUpdate(_id, data, { new: true } as any);
  return NextResponse.json(member);
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await (TeamMember as any).findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
