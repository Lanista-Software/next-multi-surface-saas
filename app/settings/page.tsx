import { query } from "#contentrain";
import { DashboardShell } from "../dashboard-shell";

export default function SettingsPage() {
  const groups = query("settings-group").locale("en").all();

  return (
    <DashboardShell
      activePath="/settings"
      kicker="Shared terms"
      title="Shared terminology should survive docs, onboarding, and billing without drift."
      description="These settings groups illustrate the content contracts reused between the public site, the app shell, and supporting docs."
    >
      <section className="section-block">
        <h2>Surface settings matrix</h2>
        <div className="stack">
          {groups.map((group) => (
            <article key={group.id} className="surface settings-card">
              <h3>{group.title}</h3>
              <p className="muted">{group.summary}</p>
              <div className="setting-items">
                {group.items?.map((item) => (
                  <div key={item.label} className="setting-row">
                    <div>
                      <strong>{item.label}</strong>
                      <p className="muted">{item.hint}</p>
                    </div>
                    <div className="setting-value">
                      <span>{item.value}</span>
                      {item.status ? <span className="pill">{item.status}</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
