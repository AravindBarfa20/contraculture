import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function getCountryName(locale: string): string {
  const map: Record<string, string> = {
    en: "United States",
    ja: "Japan",
    de: "Germany",
    "pt-BR": "Brazil",
    fr: "France",
    es: "Spain",
  };
  return map[locale] || locale;
}

export function getFlag(locale: string): string {
  const map: Record<string, string> = {
    en: "🇺🇸",
    ja: "🇯🇵",
    de: "🇩🇪",
    "pt-BR": "🇧🇷",
    fr: "🇫🇷",
    es: "🇪🇸",
  };
  return map[locale] || "🌐";
}

export function getLocaleName(locale: string): string {
  const map: Record<string, string> = {
    en: "English",
    ja: "Japanese",
    de: "German",
    "pt-BR": "Portuguese (BR)",
    fr: "French",
    es: "Spanish",
  };
  return map[locale] || locale;
}
