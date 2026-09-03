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
};
