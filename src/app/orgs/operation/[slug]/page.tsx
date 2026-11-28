import { notFound } from "next/navigation";

import { OPERATION_PAGES } from "@/components/sites/kuaijing/app/data";
import { OperationShell } from "@/components/sites/kuaijing/app/OperationShell";
import { OperationPageRenderer } from "@/components/sites/kuaijing/operation/OperationPages";

export function generateStaticParams() {
  return OPERATION_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function OperationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = OPERATION_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <OperationShell page={page}>
      <OperationPageRenderer slug={slug} />
    </OperationShell>
  );
}
