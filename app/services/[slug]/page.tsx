import { getServiceBySlug, getServices } from "@/lib/data";
import ServicePageLayout from "../ServicePageLayout";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const services = await getServices();
    return services.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let service;
  try {
    service = await getServiceBySlug(slug);
  } catch {
    service = null;
  }

  if (!service) {
    notFound();
  }

  return (
    <ServicePageLayout
      title={service.title}
      subtitle={service.subtitle}
      description={service.description}
      image={service.image}
      imagePosition={service.imagePosition}
      features={service.features}
      benefits={service.benefits || []}
    />
  );
}
