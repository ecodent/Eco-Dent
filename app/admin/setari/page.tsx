"use client";

import { useState, useEffect, useCallback } from "react";
import { authHeaders, cardStyle, inputStyle, btnPrimary, labelStyle } from "../lib";
import { IconSave } from "../icons";

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
}: {
  label: string;
  hint?: string;
  multiline?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {hint && (
        <p style={{ fontSize: "11px", color: "#878C96", marginBottom: "6px", marginTop: "2px" }}>
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F1A2D", margin: "0 0 20px" }}>
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
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings({ ...DEFAULTS, ...data });
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = (key: keyof Settings) => (value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return <div style={{ color: "#878C96", padding: "40px 0" }}>Se încarcă...</div>;
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
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#0F1A2D", margin: 0 }}>
            Setări Conținut
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginTop: "4px" }}>
            Textele principale afișate pe site
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            ...btnPrimary,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: saving ? 0.7 : 1,
            backgroundColor: saved ? "#059669" : undefined,
          }}
        >
          <IconSave />
          {saved ? "Salvat!" : saving ? "Se salvează..." : "Salvează"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Hero Title */}
        <Section title="🎯 Hero — Titlu">
          <p style={{ fontSize: "12px", color: "#878C96", margin: 0 }}>
            Titlul apare ca:{" "}
            <em>
              &ldquo;{settings.heroTitle}{" "}
              <strong>{settings.heroTitleItalic}</strong> {settings.heroTitle2}
              <br />
              {settings.heroTitle3}&rdquo;
            </em>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Rând 1 (normal)" value={settings.heroTitle} onChange={set("heroTitle")} />
            <Field
              label="Rând 1 italic bold"
              value={settings.heroTitleItalic}
              onChange={set("heroTitleItalic")}
            />
            <Field label="Rând 2 (normal)" value={settings.heroTitle2} onChange={set("heroTitle2")} />
            <Field label="Rând 3 (normal)" value={settings.heroTitle3} onChange={set("heroTitle3")} />
          </div>
        </Section>

        {/* Hero Content */}
        <Section title="📝 Hero — Descriere & CTA">
          <Field
            label="Paragraf descriere"
            multiline
            value={settings.heroDescription}
            onChange={set("heroDescription")}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field
              label="Text buton principal"
              value={settings.heroCta}
              onChange={set("heroCta")}
            />
            <Field
              label="Număr telefon (hero)"
              value={settings.heroPhone}
              onChange={set("heroPhone")}
            />
          </div>
        </Section>

        {/* Stats */}
        <Section title="📊 Statistici Hero">
          <p style={{ fontSize: "12px", color: "#878C96", margin: 0 }}>
            Cele 3 carduri afișate peste imaginea hero.
          </p>
          {(
            [
              { v: "stat1Value", l: "stat1Label", vLabel: "Valoare 1", lLabel: "Eticheta 1" },
              { v: "stat2Value", l: "stat2Label", vLabel: "Valoare 2", lLabel: "Eticheta 2" },
              { v: "stat3Value", l: "stat3Label", vLabel: "Valoare 3", lLabel: "Eticheta 3" },
            ] as const
          ).map((row) => (
            <div
              key={row.v}
              style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "12px" }}
            >
              <Field
                label={row.vLabel}
                value={settings[row.v]}
                onChange={set(row.v)}
              />
              <Field
                label={row.lLabel}
                value={settings[row.l]}
                onChange={set(row.l)}
              />
            </div>
          ))}
        </Section>

        {/* Contact */}
        <Section title="📍 Contact">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Telefon" value={settings.contactPhone} onChange={set("contactPhone")} />
            <Field label="Email" value={settings.contactEmail} onChange={set("contactEmail")} />
          </div>
          <Field
            label="Adresă"
            multiline
            hint="Fiecare rând nou = rând nou pe site"
            value={settings.contactAddress}
            onChange={set("contactAddress")}
          />
          <Field
            label="Program de lucru"
            multiline
            hint="Fiecare rând nou = rând nou pe site"
            value={settings.contactHours}
            onChange={set("contactHours")}
          />
        </Section>
      </div>
    </div>
  );
}
