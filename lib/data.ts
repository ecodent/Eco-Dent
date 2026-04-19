import dbConnect from "./mongodb";
import TeamMember from "./models/TeamMember";
import Service from "./models/Service";
import Review from "./models/Review";
import BeforeAfterCase from "./models/BeforeAfterCase";
import HeroImage from "./models/HeroImage";

export async function getTeamMembers() {
  await dbConnect();
  const docs = await TeamMember.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getServices() {
  await dbConnect();
  const docs = await Service.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getServiceBySlug(slug: string) {
  await dbConnect();
  const doc = await Service.findOne({ slug }).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getReviews() {
  await dbConnect();
  const docs = await Review.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getBeforeAfterCases() {
  await dbConnect();
  const docs = await BeforeAfterCase.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getHeroImages() {
  await dbConnect();
  const docs = await HeroImage.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}
