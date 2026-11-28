import { notFound } from "next/navigation";

import { CustomerShell } from "@/components/sites/kuaijing/app/CustomerShell";
import { CUSTOMER_PAGES } from "@/components/sites/kuaijing/app/data";
import { CustomerPageRenderer } from "@/components/sites/kuaijing/customer/CustomerPages";

export function generateStaticParams() {
  return CUSTOMER_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function CustomerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = CUSTOMER_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();
  return (
    <CustomerShell page={page}>
      <CustomerPageRenderer slug={slug} />
    </CustomerShell>
  );
}
