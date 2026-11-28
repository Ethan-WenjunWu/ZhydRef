import { notFound } from "next/navigation";

import { ASSET_PAGES } from "@/components/sites/kuaijing/app/data";
import { AssetShell } from "@/components/sites/kuaijing/app/AssetShell";
import { AssetPageRenderer } from "@/components/sites/kuaijing/asset/AssetPages";

export function generateStaticParams() {
  return ASSET_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function AssetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = ASSET_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <AssetShell page={page}>
      <AssetPageRenderer slug={slug} />
    </AssetShell>
  );
}
