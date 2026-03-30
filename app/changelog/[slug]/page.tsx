import Link from "next/link";
import { document } from "#contentrain";
import { DashboardShell } from "../../dashboard-shell";
import { RenderContent } from "../../render-content";

export function generateStaticParams() {
  return document("changelog-entry").all().map((entry) => ({ slug: entry.slug }));
}

export default async function ChangelogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = document("changelog-entry").bySlug(slug);

  if (!entry) {
    return null;
  }

  return (
    <DashboardShell
      activePath="/changelog/unified-surface-rollout"
      kicker="Changelog"
      title={entry.title}
      description={entry.summary ?? ""}
    >
      <article className="surface markdown-card">
        <Link href="/operations" className="text-link page-backlink">
          Back to operations
        </Link>
        <span className="pill">{entry.release_date}</span>
        <RenderContent markdown={entry.content} />
      </article>
    </DashboardShell>
  );
}
