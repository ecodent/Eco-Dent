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

export function LanguageProvider({
  children,
  initialLang = "ro",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Sync with URL lang prefix on client mount (handles any mismatch)
  useEffect(() => {
    const pathLang = window.location.pathname.match(/^\/(ro|ru)(\/|$)/)?.[1];
    if (pathLang === "ro" || pathLang === "ru") setLangState(pathLang);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
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
