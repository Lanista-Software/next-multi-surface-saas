import Link from "next/link";
import { dictionary, singleton } from "#contentrain";
import type { Footer, Navigation, SiteSettings } from "#contentrain";

type DashboardShellProps = {
  activePath: string;
  children: React.ReactNode;
  description: string;
  kicker: string;
  title: string;
};

type NavigationItem = NonNullable<Navigation["items"]>[number];

function isActive(activePath: string, href: string) {
  if (href === "/") {
    return activePath === "/";
  }

  return activePath.startsWith(href);
}

export function getShellContent(locale = "en") {
  const copy = dictionary("ui-copy").locale(locale);
  const site = singleton("site-settings").locale(locale).get() as SiteSettings;
  const navigation = singleton("navigation").locale(locale).get() as Navigation;
  const footer = singleton("footer").locale(locale).get() as Footer;

  return { copy, footer, navigation, site };
}

export function DashboardShell({
  activePath,
  children,
  description,
  kicker,
  title,
}: DashboardShellProps) {
  const { copy, footer, navigation, site } = getShellContent();
  const navItems = (navigation.items ?? []) as NavigationItem[];

  return (
    <div className="dashboard-app">
      <aside className="sidebar">
        <Link href="/" className="brand">
          {site.site_name}
        </Link>
        <p className="sidebar-copy">{site.site_tagline}</p>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-link ${isActive(activePath, item.href) ? "active" : ""}`}
            >
              <span>{item.label}</span>
              {item.emphasis ? <span className="pill">Live</span> : null}
            </Link>
          ))}
        </nav>

        <div className="sidebar-panel">
          <div className="eyebrow">{copy.get("surface.caption") ?? "Typed multi-surface content"}</div>
          <p className="muted">{copy.get("surface.note") ?? "Keep app, docs, and launch messaging aligned."}</p>
          <a href={navigation.cta_href ?? "https://studio.contentrain.io/"} className="button ghost">
            {navigation.cta_label ?? "Open Studio"}
          </a>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">{kicker}</div>
            <h1>{title}</h1>
            <p className="lead">{description}</p>
          </div>
          <div className="topbar-meta">
            <span className="pill">{navigation.announcement_label}</span>
            <a href="https://docs.contentrain.io/" className="text-link">
              Docs
            </a>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="footer-copy">
            <span>{footer.blurb}</span>
            <span>{footer.legal_notice}</span>
          </div>
          <div className="footer-columns">
            {footer.columns?.map((column) => (
              <section key={column.title} className="footer-column">
                <strong>{column.title}</strong>
                <div className="footer-links">
                  {column.links?.map((link) => (
                    <a key={link.label} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
