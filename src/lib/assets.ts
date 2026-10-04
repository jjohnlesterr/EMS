/**
 * Image asset registry.
 *
 * Every image used by the UI is referenced through this file. While the Figma
 * assets are not exported yet, `src` is left undefined and <ImageSlot> renders
 * a neutral placeholder block at the exact Figma size.
 *
 * To swap in a real asset: export it from Figma into /public/figma and set
 * `src` below (e.g. "/figma/ems-logo.png"). No component changes are needed.
 */
export interface AssetSpec {
  /** Path under /public. Undefined → neutral placeholder. */
  src?: string;
  alt: string;
  /** Figma node the asset comes from, for re-export. */
  figmaNode?: string;
  /** Intrinsic Figma size in px (used for aspect ratio). */
  width: number;
  height: number;
}

export const ASSETS = {
  /** White EMS logo shown in the sidebar. */
  sidebarLogo: { alt: "EMS — Employee Management System", figmaNode: "Sidebar (223:3428)", width: 186, height: 186 },
  /** Navy EMS logo + tagline on the login / activate left panel. */
  authLogo: { alt: "EMS — Employee Management System. Manage. Empower. Succeed.", figmaNode: "5:618", width: 420, height: 380 },
  /** Blurred office photo behind the auth card. */
  authBackground: { alt: "", figmaNode: "17:77 Background", width: 1512, height: 982 },
  /** Left panel photo of the login card (desk + laptop). */
  authPanelLogin: { alt: "", figmaNode: "5:684", width: 605, height: 700 },
  /** Left panel illustration of First Time Setup. */
  authPanelSetup: { alt: "", figmaNode: "58:809", width: 605, height: 700 },
  /** 3D user badge above "Welcome Back!". */
  authIconLogin: { alt: "", figmaNode: "16:149 icon", width: 150, height: 150 },
  /** 3D envelope/ID icon above "Activate Account". */
  authIconActivate: { alt: "", figmaNode: "16:149 icon", width: 150, height: 150 },
  /** Shield + key icon above "First Time Setup". */
  authIconSetup: { alt: "", figmaNode: "16:149 icon", width: 150, height: 150 },
  /** Light blue abstract banner behind each page header. */
  headerBanner: { alt: "", figmaNode: "image/banner2", width: 1171, height: 148 },
  /** Illustration on the "Create Leave Request" card. */
  leaveIllustration: { alt: "", figmaNode: "205:3555", width: 122, height: 126 },
} satisfies Record<string, AssetSpec>;

export type AssetKey = keyof typeof ASSETS;
