import dbConnect from "./mongodb";
import TeamMember from "./models/TeamMember";
import Service from "./models/Service";
import Review from "./models/Review";
import BeforeAfterCase from "./models/BeforeAfterCase";
import HeroImage from "./models/HeroImage";

/* eslint-disable @typescript-eslint/no-explicit-any */
const _Team = TeamMember as any;
const _Service = Service as any;
const _Review = Review as any;
const _BA = BeforeAfterCase as any;
const _Hero = HeroImage as any;

export async function getTeamMembers() {
  await dbConnect();
  const docs = await _Team.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getServices() {
  await dbConnect();
  const docs = await _Service.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getServiceBySlug(slug: string) {
  await dbConnect();
  const doc = await _Service.findOne({ slug }).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getReviews() {
  await dbConnect();
  const docs = await _Review.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getBeforeAfterCases() {
  await dbConnect();
  const docs = await _BA.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getHeroImages() {
  await dbConnect();
  const docs = await _Hero.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}
