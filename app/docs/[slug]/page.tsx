import Link from "next/link";
import { document } from "#contentrain";
import { DashboardShell } from "../../dashboard-shell";
import { RenderContent } from "../../render-content";

export function generateStaticParams() {
  return document("docs-page")
    .all()
    .filter((page) => page.slug !== "index")
    .map((page) => ({ slug: page.slug }));
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = document("docs-page").bySlug(slug);

  if (!page) {
    return null;
  }

  return (
    <DashboardShell activePath="/docs" kicker="Docs page" title={page.title} description={page.description ?? ""}>
      <article className="surface markdown-card">
        <Link href="/docs" className="text-link page-backlink">
          Back to docs hub
        </Link>
        <RenderContent markdown={page.content} />
      </article>
    </DashboardShell>
  );
}
