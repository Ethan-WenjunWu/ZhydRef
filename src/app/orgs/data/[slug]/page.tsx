import { notFound } from "next/navigation";

import { DATA_PAGES } from "@/components/sites/kuaijing/app/data";
import { DataShell } from "@/components/sites/kuaijing/app/DataShell";
import { DataPageRenderer } from "@/components/sites/kuaijing/data/DataPages";

export function generateStaticParams() {
  return DATA_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function DataPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = DATA_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <DataShell page={page}>
      <DataPageRenderer slug={slug} />
    </DataShell>
  );
}
