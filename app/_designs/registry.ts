import type { ComponentType } from "react";
import type { DesignSlug } from "@/lib/site-content";
import type { DesignProps } from "./types";

export type DesignDefinition = {
  index: number;
  slug: DesignSlug;
  name: string;
  sector: string;
  palette: [string, string, string];
  load: () => Promise<{ default: ComponentType<DesignProps> }>;
};

export const DESIGN_DEFINITIONS: Record<DesignSlug, DesignDefinition> = {
  "growth-operator": { index: 1, slug: "growth-operator", name: "Boardroom Annual Report", sector: "Corporate B2B", palette: ["#0B1F33", "#F4F0E8", "#1F6B57"], load: () => import("./boardroom/Boardroom") },
  "executive-brief": { index: 2, slug: "executive-brief", name: "Creative Agency Manifesto", sector: "Bold Creative", palette: ["#F4FF57", "#FF5A36", "#2015FF"], load: () => import("./manifesto/Manifesto") },
  "campaign-desk": { index: 3, slug: "campaign-desk", name: "Quiet Luxury Advisor", sector: "Premium Minimal", palette: ["#171714", "#F2EEE5", "#A68A64"], load: () => import("./luxury/Luxury") },
  "systems-map": { index: 4, slug: "systems-map", name: "SaaS Growth OS", sector: "Tech Startup", palette: ["#07111F", "#1267FF", "#16D9A4"], load: () => import("./growth-os/GrowthOS") },
  "signal-scale": { index: 5, slug: "signal-scale", name: "Editorial Campaign Casebook", sector: "Marketing Magazine", palette: ["#F7F0DF", "#C52B28", "#172A3A"], load: () => import("./casebook/Casebook") },
  "gulf-modern": { index: 6, slug: "gulf-modern", name: "Gulf Architectural Modernism", sector: "Regional Premium", palette: ["#E8D9BF", "#0F5A4A", "#7B2D34"], load: () => import("./gulf/Gulf") },
  "proof-of-work": { index: 7, slug: "proof-of-work", name: "Performance Marketing War Room", sector: "Data & Media Buying", palette: ["#080B0D", "#C8FF41", "#FFB000"], load: () => import("./war-room/WarRoom") },
  momentum: { index: 8, slug: "momentum", name: "Motion-first Creator Reel", sector: "Content & Social", palette: ["#0A0A0F", "#FF3D8D", "#FF6B3D"], load: () => import("./reel/Reel") },
  "studio-ledger": { index: 9, slug: "studio-ledger", name: "Human-Centered Growth Stories", sector: "Consulting & SMEs", palette: ["#F6E8DA", "#2F5D50", "#295A7A"], load: () => import("./stories/Stories") },
  "control-room": { index: 10, slug: "control-room", name: "Neo-Brutalist Pitch Deck", sector: "Startup & Agency", palette: ["#FFFFFF", "#FFD600", "#3455FF"], load: () => import("./pitch/Pitch") },
};
