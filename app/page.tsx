import { document, query, singleton } from "#contentrain";
import { DashboardShell } from "./dashboard-shell";

export default function HomePage() {
  const hero = singleton("hero").locale("en").get();
  const features = query("feature").locale("en").all();
  const tiers = query("pricing-tier").locale("en").all();
  const integrations = query("integration").locale("en").all();
  const releases = [...document("changelog-entry").all()].sort((left, right) =>
    right.release_date.localeCompare(left.release_date, "en"),
  );

  return (
    <DashboardShell
      activePath="/"
      kicker={hero.eyebrow ?? "Multi-surface SaaS"}
      title={hero.title}
      description={hero.subtitle ?? ""}
    >
      <section className="hero-banner surface hero-layout">
        <div className="stack">
          <span className="pill">Marketing surface</span>
          <p className="muted">
            Feature names, plan labels, onboarding language, and docs terminology all come from the same
            Contentrain project.
          </p>
          <div className="button-row">
            <a href={hero.primary_cta_href ?? "/app"} className="button">
              {hero.primary_cta_label ?? "Open the app surface"}
            </a>
            <a href={hero.secondary_cta_href ?? "/docs"} className="button ghost">
              {hero.secondary_cta_label ?? "Read the docs"}
            </a>
          </div>
        </div>
        <img src={hero.hero_media} alt={hero.title} className="hero-media" />
      </section>

      <section className="section-block">
        <h2>What this starter solves</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.id} className={`surface feature-card ${feature.emphasis ? "featured" : ""}`}>
              <div className="queue-head">
                <h3>{feature.title}</h3>
                {feature.icon ? <span className="pill">{feature.icon}</span> : null}
              </div>
              <p className="muted">{feature.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="content-grid">
        <section className="section-block">
          <h2>Pricing parity</h2>
          <div className="stack">
            {tiers.map((tier) => (
              <article key={tier.id} className={`surface plan-card ${tier.featured ? "featured" : ""}`}>
                <div className="queue-head">
                  <h3>{tier.name}</h3>
                  {tier.featured ? <span className="pill">Recommended</span> : null}
                </div>
                <div className="price-block">
                  <strong>{tier.price_label}</strong>
                  <span className="muted">{tier.billing_hint}</span>
                </div>
                <p className="muted">{tier.summary}</p>
                <ul className="bullet-list">
                  {tier.features?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <h2>Shared surface hubs</h2>
          <div className="route-grid">
            {[
              { label: "App shell", href: "/app", summary: "Dashboard metrics and launch queue states." },
              { label: "Docs", href: "/docs", summary: "Typed docs, guides, reference, and package pages." },
              {
                label: "Changelog",
                href: "/changelog/unified-surface-rollout",
                summary: "Release communication from the same vocabulary.",
              },
            ].map((route) => (
              <a key={route.href} href={route.href} className="surface route-card">
                <h3>{route.label}</h3>
                <p className="muted">{route.summary}</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="section-block">
        <h2>Docs and integration parity</h2>
        <div className="content-grid">
          <div className="stack">
            {integrations.map((integration) => (
              <article key={integration.id} className="surface integration-card">
                <div className="queue-head">
                  <h3>{integration.name}</h3>
                  {integration.category ? <span className="pill">{integration.category}</span> : null}
                </div>
                <p className="muted">{integration.summary}</p>
                <a href="/packages/query-client" className="text-link">
                  View package docs
                </a>
              </article>
            ))}
          </div>

          <div className="stack">
            {releases.map((entry) => (
              <article key={entry.slug} className="surface audit-card">
                <div className="queue-head">
                  <h3>{entry.title}</h3>
                  <span className="pill">{entry.release_date}</span>
                </div>
                <p className="muted">{entry.summary}</p>
                <a href={`/changelog/${entry.slug}`} className="text-link">
                  Read release note
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
