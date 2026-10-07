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
  /** White EMS logo (transparent) shown in the sidebar and mobile top bar. */
  sidebarLogo: {
    src: "/images/login/logo.png",
    alt: "EMS — Employee Management System",
    figmaNode: "Sidebar (223:3428)",
    width: 200,
    height: 200,
  },
  /** 3D verified-user icon above "Welcome Back!". */
  authIconLogin: { src: "/images/login/login-icon.png", alt: "", figmaNode: "16:149 icon", width: 163, height: 160 },
  /**
   * Full Login frame. The export includes the card itself: 1212×700, centered
   * horizontally, its center 9px below the frame center.
   */
  loginBackground: { src: "/images/login/loginbg.png", alt: "", width: 1512, height: 982 },
  /** Left panel of the Login card (EMS logo over desk + laptop). */
  loginHero: {
    src: "/images/login/login-hero.png",
    alt: "EMS — Employee Management System. Manage. Empower. Succeed.",
    width: 606,
    height: 700,
  },
  /** 3D ID badge above "Activate Your Account". */
  authIconActivate: { src: "/images/login/activate-icon.png", alt: "", figmaNode: "16:149 icon", width: 137, height: 160 },
  /**
   * Full Activate Account frame. The export includes the card itself, centered
   * at 1212×700 in the 1512×982 frame; the activate page covers it exactly.
   */
  activateBackground: { src: "/images/login/activatebg.png", alt: "", width: 1512, height: 982 },
  /** Left panel of the Activate Account card (dashboard illustration). */
  activateHero: {
    src: "/images/login/activate-hero.png",
    alt: "Employees reviewing the EMS dashboard: profile, attendance, tasks, announcements, leave requests and security. Manage. Empower. Succeed.",
    width: 606,
    height: 700,
  },
  /** Shield + key icon above "First Time Setup". */
  authIconSetup: { src: "/images/login/first-time-icon.png", alt: "", figmaNode: "16:149 icon", width: 163, height: 135 },
  /** Left panel of the First Time Setup card (same illustration as Activate). */
  setupHero: {
    src: "/images/login/first-time.png",
    alt: "Employees reviewing the EMS dashboard: profile, attendance, tasks, announcements, leave requests and security. Manage. Empower. Succeed.",
    figmaNode: "58:809",
    width: 606,
    height: 700,
  },
  /** Light blue wave banner behind each Employee page header. */
  employeeBanner: { src: "/images/login/employee-banner.png", alt: "", figmaNode: "image/banner2", width: 1171, height: 148 },
  /** Blue angular banner behind each Manager page header. */
  managerBanner: { src: "/images/login/manager-banner.png", alt: "", width: 1171, height: 148 },
  /** Patterned navy background of the Manager sidebar. */
  managerSidebar: { src: "/images/login/manager-sidebar.png", alt: "", width: 642, height: 1536 },
  /** Illustration on the "Create Leave Request" card. */
  leaveIllustration: { alt: "", figmaNode: "205:3555", width: 122, height: 126 },
} satisfies Record<string, AssetSpec>;

export type AssetKey = keyof typeof ASSETS;
