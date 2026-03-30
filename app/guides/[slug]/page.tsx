import Link from "next/link";
import { document } from "#contentrain";
import { DashboardShell } from "../../dashboard-shell";
import { RenderContent } from "../../render-content";

export function generateStaticParams() {
  return document("guide-page").all().map((page) => ({ slug: page.slug }));
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = document("guide-page").bySlug(slug);

  if (!page) {
    return null;
  }

  return (
    <DashboardShell activePath="/docs" kicker="Guide" title={page.title} description={page.description ?? ""}>
      <article className="surface markdown-card">
        <Link href="/docs" className="text-link page-backlink">
          Back to docs hub
        </Link>
        <RenderContent markdown={page.content} />
      </article>
    </DashboardShell>
  );
}
