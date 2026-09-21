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
export type ThemeColors = {
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
};

const LIGHT: ThemeColors = {
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
};

const DARK: ThemeColors = {
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
