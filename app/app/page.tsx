import { query, singleton } from "#contentrain";
import { DashboardShell } from "../dashboard-shell";

export default function AppSurfacePage() {
  const overview = singleton("dashboard-overview").locale("en").get();
  const stats = query("dashboard-stat").locale("en").all();
  const queue = query("work-queue-item").locale("en").all();

  return (
    <DashboardShell
      activePath="/app"
      kicker={overview.eyebrow ?? "App"}
      title={overview.title}
      description={overview.summary}
    >
      <section className="hero-banner surface">
        <div>
          <span className="pill">{overview.environment_badge}</span>
          <p className="muted">{overview.status_note}</p>
        </div>
        <a href={overview.primary_cta_href ?? "/docs"} className="button">
          {overview.primary_cta_label ?? "Open docs"}
        </a>
      </section>

      <section className="section-block">
        <h2>Shared app metrics</h2>
        <div className="stat-grid">
          {stats.map((item) => (
            <article key={item.id} className="surface stat-card">
              <span className="muted">{item.label}</span>
              <strong>{item.value}</strong>
              <span className={`delta ${item.trend ?? "steady"}`}>{item.delta}</span>
              <p className="muted">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Launch queue</h2>
        <div className="stack">
          {queue.map((item) => (
            <article key={item.id} className="surface queue-card">
              <div className="queue-head">
                <div>
                  <h3>{item.title}</h3>
                  <p className="muted">{item.summary}</p>
                </div>
                <span className={`pill tone-${item.status ?? "queued"}`}>{item.status}</span>
              </div>
              <div className="meta-row muted">
                <span>{item.owner}</span>
                <span>{item.due_label}</span>
                <a href={item.href ?? "/operations"} className="text-link">
                  Open
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
