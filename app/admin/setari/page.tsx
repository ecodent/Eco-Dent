"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  authHeaders,
  cardStyle,
  inputStyle,
  btnPrimary,
  labelStyle,
} from "../lib";
import {
  IconSave,
  IconImage,
  IconBarChart,
  IconBriefcase,
  IconUsers,
  IconCompare,
  IconMessageSquare,
  IconFileText,
  IconMapPin,
} from "../icons";

interface Settings {
  heroTitle: string;
  heroTitleItalic: string;
  heroTitle2: string;
  heroTitle3: string;
  heroDescription: string;
  heroCta: string;
  heroPhone: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  servicesTitle: string;
  servicesTitleItalic: string;
  servicesDescription: string;
  servicesCta: string;
  teamTitle: string;
  teamTitleItalic: string;
  teamDescription: string;
  baTitle: string;
  baTitleItalic: string;
  baDescription: string;
  baCta: string;
  reviewsTitle: string;
  reviewsTitleItalic: string;
  reviewsDescription: string;
  svcKicker: string;
  svcHeading: string;
  svcHeadingItalic: string;
  svcDescription: string;
  svcStat1Value: string;
  svcStat1Label: string;
  svcStat2Value: string;
  svcStat2Label: string;
  svcStat3Value: string;
  svcStat3Label: string;
  svcStat4Value: string;
  svcStat4Label: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
  // RU variants
  heroTitle_ru: string;
  heroTitleItalic_ru: string;
  heroTitle2_ru: string;
  heroTitle3_ru: string;
  heroDescription_ru: string;
  heroCta_ru: string;
  stat1Label_ru: string;
  stat2Label_ru: string;
  stat3Label_ru: string;
  servicesTitle_ru: string;
  servicesTitleItalic_ru: string;
  servicesDescription_ru: string;
  servicesCta_ru: string;
  teamTitle_ru: string;
  teamTitleItalic_ru: string;
  teamDescription_ru: string;
  baTitle_ru: string;
  baTitleItalic_ru: string;
  baDescription_ru: string;
  baCta_ru: string;
  reviewsTitle_ru: string;
  reviewsTitleItalic_ru: string;
  reviewsDescription_ru: string;
  svcKicker_ru: string;
  svcHeading_ru: string;
  svcHeadingItalic_ru: string;
  svcDescription_ru: string;
  svcStat1Label_ru: string;
  svcStat2Label_ru: string;
  svcStat3Label_ru: string;
  svcStat4Label_ru: string;
  contactAddress_ru: string;
  contactHours_ru: string;
}

