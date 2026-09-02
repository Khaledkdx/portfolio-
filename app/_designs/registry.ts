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
  "growth-operator": { index: 1, slug: "growth-operator", name: "Boardroom Annual Report", sector: "Corporate B2B", palette: ["#0B1F33", "#F4F0E8", "#1F6B57"], load: () => import("./boardroom/Boardroom"), loadProject: () => import("./boardroom/Project") },
  "executive-brief": { index: 2, slug: "executive-brief", name: "Creative Agency Manifesto", sector: "Bold Creative", palette: ["#F4FF57", "#FF5A36", "#2015FF"], load: () => import("./manifesto/Manifesto"), loadProject: () => import("./manifesto/Project") },
  "campaign-desk": { index: 3, slug: "campaign-desk", name: "Quiet Luxury Advisor", sector: "Premium Minimal", palette: ["#171714", "#F2EEE5", "#A68A64"], load: () => import("./luxury/Luxury"), loadProject: () => import("./luxury/Project") },
  "systems-map": { index: 4, slug: "systems-map", name: "SaaS Growth OS", sector: "Tech Startup", palette: ["#07111F", "#1267FF", "#16D9A4"], load: () => import("./growth-os/GrowthOS"), loadProject: () => import("./growth-os/Project") },
  "signal-scale": { index: 5, slug: "signal-scale", name: "Editorial Campaign Casebook", sector: "Marketing Magazine", palette: ["#F7F0DF", "#C52B28", "#172A3A"], load: () => import("./casebook/Casebook"), loadProject: () => import("./casebook/Project") },
  "gulf-modern": { index: 6, slug: "gulf-modern", name: "Gulf Architectural Modernism", sector: "Regional Premium", palette: ["#E8D9BF", "#0F5A4A", "#7B2D34"], load: () => import("./gulf/Gulf"), loadProject: () => import("./gulf/Project") },
  "proof-of-work": { index: 7, slug: "proof-of-work", name: "Performance Marketing War Room", sector: "Data & Media Buying", palette: ["#080B0D", "#C8FF41", "#FFB000"], load: () => import("./war-room/WarRoom"), loadProject: () => import("./war-room/Project") },
  momentum: { index: 8, slug: "momentum", name: "Motion-first Creator Reel", sector: "Content & Social", palette: ["#0A0A0F", "#FF3D8D", "#FF6B3D"], load: () => import("./reel/Reel"), loadProject: () => import("./reel/Project") },
  "studio-ledger": { index: 9, slug: "studio-ledger", name: "Human-Centered Growth Stories", sector: "Consulting & SMEs", palette: ["#F6E8DA", "#2F5D50", "#295A7A"], load: () => import("./stories/Stories"), loadProject: () => import("./stories/Project") },
  "control-room": { index: 10, slug: "control-room", name: "Neo-Brutalist Pitch Deck", sector: "Startup & Agency", palette: ["#FFFFFF", "#FFD600", "#3455FF"], load: () => import("./pitch/Pitch"), loadProject: () => import("./pitch/Project") },
  "arabic-geometry": { index: 11, slug: "arabic-geometry", name: "Arabic Geometry", sector: "Arabic Contemporary", palette: ["#F3E7CF", "#153B32", "#1B3A6F"], load: () => import("./arabic-geometry/ArabicGeometry"), loadProject: () => import("./arabic-geometry/Project") },
  "spatial-orbit": { index: 12, slug: "spatial-orbit", name: "Spatial 3D Orbit", sector: "Immersive 3D", palette: ["#090B10", "#49E0FF", "#FF754A"], load: () => import("./spatial-orbit/SpatialOrbit"), loadProject: () => import("./spatial-orbit/Project") },
  "modular-cubes": { index: 13, slug: "modular-cubes", name: "Modular Cubes", sector: "Modular Systems", palette: ["#F5F1E8", "#FF6B00", "#2D5BFF"], load: () => import("./modular-cubes/ModularCubes"), loadProject: () => import("./modular-cubes/Project") },
  "future-signal": { index: 14, slug: "future-signal", name: "Future Signal 2040", sector: "Future Interface", palette: ["#03070C", "#00F0C8", "#F54B64"], load: () => import("./future-signal/FutureSignal"), loadProject: () => import("./future-signal/Project") },
  "swiss-grid": { index: 15, slug: "swiss-grid", name: "Swiss Grid System", sector: "International Style", palette: ["#F7F5EF", "#E31B23", "#1B57D7"], load: () => import("./swiss-grid/SwissGrid"), loadProject: () => import("./swiss-grid/Project") },
  "analog-scrapbook": { index: 16, slug: "analog-scrapbook", name: "Analog Scrapbook", sector: "Human Creative", palette: ["#F3E5CF", "#D4553D", "#56765A"], load: () => import("./analog-scrapbook/AnalogScrapbook"), loadProject: () => import("./analog-scrapbook/Project") },
  "art-deco": { index: 17, slug: "art-deco", name: "Art Deco Executive", sector: "Luxury Executive", palette: ["#0E1A1F", "#E5C07B", "#8F2636"], load: () => import("./art-deco/ArtDeco"), loadProject: () => import("./art-deco/Project") },
  "zen-strategy": { index: 18, slug: "zen-strategy", name: "Zen Strategy", sector: "Calm Consulting", palette: ["#F4F1E8", "#8DAD8A", "#C95A46"], load: () => import("./zen-strategy/ZenStrategy"), loadProject: () => import("./zen-strategy/Project") },
  "retro-computer": { index: 19, slug: "retro-computer", name: "Retro Growth Computer", sector: "Retro Technology", palette: ["#06110B", "#7CFF6B", "#F1B84B"], load: () => import("./retro-computer/RetroComputer"), loadProject: () => import("./retro-computer/Project") },
  "organic-lab": { index: 20, slug: "organic-lab", name: "Organic Growth Lab", sector: "Organic Systems", palette: ["#EEF3E6", "#173D2C", "#DB715D"], load: () => import("./organic-lab/OrganicLab"), loadProject: () => import("./organic-lab/Project") },
  "museum-walk": { index: 21, slug: "museum-walk", name: "Museum Walk", sector: "Curated Portfolio", palette: ["#F4F1EA", "#20201E", "#9D2D24"], load: () => import("./museum-walk/MuseumWalk"), loadProject: () => import("./museum-walk/Project") },
  "growth-transit": { index: 22, slug: "growth-transit", name: "Growth Transit", sector: "Operations & Networks", palette: ["#F5F2E9", "#153B5B", "#F05A35"], load: () => import("./growth-transit/GrowthTransit"), loadProject: () => import("./growth-transit/Project") },
  "campaign-comics": { index: 23, slug: "campaign-comics", name: "Campaign Comics", sector: "Campaign Storytelling", palette: ["#FFF7D6", "#151515", "#FF4F45"], load: () => import("./campaign-comics/CampaignComics"), loadProject: () => import("./campaign-comics/Project") },
  "folded-mail": { index: 24, slug: "folded-mail", name: "Folded Direct Mail", sector: "CRM & Lifecycle", palette: ["#EDE6D5", "#24362B", "#D36245"], load: () => import("./folded-mail/FoldedMail"), loadProject: () => import("./folded-mail/Project") },
  "contact-sheet": { index: 25, slug: "contact-sheet", name: "Contact Sheet Studio", sector: "Content Production", palette: ["#101010", "#F4F0E8", "#E2482D"], load: () => import("./contact-sheet/ContactSheet"), loadProject: () => import("./contact-sheet/Project") },
  "gtm-gameboard": { index: 26, slug: "gtm-gameboard", name: "GTM Gameboard", sector: "Go-to-market", palette: ["#F7EDC7", "#172D3D", "#F04E30"], load: () => import("./gtm-gameboard/GtmGameboard"), loadProject: () => import("./gtm-gameboard/Project") },
  "whiteboard-workshop": { index: 27, slug: "whiteboard-workshop", name: "Whiteboard Workshop", sector: "SME Workshops", palette: ["#F7F7F2", "#20252B", "#3478F6"], load: () => import("./whiteboard-workshop/WhiteboardWorkshop"), loadProject: () => import("./whiteboard-workshop/Project") },
  "broadcast-studio": { index: 28, slug: "broadcast-studio", name: "Broadcast Studio", sector: "Broadcast & Social", palette: ["#16121F", "#F7F2E8", "#FF334F"], load: () => import("./broadcast-studio/BroadcastStudio"), loadProject: () => import("./broadcast-studio/Project") },
  "type-tunnel": { index: 29, slug: "type-tunnel", name: "Type Tunnel", sector: "Experimental Type", palette: ["#080808", "#F1EEE6", "#F04432"], load: () => import("./type-tunnel/TypeTunnel"), loadProject: () => import("./type-tunnel/Project") },
  "tactile-clay": { index: 30, slug: "tactile-clay", name: "Tactile Clay Lab", sector: "Service Design", palette: ["#F2E8DF", "#4C3E49", "#ED7B61"], load: () => import("./tactile-clay/TactileClay"), loadProject: () => import("./tactile-clay/Project") },
  "rain-credential": { index: 31, slug: "rain-credential", name: "Rain Credential", sector: "Immersive Personal Brand", palette: ["#05090D", "#C8F4FF", "#4FC3F7"], load: () => import("./rain-credential/RainCredential"), loadProject: () => import("./rain-credential/Project") },
  "stagger-proof": { index: 32, slug: "stagger-proof", name: "Stagger Proof Studio", sector: "Proof-led Marketing", palette: ["#FDF2F8", "#831843", "#0891B2"], load: () => import("./stagger-proof/StaggerProof"), loadProject: () => import("./stagger-proof/Project") },
};
