"use client";

import { SUPPORTED_LOCALES } from "@/lib/constants";

interface LocaleSwitcherProps {
  current: string;
  onChange: (locale: string) => void;
}

export function LocaleSwitcher({ current, onChange }: LocaleSwitcherProps) {
  const allLocales = [
    { code: "en", name: "English", flag: "🇺🇸" },
    ...SUPPORTED_LOCALES,
  ];

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-muted-foreground mr-1">🌐</span>
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border rounded px-2 py-1 bg-background cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Select language"
      >
        {allLocales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.flag} {locale.name}
          </option>
        ))}
      </select>
    </div>
  );
}
