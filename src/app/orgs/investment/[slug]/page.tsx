import { notFound } from "next/navigation";
import { INVEST_PAGES } from "@/components/sites/kuaijing/app/data";
import { InvestShell } from "@/components/sites/kuaijing/app/InvestShell";
import { InvestPageRenderer } from "@/components/sites/kuaijing/investment/InvestPages";

export function generateStaticParams() {
  return INVEST_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function InvestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = INVEST_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();
  return <InvestShell page={page}><InvestPageRenderer slug={slug} /></InvestShell>;
}
