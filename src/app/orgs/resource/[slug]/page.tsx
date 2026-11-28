import { notFound } from "next/navigation";

import { RESOURCE_PAGES } from "@/components/sites/kuaijing/app/data";
import { ResourceShell } from "@/components/sites/kuaijing/app/ResourceShell";
import { ResourcePageRenderer } from "@/components/sites/kuaijing/resource/ResourcePages";

export function generateStaticParams() {
  return RESOURCE_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = RESOURCE_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();
  return (
    <ResourceShell page={page}>
      <ResourcePageRenderer slug={slug} />
    </ResourceShell>
  );
}
