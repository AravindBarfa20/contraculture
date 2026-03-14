export interface HofstedeScores {
  power_distance: number;
  individualism: number;
  masculinity: number;
  uncertainty_avoidance: number;
  long_term_orientation: number;
  indulgence: number;
}

export const HOFSTEDE_DATA: Record<string, HofstedeScores> = {
  en: {
    power_distance: 40,
    individualism: 91,
    masculinity: 62,
    uncertainty_avoidance: 46,
    long_term_orientation: 26,
    indulgence: 68,
  },
  ja: {
    power_distance: 54,
    individualism: 46,
    masculinity: 95,
    uncertainty_avoidance: 92,
    long_term_orientation: 88,
    indulgence: 42,
  },
  de: {
    power_distance: 35,
    individualism: 67,
    masculinity: 66,
    uncertainty_avoidance: 65,
    long_term_orientation: 83,
    indulgence: 40,
  },
  "pt-BR": {
    power_distance: 69,
    individualism: 38,
    masculinity: 49,
    uncertainty_avoidance: 76,
    long_term_orientation: 44,
    indulgence: 59,
  },
  fr: {
    power_distance: 68,
    individualism: 71,
    masculinity: 43,
    uncertainty_avoidance: 86,
    long_term_orientation: 63,
    indulgence: 48,
  },
  es: {
    power_distance: 57,
    individualism: 51,
    masculinity: 42,
    uncertainty_avoidance: 86,
    long_term_orientation: 48,
    indulgence: 44,
  },
};

export const HOFSTEDE_DIMENSIONS = [
  { key: "power_distance", label: "Power Distance", shortLabel: "PDI" },
  { key: "individualism", label: "Individualism", shortLabel: "IDV" },
  { key: "masculinity", label: "Masculinity", shortLabel: "MAS" },
  { key: "uncertainty_avoidance", label: "Uncertainty Avoidance", shortLabel: "UAI" },
  { key: "long_term_orientation", label: "Long-Term Orientation", shortLabel: "LTO" },
  { key: "indulgence", label: "Indulgence", shortLabel: "IVR" },
] as const;

export function getHofstedeGap(
  source: string,
  target: string
): Record<string, number> {
  const s = HOFSTEDE_DATA[source];
  const t = HOFSTEDE_DATA[target];
  if (!s || !t) return {};

  const gap: Record<string, number> = {};
  for (const dim of HOFSTEDE_DIMENSIONS) {
    gap[dim.key] = t[dim.key as keyof HofstedeScores] - s[dim.key as keyof HofstedeScores];
  }
  return gap;
}