const DEFAULTS: Settings = {
  heroTitle: "Îngrijire Dentară",
  heroTitleItalic: "Avansată",
  heroTitle2: "în care",
  heroTitle3: "Poți Avea Încredere.",
  heroDescription:
    "Diagnostic digital, proceduri minim invazive și rezultate predictibile la fiecare etapă a tratamentului.",
  heroCta: "Programează o Consultație",
  heroPhone: "+373 69 100 200",
  stat1Value: "100%",
  stat1Label: "Diagnostic Digital & Radiologie",
  stat2Value: "5K+",
  stat2Label: "Pacienți Tratați cu Grijă",
  stat3Value: "10+",
  stat3Label: "Ani Experiență Clinică",
  servicesTitle: "Serviciile",
  servicesTitleItalic: "Noastre.",
  servicesDescription:
    "Combinăm experiența clinică, tehnologia modernă și o abordare atentă pentru a oferi rezultate de încredere în stomatologia preventivă, restaurativă și estetică.",
  servicesCta: "Află Mai Multe",
  teamTitle: "Echipa Noastră",
  teamTitleItalic: "Medicală.",
  teamDescription:
    "O echipă de medici stomatologi experimentați, concentrați pe tratament precis și rezultate de durată.",
  baTitle: "Înainte &",
  baTitleItalic: "După.",
  baDescription:
    "Fiecare caz reflectă o abordare atent planificată, concentrată pe sănătatea dentară pe termen lung și estetică.",
  baCta: "Programează o vizită",
  reviewsTitle: "Recenzii",
  reviewsTitleItalic: "Pacienți.",
  reviewsDescription:
    "Experiențe ale persoanelor care au finalizat tratamentul cu echipa noastră. Comunicare clară, lucru atent și rezultate care arată natural în viața de zi cu zi.",
  svcKicker: "Serviciile Noastre",
  svcHeading: "Totul pentru",
  svcHeadingItalic: "zâmbetul tău.",
  svcDescription:
    "De la prevenție la implantologie avansată — o gamă completă de servicii stomatologice cu echipamente moderne.",
  svcStat1Value: "6+",
  svcStat1Label: "Specialități",
  svcStat2Value: "5K+",
  svcStat2Label: "Pacienți tratați",
  svcStat3Value: "10+",
  svcStat3Label: "Ani experiență",
  svcStat4Value: "100%",
  svcStat4Label: "Diagnostic digital",
  contactAddress: "Str. Grigore Vieru 11,\nȘtefan Vodă, Moldova",
  contactPhone: "+373 69 100 200",
  contactEmail: "ecodentclinic@gmail.com",
  contactHours: "Luni – Vineri: 09:00 – 19:00\nSâmbătă: 09:00 – 14:00",
  // RU
  heroTitle_ru: "Современная",
  heroTitleItalic_ru: "Стоматология",
  heroTitle2_ru: "которой Вы",
  heroTitle3_ru: "Можете Доверять.",
  heroDescription_ru:
    "Цифровая диагностика, малоинвазивные процедуры и предсказуемые результаты на каждом этапе лечения.",
  heroCta_ru: "Записаться на консультацию",
  stat1Label_ru: "Цифровая Диагностика & Рентген",
  stat2Label_ru: "Пациентов с Заботой",
  stat3Label_ru: "Лет Клинического Опыта",
  servicesTitle_ru: "Наши",
  servicesTitleItalic_ru: "Услуги.",
  servicesDescription_ru:
    "Сочетаем клинический опыт, современные технологии и внимательный подход для надёжных результатов в профилактической, восстановительной и эстетической стоматологии.",
  servicesCta_ru: "Подробнее",
  teamTitle_ru: "Наша медицинская",
  teamTitleItalic_ru: "Команда.",
  teamDescription_ru:
    "Команда опытных стоматологов, ориентированных на точное лечение и долгосрочные результаты.",
  baTitle_ru: "До и",
  baTitleItalic_ru: "После.",
  baDescription_ru:
    "Каждый случай отражает тщательно спланированный подход, ориентированный на долгосрочное здоровье зубов и эстетику.",
  baCta_ru: "Записаться на приём",
  reviewsTitle_ru: "Отзывы",
  reviewsTitleItalic_ru: "Пациентов.",
  reviewsDescription_ru:
    "Опыт людей, прошедших лечение в нашей клинике. Чёткая коммуникация, аккуратная работа и результаты, естественно выглядящие в повседневной жизни.",
  svcKicker_ru: "Наши Услуги",
  svcHeading_ru: "Всё для",
  svcHeadingItalic_ru: "вашей улыбки.",
  svcDescription_ru:
    "От профилактики до современной имплантологии — полный спектр стоматологических услуг с современным оборудованием.",
  svcStat1Label_ru: "Специализаций",
  svcStat2Label_ru: "Пациентов пролечено",
  svcStat3Label_ru: "Лет опыта",
  svcStat4Label_ru: "Цифровая диагностика",
  contactAddress_ru: "ул. Григоре Виеру 11,\nШтефан Водэ, Молдова",
  contactHours_ru:
    "Понедельник – Пятница: 09:00 – 19:00\nСуббота: 09:00 – 14:00",
};

function Field({
  label,
  hint,
  multiline,
  value,
  onChange,
  onBlur,
  saving,
  saved,
}: {
  label: string;
  hint?: string;
  multiline?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  saving?: boolean;
  saved?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <label style={{ ...labelStyle, margin: 0 }}>{label}</label>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: saved ? "#059669" : saving ? "#0168FF" : "transparent",
            transition: "color 0.2s",
            minWidth: "60px",
            textAlign: "right",
          }}
        >
          {saved ? "✓ Salvat" : saving ? "Salvează..." : "·"}
        </span>
      </div>
      {hint && (
        <p
          style={{
            fontSize: "11px",
            color: "#878C96",
            marginBottom: "6px",
            marginTop: "-2px",
          }}
        >
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <input
          style={inputStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )}
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={cardStyle}>
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#0F1A2D",
          margin: "0 0 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {icon && (
          <span style={{ color: "#0168FF", display: "flex" }}>{icon}</span>
        )}
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {children}
      </div>
    </div>
  );
}

