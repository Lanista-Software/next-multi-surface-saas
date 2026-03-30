import Link from "next/link";
import { document } from "#contentrain";
import { DashboardShell } from "../../dashboard-shell";
import { RenderContent } from "../../render-content";

export function generateStaticParams() {
  return document("package-page").all().map((page) => ({ slug: page.slug }));
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = document("package-page").bySlug(slug);

  if (!page) {
    return null;
  }

  return (
    <DashboardShell activePath="/docs" kicker="Package docs" title={page.title} description={page.description ?? ""}>
      <article className="surface markdown-card">
        <Link href="/docs" className="text-link page-backlink">
          Back to docs hub
        </Link>
        <RenderContent markdown={page.content} />
      </article>
    </DashboardShell>
  );
}
