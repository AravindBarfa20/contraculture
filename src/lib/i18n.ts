import en from "../../i18n/en.json";
import ja from "../../i18n/ja.json";
import de from "../../i18n/de.json";
import ptBR from "../../i18n/pt-BR.json";
import fr from "../../i18n/fr.json";
import es from "../../i18n/es.json";

const messages: Record<string, Record<string, string>> = {
  en,
  ja,
  de,
  "pt-BR": ptBR,
  fr,
  es,
};

export function setLocale(locale: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("contraculture-locale", locale);
  }
}

export function getLocale(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("contraculture-locale") || "en";
  }
  return "en";
}

export function t(key: string, locale?: string): string {
  const l = locale || "en";
  return messages[l]?.[key] || messages["en"]?.[key] || key;
}

export function getMessages(locale: string): Record<string, string> {
  return messages[locale] || messages["en"];
}

export function getSupportedLocales(): string[] {
  return Object.keys(messages);
}
