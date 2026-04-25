import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";
import { verifyAuth, unauthorized } from "@/lib/auth";

/* eslint-disable @typescript-eslint/no-explicit-any */
const _S = SiteSettings as any;

export async function GET() {
  await dbConnect();
  let doc = await _S.findOne().lean();
  if (!doc) doc = await _S.create({});
  return NextResponse.json(doc);
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) return unauthorized();
  await dbConnect();
  const body = await request.json();
  const doc = await _S.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  return NextResponse.json(doc);
}
