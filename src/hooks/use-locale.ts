"use client";

import { useState, useEffect } from "react";
import { getLocale, setLocale as persistLocale } from "@/lib/i18n";

export function useLocale() {
  const [locale, setLocaleState] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getLocale());
    setMounted(true);
  }, []);

  const setLocale = (newLocale: string) => {
    persistLocale(newLocale);
    setLocaleState(newLocale);
  };

  return { locale, setLocale, mounted };
}
