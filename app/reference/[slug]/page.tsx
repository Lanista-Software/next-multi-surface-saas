import Link from "next/link";
import { document } from "#contentrain";
import { DashboardShell } from "../../dashboard-shell";
import { RenderContent } from "../../render-content";

export function generateStaticParams() {
  return document("reference-page").all().map((page) => ({ slug: page.slug }));
}

export default async function ReferencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = document("reference-page").bySlug(slug);

  if (!page) {
    return null;
  }

  return (
    <DashboardShell activePath="/docs" kicker="Reference" title={page.title} description={page.description ?? ""}>
      <article className="surface markdown-card">
        <Link href="/docs" className="text-link page-backlink">
          Back to docs hub
        </Link>
        <RenderContent markdown={page.content} />
      </article>
    </DashboardShell>
  );
}
