import type { ComponentType } from "react";
import type { DesignSlug } from "@/lib/site-content";
import type { DesignProps, ProjectDetailProps } from "./types";

export type DesignDefinition = {
  index: number;
  slug: DesignSlug;
  name: string;
  sector: string;
  palette: [string, string, string];
  load: () => Promise<{ default: ComponentType<DesignProps> }>;
  loadProject: () => Promise<{ default: ComponentType<ProjectDetailProps> }>;
};

export const DESIGN_DEFINITIONS: Record<DesignSlug, DesignDefinition> = {
  "cinematic-growth": { index: 1, slug: "cinematic-growth", name: "Cinematic Growth", sector: "Growth & Automation", palette: ["#070A0D", "#C7FF45", "#FF6B3D"], load: () => import("./cinematic-growth/CinematicGrowth"), loadProject: () => import("./cinematic-growth/Project") },
  "scroll-world-atlas": { index: 2, slug: "scroll-world-atlas", name: "Scroll World Atlas", sector: "Immersive Growth Map", palette: ["#F6F0DF", "#153B32", "#2454FF"], load: () => import("./scroll-world-atlas/ScrollWorldAtlas"), loadProject: () => import("./scroll-world-atlas/Project") },
  "agentic-growth-core": { index: 3, slug: "agentic-growth-core", name: "Agentic Growth Core", sector: "Cyber Human Operations", palette: ["#06080D", "#58D7FF", "#FF8A2A"], load: () => import("./agentic-growth-core/AgenticGrowthCore"), loadProject: () => import("./agentic-growth-core/Project") },
};
