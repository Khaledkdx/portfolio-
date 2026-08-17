"use client";

import Link from "next/link";
import { useState } from "react";
import { DESIGN_NAMES, DESIGN_SLUGS, type DesignSlug, type SiteContent } from "@/lib/site-content";

const directions: Record<DesignSlug, string> = {
  "growth-operator": "Editorial / Olive / Organic",
  "executive-brief": "Refined / Charcoal / Brass",
  "campaign-desk": "Magazine / Ink / Signal red",
  "systems-map": "Diagrammatic / Grid / Orange",
  "signal-scale": "Modular / Cobalt / Acid lime",
  "gulf-modern": "Architectural / Sand / Emerald",
  "proof-of-work": "Brutal / Black / Work-first",
  momentum: "Kinetic / Coral / Oversized type",
  "studio-ledger": "Archival / Paper / Burgundy",
  "control-room": "Operational / Dark / Monospace",
};

export function DesignLab({ content }: { content: SiteContent }) {
  const [active, setActive] = useState<DesignSlug>(content.activeDesign);
  const [saving, setSaving] = useState<DesignSlug | null>(null);
  const [message, setMessage] = useState("");

  async function activate(design: DesignSlug) {
    setSaving(design);
    setMessage("");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...content, activeDesign: design }),
    });
    if (response.ok) {
      setActive(design);
      setMessage(`${DESIGN_NAMES[design]} is now live.`);
    } else {
      setMessage("Could not change the live design. Please try again.");
    }
    setSaving(null);
  }

  return (
    <main className="design-lab">
      <header className="lab-header">
        <div><p>PRIVATE DESIGN LAB / 10 DIRECTIONS</p><h1>Choose the public face of the work.</h1></div>
        <div className="lab-actions"><Link href="/admin">Open admin</Link><Link href="/en">View live site ↗</Link></div>
      </header>
      {message && <p className="lab-message" role="status">{message}</p>}
      <section className="design-grid">
        {DESIGN_SLUGS.map((design, index) => (
          <article className={`design-card mini-${design}${active === design ? " is-active" : ""}`} key={design}>
            <Link className="design-preview" href={`/${index + 1}`} aria-label={`Preview ${DESIGN_NAMES[design]}`}>
              <div className="mini-nav"><i /><span>KHALID / GROWTH</span></div>
              <div className="mini-stage"><b>{String(index + 1).padStart(2, "0")}</b><h2>I turn bottlenecks into growth systems.</h2><span>VIEW WORK ↗</span></div>
              <div className="mini-blocks"><i /><i /><i /></div>
            </Link>
            <footer>
              <div><span>{String(index + 1).padStart(2, "0")}</span><h3>{DESIGN_NAMES[design]}</h3><p>{directions[design]}</p></div>
              <div className="design-buttons"><Link href={`/${index + 1}`}>Full preview</Link><button disabled={active === design || saving !== null} onClick={() => activate(design)}>{active === design ? "Live now" : saving === design ? "Setting…" : "Set live"}</button></div>
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
