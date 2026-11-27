import { notFound } from "next/navigation";

import { OFFICE_PAGES } from "@/components/sites/kuaijing/app/data";
import { OfficePageRenderer } from "@/components/sites/kuaijing/office/OfficePages";
import { OfficeShell } from "@/components/sites/kuaijing/app/OfficeShell";

export function generateStaticParams() {
  return OFFICE_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function OfficePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = OFFICE_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <OfficeShell page={page}>
      <OfficePageRenderer slug={slug} />
    </OfficeShell>
  );
}
