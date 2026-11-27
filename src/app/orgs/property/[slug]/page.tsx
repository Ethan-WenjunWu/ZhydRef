import { notFound } from "next/navigation";

import { PROPERTY_PAGES } from "@/components/sites/kuaijing/app/data";
import { PropertyShell } from "@/components/sites/kuaijing/app/PropertyShell";
import { PropertyPageRenderer } from "@/components/sites/kuaijing/property/PropertyPages";

export function generateStaticParams() {
  return PROPERTY_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PROPERTY_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <PropertyShell page={page}>
      <PropertyPageRenderer slug={slug} />
    </PropertyShell>
  );
}
