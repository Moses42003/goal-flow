import { useColorScheme } from "react-native";

/**
 * Theme tokens.
 *
 * Nothing in the app should hardcode a hex value that describes a *semantic*
 * role (page background, card surface, primary text). Collecting them here
 * means adding a theme switcher later is a matter of changing what this hook
 * returns — no screen has to be revisited.
 *
 * Deliberately minimal: only roles that actually differ between light and dark.
 * Accent colours (the orange flame, the blue primary) are shared, because they
 * read correctly on both surfaces.
 */
export type GoalAccent = "blue" | "violet" | "green" | "amber";

export type ThemeColors = {
  /** "light" or "dark" — lets components branch when a token isn't enough. */
  scheme: "light" | "dark";
  /** StatusBar style matching the scheme. */
  barStyle: "light-content" | "dark-content";
  /** Screen background. */
  background: string;
  /** Raised surface — cards, tiles, list rows. */
  surface: string;
  /** A softer surface for inset/secondary blocks. */
  surfaceMuted: string;
  /** Hairline borders. */
  border: string;
  /** Primary text. */
  text: string;
  /** Secondary text — captions, supporting copy. */
  textMuted: string;
  /** Hairline separators inside a surface. */
  divider: string;
  /**
   * The "inverse" surface used by the tip banner — dark on light, and dark
   * again on dark (it stays a deliberately contrasting block either way).
   */
  tipSurface: string;
  /** Text on `tipSurface`. */
  tipText: string;
  /** Secondary text on `tipSurface`. */
  tipTextMuted: string;

  // --- Header wave -------------------------------------------------------
  // The Home/Profile blue field is a gradient, so it needs its own stops per
  // theme: on light it is a bright azure sky, on dark it descends to the app's
  // own navy so the wave blends into the page instead of glowing out of it.
  /** Wave gradient, deep stop first. */
  waveColors: readonly [string, string, string, string];
  /** The white cloud highlights over the wave. */
  waveCloud: string;
  /** Opacity of those highlights — dialled down on dark. */
  waveCloudOpacity: number;

  // --- Goal card accents -------------------------------------------------
  // Each goal is tinted by its accent in the design. Light uses pastel fills;
  // dark must use *deeper* versions of the same hue, or the cards flare.
  /** Pastel card fill per accent. */
  goalTint: Record<"blue" | "violet" | "green" | "amber", string>;
  /** The tile behind the goal's icon, per accent. */
  goalTile: Record<"blue" | "violet" | "green" | "amber", string>;
  /** The progress fill per accent. */
  goalFill: Record<"blue" | "violet" | "green" | "amber", string>;
};

const LIGHT: ThemeColors = {
  scheme: "light",
  barStyle: "dark-content",
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F5F9",
  border: "#E2E8F0",
  text: "#0F172A",
  textMuted: "#64748B",
  divider: "#F1F5F9",
  tipSurface: "#0F172A",
  tipText: "#FFFFFF",
  tipTextMuted: "#CBD5E1",
  waveColors: ["#1E5FE0", "#2F7BF6", "#6FB6F9", "#BBDDFB"],
  waveCloud: "#FFFFFF",
  waveCloudOpacity: 0.08,
  goalTint: {
    blue: "#EFF6FF",
    violet: "#F5F3FF",
    green: "#F0FDF4",
    amber: "#FFFBEB",
  },
  goalTile: {
    blue: "#DBEAFE",
    violet: "#EDE9FE",
    green: "#DCFCE7",
    amber: "#FEF3C7",
  },
  goalFill: {
    blue: "#2563EB",
    violet: "#7C3AED",
    green: "#16A34A",
    amber: "#F59E0B",
  },
};

const DARK: ThemeColors = {
  scheme: "dark",
  barStyle: "light-content",
  background: "#0F172A",
  surface: "#1E293B",
  surfaceMuted: "#334155",
  border: "#334155",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  divider: "#334155",
  // On a dark page the tip block goes *lighter* than the surface, so it still
  // separates rather than disappearing into the background.
  tipSurface: "#334155",
  tipText: "#F8FAFC",
  tipTextMuted: "#CBD5E1",
  // Deep navy wave that melts into the page — the last stop equals the app
  // background so there is no glowing seam in dark mode.
  waveColors: ["#0A1B45", "#132E6B", "#1E3A8A", "#0F172A"],
  waveCloud: "#FFFFFF",
  waveCloudOpacity: 0.04,
  // Deeper tints of the same hues — pastel fills would flare on dark.
  goalTint: {
    blue: "#16295E",
    violet: "#2E1A5E",
    green: "#123F2A",
    amber: "#4A2C0A",
  },
  goalTile: {
    blue: "#1E40AF",
    violet: "#5B21B6",
    green: "#166534",
    amber: "#92400E",
  },
  goalFill: {
    blue: "#60A5FA",
    violet: "#A78BFA",
    green: "#4ADE80",
    amber: "#FBBF24",
  },
};

/**
 * Current theme colours.
 *
 * Reads the OS scheme today, so a device in dark mode already gets a sensible
 * dark surface. When an explicit in-app toggle lands, this becomes the single
 * place to read the stored preference from — the screens keep working
 * unchanged because none of them name a colour themselves.
 */
export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === "dark" ? DARK : LIGHT;
}
