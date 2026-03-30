import { query } from "#contentrain";
import { DashboardShell } from "../dashboard-shell";

export default function BillingPage() {
  const plans = query("pricing-tier").locale("en").all();

  return (
    <DashboardShell
      activePath="/billing"
      kicker="Billing"
      title="Pricing language should stay consistent between marketing and in-app upgrade paths."
      description="This route uses the same plan model that powers the marketing homepage so pricing copy stays aligned across surfaces."
    >
      <section className="section-block">
        <h2>Plan governance</h2>
        <div className="stat-grid">
          {plans.map((plan) => (
            <article key={plan.id} className={`surface plan-card ${plan.featured ? "featured" : ""}`}>
              <div className="queue-head">
                <h3>{plan.name}</h3>
                {plan.featured ? <span className="pill">Recommended</span> : null}
              </div>
              <div className="price-block">
                <strong>{plan.price_label}</strong>
                <span className="muted">{plan.billing_hint}</span>
              </div>
              <p className="muted">{plan.summary}</p>
              <ul className="bullet-list">
                {plan.features?.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
