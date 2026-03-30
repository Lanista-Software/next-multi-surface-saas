import Link from "next/link";
import { document } from "#contentrain";
import type { DocsPage, GuidePage, PackagePage, ReferencePage } from "#contentrain";
import { DashboardShell } from "../dashboard-shell";

function sortByOrder<T extends { order?: number }>(entries: T[]) {
  return [...entries].sort((left, right) => (left.order ?? 99) - (right.order ?? 99));
}

type Group = {
  items: Array<DocsPage | GuidePage | ReferencePage | PackagePage>;
  hrefBase: string;
  title: string;
};

export default function DocsHubPage() {
  const docsPages = sortByOrder(document("docs-page").all());
  const guides = sortByOrder(document("guide-page").all());
  const references = sortByOrder(document("reference-page").all());
  const packages = sortByOrder(document("package-page").all());

  const groups: Group[] = [
    { title: "Docs", hrefBase: "/docs", items: docsPages },
    { title: "Guides", hrefBase: "/guides", items: guides },
    { title: "Reference", hrefBase: "/reference", items: references },
    { title: "Packages", hrefBase: "/packages", items: packages },
  ];

  return (
    <DashboardShell
      activePath="/docs"
      kicker="Docs"
      title="Documentation should share the same release vocabulary as the product."
      description="This route reads Contentrain document models and exposes them through framework-native Next.js pages."
    >
      <div className="content-grid">
        {groups.map((group) => (
          <section key={group.title} className="section-block">
            <h2>{group.title}</h2>
            <div className="stack">
              {group.items.map((page) => (
                <article key={page.slug} className="surface route-card">
                  <h3>{page.title}</h3>
                  <p className="muted">{page.description}</p>
                  <Link
                    href={page.slug === "index" && group.hrefBase === "/docs" ? "/docs" : `${group.hrefBase}/${page.slug}`}
                    className="text-link"
                  >
                    Open page
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DashboardShell>
  );
}
