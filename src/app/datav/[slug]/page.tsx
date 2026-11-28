import { DataVizScreen } from "@/components/sites/kuaijing/datav/DataVizScreen";

export function generateStaticParams() {
  return ["overview", "lease", "merchant", "property"].map((slug) => ({ slug }));
}

export default async function DataVizRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DataVizScreen slug={slug} />;
}
