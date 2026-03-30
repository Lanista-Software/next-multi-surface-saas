import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { DashboardShell } from "../dashboard-shell";

type ModelField = {
  type?: string;
};

type ModelSchema = {
  domain: string;
  fields?: Record<string, ModelField>;
  id: string;
  kind: string;
};

async function getArchitecture() {
  const modelDir = path.join(process.cwd(), ".contentrain", "models");
  const modelFiles = (await readdir(modelDir)).sort();
  const models = await Promise.all(
    modelFiles.map(async (file) =>
      JSON.parse(await readFile(path.join(modelDir, file), "utf8")) as ModelSchema,
    ),
  );
  const domains = [...new Set(models.map((model) => model.domain))].sort((left, right) =>
    left.localeCompare(right, "en"),
  );

  return domains.map((domain) => ({
    domain,
    models: models.filter((model) => model.domain === domain),
  }));
}

export default async function ArchitecturePage() {
  const groups = await getArchitecture();

  return (
    <DashboardShell
      activePath="/architecture"
      kicker="Architecture"
      title="Multi-surface parity only works when the content model is explicit."
      description="This page reads the local Contentrain model files and shows how system, marketing, app, product, and docs domains map to real routes."
    >
      <div className="content-grid">
        {groups.map((group) => (
          <section key={group.domain} className="section-block">
            <h2 style={{ textTransform: "capitalize" }}>{group.domain}</h2>
            <div className="stack">
              {group.models.map((model) => (
                <article key={model.id} className="surface settings-card">
                  <div className="queue-head">
                    <h3>{model.id}</h3>
                    <span className="pill">{model.kind}</span>
                  </div>
                  <div className="setting-items">
                    {Object.entries(model.fields ?? {}).map(([fieldName, definition]) => (
                      <div key={fieldName} className="setting-row">
                        <strong>{fieldName}</strong>
                        <span className="muted">{definition.type ?? "unknown"}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DashboardShell>
  );
}