export default function SetariPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [lang, setLang] = useState<"ro" | "ru">("ro");
  const [loading, setLoading] = useState(true);
  const [globalSaving, setGlobalSaving] = useState(false);
  const [globalSaved, setGlobalSaved] = useState(false);
  const [fieldStatus, setFieldStatus] = useState<
    Record<string, "idle" | "saving" | "saved">
  >({});
  const settingsRef = useRef<Settings>(DEFAULTS);

  const load = useCallback(async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    const merged = { ...DEFAULTS, ...data };
    setSettings(merged);
    settingsRef.current = merged;
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = (key: keyof Settings) => (value: string) => {
    const next = { ...settingsRef.current, [key]: value };
    settingsRef.current = next;
    setSettings(next);
  };

  const saveField = useCallback(async (key: keyof Settings) => {
    setFieldStatus((prev) => ({ ...prev, [key]: "saving" }));
    await fetch("/api/settings", {
      method: "PUT",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(settingsRef.current),
    });
    setFieldStatus((prev) => ({ ...prev, [key]: "saved" }));
    setTimeout(
      () => setFieldStatus((prev) => ({ ...prev, [key]: "idle" })),
      2000,
    );
  }, []);

  const handleSaveAll = async () => {
    setGlobalSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(settingsRef.current),
    });
    setGlobalSaving(false);
    setGlobalSaved(true);
    setTimeout(() => setGlobalSaved(false), 2500);
  };

  const fs = (key: keyof Settings) => ({
    saving: fieldStatus[key] === "saving",
    saved: fieldStatus[key] === "saved",
    onBlur: () => saveField(key),
  });

  if (loading) {
    return (
      <div style={{ color: "#878C96", padding: "40px 0" }}>Se încarcă...</div>
    );
  }

  return (
    <div>
      <style>{`
        .s-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .s-grid-stat { display: grid; grid-template-columns: 140px 1fr; gap: 12px; }
        @media (max-width: 560px) {
          .s-grid-2 { grid-template-columns: 1fr; }
          .s-grid-stat { grid-template-columns: 1fr; }
        }
      `}</style>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#0F1A2D",
              margin: 0,
            }}
          >
            Texte Site
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginTop: "4px" }}>
            Toate textele afișate pe site, editabile din admin
          </p>
        </div>
      </div>

      {/* Language Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        {(["ro", "ru"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "8px 20px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: lang === l ? "#0F1A2D" : "#E5E7EB",
              color: lang === l ? "#FFF" : "#878C96",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {l === "ro" ? "🇷🇴 Română" : "🇷🇺 Русский"}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingBottom: "80px",
        }}
      >
        {lang === "ro" && <>
        {/* Hero Title */}
        <Section title="Hero — Titlu & Conținut" icon={<IconImage />}>
          <div className="s-grid-2"
          >
            <Field
              label="Rând 1 (normal)"
              value={settings.heroTitle}
              onChange={set("heroTitle")}
              {...fs("heroTitle")}
            />
            <Field
              label="Rând 1 italic bold"
              value={settings.heroTitleItalic}
              onChange={set("heroTitleItalic")}
              {...fs("heroTitleItalic")}
            />
            <Field
              label="Rând 2 (normal)"
              value={settings.heroTitle2}
              onChange={set("heroTitle2")}
              {...fs("heroTitle2")}
            />
            <Field
              label="Rând 3 (normal)"
              value={settings.heroTitle3}
              onChange={set("heroTitle3")}
              {...fs("heroTitle3")}
            />
          </div>
          <Field
            label="Paragraf descriere"
            multiline
            value={settings.heroDescription}
            onChange={set("heroDescription")}
            {...fs("heroDescription")}
          />
          <div className="s-grid-2"
          >
            <Field
              label="Text buton principal"
              value={settings.heroCta}
              onChange={set("heroCta")}
              {...fs("heroCta")}
            />
            <Field
              label="Număr telefon (hero)"
              value={settings.heroPhone}
              onChange={set("heroPhone")}
              {...fs("heroPhone")}
            />
          </div>
        </Section>

        {/* Stats */}
        <Section
          title="Statistici Hero (carduri peste imagine)"
          icon={<IconBarChart />}
        >
          {(
            [
              { v: "stat1Value", l: "stat1Label", n: "1" },
              { v: "stat2Value", l: "stat2Label", n: "2" },
              { v: "stat3Value", l: "stat3Label", n: "3" },
            ] as const
          ).map((row) => (
            <div
              key={row.v} className="s-grid-stat"
            >
              <Field
                label={`Valoare ${row.n}`}
                value={settings[row.v]}
                onChange={set(row.v)}
                {...fs(row.v)}
              />
              <Field
                label={`Etichetă ${row.n}`}
                value={settings[row.l]}
                onChange={set(row.l)}
                {...fs(row.l)}
              />
            </div>
          ))}
        </Section>

        {/* Services section (home) */}
        <Section
          title="Pagina principală — Secțiunea Servicii"
          icon={<IconBriefcase />}
        >
          <div className="s-grid-2"
          >
            <Field
              label="Titlu (normal)"
              value={settings.servicesTitle}
              onChange={set("servicesTitle")}
              {...fs("servicesTitle")}
            />
            <Field
              label="Titlu italic"
              value={settings.servicesTitleItalic}
              onChange={set("servicesTitleItalic")}
              {...fs("servicesTitleItalic")}
            />
          </div>
          <Field
            label="Descriere"
            multiline
            value={settings.servicesDescription}
            onChange={set("servicesDescription")}
            {...fs("servicesDescription")}
          />
          <div className="s-grid-2"
          >
            <Field
              label="Text buton"
              value={settings.servicesCta}
              onChange={set("servicesCta")}
              {...fs("servicesCta")}
            />
          </div>
        </Section>

        {/* Team */}
        <Section
          title="Pagina principală — Secțiunea Echipă"
          icon={<IconUsers />}
        >
          <div className="s-grid-2"
          >
            <Field
              label="Titlu (normal)"
              value={settings.teamTitle}
              onChange={set("teamTitle")}
              {...fs("teamTitle")}
            />
            <Field
              label="Titlu italic"
              value={settings.teamTitleItalic}
              onChange={set("teamTitleItalic")}
              {...fs("teamTitleItalic")}
            />
          </div>
          <Field
            label="Descriere"
            multiline
            value={settings.teamDescription}
            onChange={set("teamDescription")}
            {...fs("teamDescription")}
          />
        </Section>

        {/* Before & After */}
        <Section
          title="Pagina principală — Secțiunea Înainte & După"
          icon={<IconCompare />}
        >
          <div className="s-grid-2"
          >
            <Field
              label="Titlu (normal)"
              value={settings.baTitle}
              onChange={set("baTitle")}
              {...fs("baTitle")}
            />
            <Field
              label="Titlu italic"
              value={settings.baTitleItalic}
              onChange={set("baTitleItalic")}
              {...fs("baTitleItalic")}
            />
          </div>
          <Field
            label="Descriere"
            multiline
            value={settings.baDescription}
            onChange={set("baDescription")}
            {...fs("baDescription")}
          />
          <div className="s-grid-2"
          >
            <Field
              label="Text buton"
              value={settings.baCta}
              onChange={set("baCta")}
              {...fs("baCta")}
            />
          </div>
        </Section>

        {/* Reviews */}
        <Section
          title="Pagina principală — Secțiunea Recenzii"
          icon={<IconMessageSquare />}
        >
          <div className="s-grid-2"
          >
            <Field
              label="Titlu (normal)"
              value={settings.reviewsTitle}
              onChange={set("reviewsTitle")}
              {...fs("reviewsTitle")}
            />
            <Field
              label="Titlu italic"
              value={settings.reviewsTitleItalic}
              onChange={set("reviewsTitleItalic")}
              {...fs("reviewsTitleItalic")}
            />
          </div>
          <Field
            label="Descriere"
            multiline
            value={settings.reviewsDescription}
            onChange={set("reviewsDescription")}
            {...fs("reviewsDescription")}
          />
        </Section>

        {/* /services page */}
        <Section title="Pagina /services — Hero" icon={<IconFileText />}>
          <div className="s-grid-2"
          >
            <Field
              label="Kicker (text mic albastru)"
              value={settings.svcKicker}
              onChange={set("svcKicker")}
              {...fs("svcKicker")}
            />
          </div>
          <div className="s-grid-2"
          >
            <Field
              label="Titlu (normal)"
              value={settings.svcHeading}
              onChange={set("svcHeading")}
              {...fs("svcHeading")}
            />
            <Field
              label="Titlu italic bold"
              value={settings.svcHeadingItalic}
              onChange={set("svcHeadingItalic")}
              {...fs("svcHeadingItalic")}
            />
          </div>
          <Field
            label="Descriere"
            multiline
            value={settings.svcDescription}
            onChange={set("svcDescription")}
            {...fs("svcDescription")}
          />
        </Section>

        <Section
          title="Pagina /services — Statistici (4 carduri)"
          icon={<IconBarChart />}
        >
          {(
            [
              { v: "svcStat1Value", l: "svcStat1Label", n: "1" },
              { v: "svcStat2Value", l: "svcStat2Label", n: "2" },
              { v: "svcStat3Value", l: "svcStat3Label", n: "3" },
              { v: "svcStat4Value", l: "svcStat4Label", n: "4" },
            ] as const
          ).map((row) => (
            <div
              key={row.v} className="s-grid-stat"
            >
              <Field
                label={`Valoare ${row.n}`}
                value={settings[row.v]}
                onChange={set(row.v)}
                {...fs(row.v)}
              />
              <Field
                label={`Etichetă ${row.n}`}
                value={settings[row.l]}
                onChange={set(row.l)}
                {...fs(row.l)}
              />
            </div>
          ))}
        </Section>

        {/* Contact */}
        <Section title="Contact" icon={<IconMapPin />}>
          <div className="s-grid-2"
          >
            <Field
              label="Telefon"
              value={settings.contactPhone}
              onChange={set("contactPhone")}
              {...fs("contactPhone")}
            />
            <Field
              label="Email"
              value={settings.contactEmail}
              onChange={set("contactEmail")}
              {...fs("contactEmail")}
            />
          </div>
          <Field
            label="Adresă"
            multiline
            hint="Fiecare rând nou = rând nou pe site"
            value={settings.contactAddress}
            onChange={set("contactAddress")}
            {...fs("contactAddress")}
          />
          <Field
            label="Program de lucru"
            multiline
            hint="Fiecare rând nou = rând nou pe site"
            value={settings.contactHours}
            onChange={set("contactHours")}
            {...fs("contactHours")}
          />
        </Section>
        </>
        }

        {lang === "ru" && <>
          <Section title="Hero — Заголовок & Содержание" icon={<IconImage />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="Строка 1 (обычная)" value={settings.heroTitle_ru} onChange={set("heroTitle_ru")} {...fs("heroTitle_ru")} />
              <Field label="Строка 1 курсив" value={settings.heroTitleItalic_ru} onChange={set("heroTitleItalic_ru")} {...fs("heroTitleItalic_ru")} />
              <Field label="Строка 2" value={settings.heroTitle2_ru} onChange={set("heroTitle2_ru")} {...fs("heroTitle2_ru")} />
              <Field label="Строка 3" value={settings.heroTitle3_ru} onChange={set("heroTitle3_ru")} {...fs("heroTitle3_ru")} />
            </div>
            <Field label="Описание" multiline value={settings.heroDescription_ru} onChange={set("heroDescription_ru")} {...fs("heroDescription_ru")} />
            <Field label="Текст кнопки" value={settings.heroCta_ru} onChange={set("heroCta_ru")} {...fs("heroCta_ru")} />
          </Section>

          <Section title="Статистика Hero (карточки)" icon={<IconBarChart />}>
            {([
              { v: "stat1Value" as const, l: "stat1Label_ru" as const, n: "1" },
              { v: "stat2Value" as const, l: "stat2Label_ru" as const, n: "2" },
              { v: "stat3Value" as const, l: "stat3Label_ru" as const, n: "3" },
            ]).map((row) => (
              <div key={row.n} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "12px" }}>
                <Field label={`Значение ${row.n}`} value={settings[row.v]} onChange={set(row.v)} {...fs(row.v)} />
                <Field label={`Подпись ${row.n}`} value={settings[row.l]} onChange={set(row.l)} {...fs(row.l)} />
              </div>
            ))}
          </Section>

          <Section title="Главная — Секция Услуги" icon={<IconBriefcase />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="Заголовок" value={settings.servicesTitle_ru} onChange={set("servicesTitle_ru")} {...fs("servicesTitle_ru")} />
              <Field label="Заголовок курсив" value={settings.servicesTitleItalic_ru} onChange={set("servicesTitleItalic_ru")} {...fs("servicesTitleItalic_ru")} />
            </div>
            <Field label="Описание" multiline value={settings.servicesDescription_ru} onChange={set("servicesDescription_ru")} {...fs("servicesDescription_ru")} />
            <Field label="Текст кнопки" value={settings.servicesCta_ru} onChange={set("servicesCta_ru")} {...fs("servicesCta_ru")} />
          </Section>

          <Section title="Главная — Секция Команда" icon={<IconUsers />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="Заголовок" value={settings.teamTitle_ru} onChange={set("teamTitle_ru")} {...fs("teamTitle_ru")} />
              <Field label="Заголовок курсив" value={settings.teamTitleItalic_ru} onChange={set("teamTitleItalic_ru")} {...fs("teamTitleItalic_ru")} />
            </div>
            <Field label="Описание" multiline value={settings.teamDescription_ru} onChange={set("teamDescription_ru")} {...fs("teamDescription_ru")} />
          </Section>

          <Section title="Главная — До и После" icon={<IconCompare />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="Заголовок" value={settings.baTitle_ru} onChange={set("baTitle_ru")} {...fs("baTitle_ru")} />
              <Field label="Заголовок курсив" value={settings.baTitleItalic_ru} onChange={set("baTitleItalic_ru")} {...fs("baTitleItalic_ru")} />
            </div>
            <Field label="Описание" multiline value={settings.baDescription_ru} onChange={set("baDescription_ru")} {...fs("baDescription_ru")} />
            <Field label="Текст кнопки" value={settings.baCta_ru} onChange={set("baCta_ru")} {...fs("baCta_ru")} />
          </Section>

          <Section title="Главная — Отзывы" icon={<IconMessageSquare />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="Заголовок" value={settings.reviewsTitle_ru} onChange={set("reviewsTitle_ru")} {...fs("reviewsTitle_ru")} />
              <Field label="Заголовок курсив" value={settings.reviewsTitleItalic_ru} onChange={set("reviewsTitleItalic_ru")} {...fs("reviewsTitleItalic_ru")} />
            </div>
            <Field label="Описание" multiline value={settings.reviewsDescription_ru} onChange={set("reviewsDescription_ru")} {...fs("reviewsDescription_ru")} />
          </Section>

          <Section title="Страница /services — Hero" icon={<IconFileText />}>
            <Field label="Kicker" value={settings.svcKicker_ru} onChange={set("svcKicker_ru")} {...fs("svcKicker_ru")} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="Заголовок" value={settings.svcHeading_ru} onChange={set("svcHeading_ru")} {...fs("svcHeading_ru")} />
              <Field label="Заголовок курсив" value={settings.svcHeadingItalic_ru} onChange={set("svcHeadingItalic_ru")} {...fs("svcHeadingItalic_ru")} />
            </div>
            <Field label="Описание" multiline value={settings.svcDescription_ru} onChange={set("svcDescription_ru")} {...fs("svcDescription_ru")} />
          </Section>

          <Section title="Страница /services — Статистика" icon={<IconBarChart />}>
            {([
              { v: "svcStat1Value" as const, l: "svcStat1Label_ru" as const, n: "1" },
              { v: "svcStat2Value" as const, l: "svcStat2Label_ru" as const, n: "2" },
              { v: "svcStat3Value" as const, l: "svcStat3Label_ru" as const, n: "3" },
              { v: "svcStat4Value" as const, l: "svcStat4Label_ru" as const, n: "4" },
            ]).map((row) => (
              <div key={row.n} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "12px" }}>
                <Field label={`Значение ${row.n}`} value={settings[row.v]} onChange={set(row.v)} {...fs(row.v)} />
                <Field label={`Подпись ${row.n}`} value={settings[row.l]} onChange={set(row.l)} {...fs(row.l)} />
              </div>
            ))}
          </Section>

          <Section title="Контакты" icon={<IconMapPin />}>
            <Field
              label="Адрес"
              multiline
              hint="Каждая строка = новая строка на сайте"
              value={settings.contactAddress_ru}
              onChange={set("contactAddress_ru")}
              {...fs("contactAddress_ru")}
            />
            <Field
              label="График работы"
              multiline
              hint="Каждая строка = новая строка на сайте"
              value={settings.contactHours_ru}
              onChange={set("contactHours_ru")}
              {...fs("contactHours_ru")}
            />
          </Section>
        </>
        }
      </div>

      {/* Sticky save bar */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(240,242,245,0.95)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid #E2E6EA",
          padding: "14px 0",
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        {globalSaved && (
          <span style={{ fontSize: "13px", color: "#059669", fontWeight: 500 }}>
            ✓ Salvat cu succes!
          </span>
        )}
        <button
          onClick={handleSaveAll}
          disabled={globalSaving}
          style={{
            ...btnPrimary,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: globalSaving ? 0.7 : 1,
            backgroundColor: globalSaved ? "#059669" : undefined,
            transition: "background-color 0.3s",
            minWidth: "140px",
            justifyContent: "center",
          }}
        >
          <IconSave />
          {globalSaved
            ? "Salvat!"
            : globalSaving
              ? "Se salvează..."
              : "Salvează tot"}
        </button>
      </div>
    </div>
  );
}
