"use client";

import Link from "next/link";
import { useState } from "react";
import { DESIGN_NAMES, DESIGN_SLUGS, type DesignSlug, type SiteContent } from "@/lib/site-content";

const directions: Record<DesignSlug, string> = {
  "arabic-geometry": "Arabic luxury / Geometry / Cultural",
  "systems-map": "SaaS OS / Cobalt / Bento system",
  "spatial-orbit": "Immersive space / 3D / Orbital",
  "modular-cubes": "Modular system / Cubes / Constructive",
  "future-signal": "Future interface / Signal / HUD",
  "swiss-grid": "Swiss system / Rational / Typographic",
  "analog-scrapbook": "Scrapbook / Human / Tactile",
  "art-deco": "Art Deco / Gold / Executive",
  "retro-computer": "Retro computer / CRT / Playful tech",
  "organic-lab": "Organic lab / Living systems / Natural",
  "broadcast-studio": "Broadcast / Multicam / Social",
  "control-room": "Pitch deck / Brutalist / Slide-based",
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
        <div><p>PRIVATE DESIGN LAB / 12 DIRECTIONS</p><h1>Choose the public face of the work.</h1></div>
        <div className="lab-actions"><Link href="/admin">Open admin</Link><Link href="/en">View live site ↗</Link></div>
      </header>
      {message && <p className="lab-message" role="status">{message}</p>}
      <section className="design-grid">
        {DESIGN_SLUGS.map((design, index) => (
          <article className={`design-card mini-${design}${active === design ? " is-active" : ""}`} key={design}>
            <Link className="design-preview" href={`/${index + 1}`} aria-label={`Preview ${DESIGN_NAMES[design]}`}>
              <div className="mini-nav"><i /><span>{directions[design].split(" / ")[0]}</span></div>
              <div className="mini-stage"><b>{String(index + 1).padStart(2, "0")}</b><h2>I turn bottlenecks into growth systems.</h2><span>{directions[design].split(" / ")[1]} ↗</span></div>
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
