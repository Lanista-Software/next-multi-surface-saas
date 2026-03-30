import { document, query } from "#contentrain";
import { DashboardShell } from "../dashboard-shell";

export default function OperationsPage() {
  const queue = query("work-queue-item").locale("en").all();
  const releases = [...document("changelog-entry").all()].sort((left, right) =>
    right.release_date.localeCompare(left.release_date, "en"),
  );
  const integrations = query("integration").locale("en").all();

  return (
    <DashboardShell
      activePath="/operations"
      kicker="Operations"
      title="Operational rollout work also belongs on the same content graph."
      description="This page shows the queue items, release notes, and integrations that support a real multi-surface launch workflow."
    >
      <div className="content-grid">
        <section className="section-block">
          <h2>Integration readiness</h2>
          <div className="stack">
            {integrations.map((integration) => (
              <article key={integration.id} className="surface notice-card">
                <div className="queue-head">
                  <h3>{integration.name}</h3>
                  {integration.category ? <span className="pill">{integration.category}</span> : null}
                </div>
                <p className="muted">{integration.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <h2>Open queue items</h2>
          <div className="stack">
            {queue.map((item) => (
              <article key={item.id} className="surface queue-card">
                <div className="queue-head">
                  <h3>{item.title}</h3>
                  <span className={`pill tone-${item.priority ?? "medium"}`}>{item.priority}</span>
                </div>
                <p className="muted">{item.summary}</p>
                <div className="meta-row muted">
                  <span>{item.owner}</span>
                  <span>{item.due_label}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="section-block">
        <h2>Recent release notes</h2>
        <div className="stack">
          {releases.map((entry) => (
            <article key={entry.slug} className="surface audit-card">
              <div className="queue-head">
                <div>
                  <h3>{entry.title}</h3>
                  <p className="muted">{entry.summary}</p>
                </div>
                <span className="pill">{entry.release_date}</span>
              </div>
              <a href={`/changelog/${entry.slug}`} className="text-link">
                Open release note
              </a>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
