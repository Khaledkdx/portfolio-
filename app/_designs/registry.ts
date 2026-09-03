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
  "arabic-geometry": { index: 1, slug: "arabic-geometry", name: "Arabic Geometry", sector: "Arabic Luxury", palette: ["#F3E7CF", "#153B32", "#C98B2E"], load: () => import("./arabic-geometry/ArabicGeometry"), loadProject: () => import("./arabic-geometry/Project") },
  "systems-map": { index: 2, slug: "systems-map", name: "SaaS Growth OS", sector: "Tech Startup", palette: ["#07111F", "#1267FF", "#16D9A4"], load: () => import("./growth-os/GrowthOS"), loadProject: () => import("./growth-os/Project") },
  "spatial-orbit": { index: 3, slug: "spatial-orbit", name: "Spatial 3D Orbit", sector: "Immersive 3D", palette: ["#090B10", "#49E0FF", "#FF754A"], load: () => import("./spatial-orbit/SpatialOrbit"), loadProject: () => import("./spatial-orbit/Project") },
  "modular-cubes": { index: 4, slug: "modular-cubes", name: "Modular Cubes", sector: "Modular Systems", palette: ["#F5F1E8", "#FF6B00", "#2D5BFF"], load: () => import("./modular-cubes/ModularCubes"), loadProject: () => import("./modular-cubes/Project") },
  "future-signal": { index: 5, slug: "future-signal", name: "Future Signal 2040", sector: "Future Interface", palette: ["#03070C", "#00F0C8", "#DAFF3E"], load: () => import("./future-signal/FutureSignal"), loadProject: () => import("./future-signal/Project") },
  "swiss-grid": { index: 6, slug: "swiss-grid", name: "Swiss Grid System", sector: "International Style", palette: ["#F7F5EF", "#E31B23", "#1B57D7"], load: () => import("./swiss-grid/SwissGrid"), loadProject: () => import("./swiss-grid/Project") },
  "analog-scrapbook": { index: 7, slug: "analog-scrapbook", name: "Analog Scrapbook", sector: "Human Creative", palette: ["#F3E5CF", "#D4553D", "#56765A"], load: () => import("./analog-scrapbook/AnalogScrapbook"), loadProject: () => import("./analog-scrapbook/Project") },
  "art-deco": { index: 8, slug: "art-deco", name: "Art Deco Executive", sector: "Luxury Executive", palette: ["#0E1A1F", "#E5C07B", "#8F2636"], load: () => import("./art-deco/ArtDeco"), loadProject: () => import("./art-deco/Project") },
  "retro-computer": { index: 9, slug: "retro-computer", name: "Retro Growth Computer", sector: "Retro Technology", palette: ["#06110B", "#7CFF6B", "#F1B84B"], load: () => import("./retro-computer/RetroComputer"), loadProject: () => import("./retro-computer/Project") },
  "organic-lab": { index: 10, slug: "organic-lab", name: "Organic Growth Lab", sector: "Organic Systems", palette: ["#EEF3E6", "#173D2C", "#88A96B"], load: () => import("./organic-lab/OrganicLab"), loadProject: () => import("./organic-lab/Project") },
  "broadcast-studio": { index: 11, slug: "broadcast-studio", name: "Broadcast Studio", sector: "Broadcast & Social", palette: ["#16121F", "#F7F2E8", "#FF334F"], load: () => import("./broadcast-studio/BroadcastStudio"), loadProject: () => import("./broadcast-studio/Project") },
  "control-room": { index: 12, slug: "control-room", name: "Neo-Brutalist Pitch Deck", sector: "Startup & Agency", palette: ["#FFFFFF", "#FFD600", "#3455FF"], load: () => import("./pitch/Pitch"), loadProject: () => import("./pitch/Project") },
};
