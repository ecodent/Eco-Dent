"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { translations, type Lang, type TKey } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ro");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ecodent.lang");
      if (saved === "ro" || saved === "ru") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("ecodent.lang", l);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
      document.cookie = `ecodent.lang=${l}; path=/; max-age=31536000; SameSite=Lax`;
    }
  };

  const t = (key: TKey): string => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}

export function T({ k }: { k: TKey }) {
  const { t } = useT();
  return <>{t(k)}</>;
}
