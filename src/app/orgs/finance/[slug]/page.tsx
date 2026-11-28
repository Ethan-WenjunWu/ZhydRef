import { notFound } from "next/navigation";

import { FINANCE_PAGES } from "@/components/sites/kuaijing/app/data";
import { FinanceShell } from "@/components/sites/kuaijing/app/FinanceShell";
import { FinancePageRenderer } from "@/components/sites/kuaijing/finance/FinancePages";

export function generateStaticParams() {
  return FINANCE_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function FinancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = FINANCE_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();
  return (
    <FinanceShell page={page}>
      <FinancePageRenderer slug={slug} />
    </FinanceShell>
  );
}
