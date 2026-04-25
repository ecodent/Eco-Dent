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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <label style={{ ...labelStyle, margin: 0 }}>{label}</label>
        <span style={{
          fontSize: "11px",
          fontWeight: 500,
          color: saved ? "#059669" : saving ? "#0168FF" : "transparent",
          transition: "color 0.2s",
          minWidth: "60px",
          textAlign: "right",
        }}>
          {saved ? "✓ Salvat" : saving ? "Salvează..." : "·"}
        </span>
      </div>
      {hint && (
        <p style={{ fontSize: "11px", color: "#878C96", marginBottom: "6px", marginTop: "-2px" }}>
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
  const [loading, setLoading] = useState(true);
  const [globalSaving, setGlobalSaving] = useState(false);
  const [globalSaved, setGlobalSaved] = useState(false);
  const [fieldStatus, setFieldStatus] = useState<Record<string, "idle" | "saving" | "saved">>({});
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
    setTimeout(() => setFieldStatus((prev) => ({ ...prev, [key]: "idle" })), 2000);
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
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingBottom: "80px",
        }}
      >
        {/* Hero Title */}
        <Section title="Hero — Titlu & Conținut" icon={<IconImage />}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
              key={row.v}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "12px",
              }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <Field
              label="Kicker (text mic albastru)"
              value={settings.svcKicker}
              onChange={set("svcKicker")}
              {...fs("svcKicker")}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
              key={row.v}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "12px",
              }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
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
          {globalSaved ? "Salvat!" : globalSaving ? "Se salvează..." : "Salvează tot"}
        </button>
      </div>
    </div>
  );
}
