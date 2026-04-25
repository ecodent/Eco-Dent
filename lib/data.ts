import { unstable_cache } from "next/cache";
import dbConnect from "./mongodb";
import TeamMember from "./models/TeamMember";
import Service from "./models/Service";
import Review from "./models/Review";
import BeforeAfterCase from "./models/BeforeAfterCase";
import HeroImage from "./models/HeroImage";
import SiteSettings from "./models/SiteSettings";

/* eslint-disable @typescript-eslint/no-explicit-any */
const _Team = TeamMember as any;
const _Service = Service as any;
const _Review = Review as any;
const _BA = BeforeAfterCase as any;
const _Hero = HeroImage as any;
const _Settings = SiteSettings as any;

const REVALIDATE = 60; // seconds

export const getTeamMembers = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await _Team.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(docs));
  },
  ["team-members"],
  { revalidate: REVALIDATE, tags: ["team"] }
);

export const getServices = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await _Service.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(docs));
  },
  ["services"],
  { revalidate: REVALIDATE, tags: ["services"] }
);

export const getServiceBySlug = async (slug: string) => {
  return unstable_cache(
    async () => {
      await dbConnect();
      const doc = await _Service.findOne({ slug }).lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    },
    [`service-${slug}`],
    { revalidate: REVALIDATE, tags: ["services"] }
  )();
};

export const getReviews = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await _Review.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(docs));
  },
  ["reviews"],
  { revalidate: REVALIDATE, tags: ["reviews"] }
);

export const getBeforeAfterCases = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await _BA.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(docs));
  },
  ["before-after"],
  { revalidate: REVALIDATE, tags: ["before-after"] }
);

export const getHeroImages = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await _Hero.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(docs));
  },
  ["hero-images"],
  { revalidate: REVALIDATE, tags: ["hero"] }
);

export const getSiteSettings = unstable_cache(
  async () => {
    await dbConnect();
    let doc = await _Settings.findOne().lean();
    if (!doc) {
      doc = await _Settings.create({});
    }
    return JSON.parse(JSON.stringify(doc));
  },
  ["site-settings"],
  { revalidate: REVALIDATE, tags: ["settings"] }
);
