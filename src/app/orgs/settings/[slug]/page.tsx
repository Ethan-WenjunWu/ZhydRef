import { notFound } from "next/navigation";

import { SETTINGS_PAGES } from "@/components/sites/kuaijing/app/data";
import { SettingsPageRenderer } from "@/components/sites/kuaijing/app/SettingsPages";
import { SettingsShell } from "@/components/sites/kuaijing/app/SettingsShell";

export function generateStaticParams() {
  return SETTINGS_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = SETTINGS_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <SettingsShell page={page}>
      <SettingsPageRenderer slug={slug} />
    </SettingsShell>
  );
}
