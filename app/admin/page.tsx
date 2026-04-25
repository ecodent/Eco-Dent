"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// ─── Icons ───
function IconLogOut() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function IconCamera() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
function IconSave() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0168FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ─── Types ───
interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  image: string;
  order: number;
}
interface ServiceFeature {
  title: string;
  description: string;
}
interface Service {
  _id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imagePosition: string;
  features: ServiceFeature[];
  benefits: string[];
  cardColor: string;
  order: number;
}
interface Review {
  _id?: string;
  name: string;
  image: string;
  grade: number;
  text: string;
  order: number;
}
interface BeforeAfterCase {
  _id?: string;
  before: string;
  after: string;
  label: string;
  order: number;
}
interface HeroImage {
  _id?: string;
  url: string;
  order: number;
}

// ─── Auth Helper ───
function getToken(): string {
  return localStorage.getItem("admin_token") || "";
}

function authHeaders(extra?: Record<string, string>): Record<string, string> {
  return { Authorization: `Bearer ${getToken()}`, ...extra };
}

// ─── Image Upload Helper ───
async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url;
}

// ─── Styles ───
const cardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  marginBottom: "16px",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};
const btnPrimary: React.CSSProperties = {
  backgroundColor: "#0168FF",
  color: "#FFF",
  border: "none",
  borderRadius: "10px",
  padding: "10px 24px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};
const btnDanger: React.CSSProperties = {
  backgroundColor: "#EF4444",
  color: "#FFF",
  border: "none",
  borderRadius: "10px",
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
};
const btnSecondary: React.CSSProperties = {
  backgroundColor: "#F3F4F6",
  color: "#0F1A2D",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  padding: "10px 24px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};
const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "4px",
  display: "block",
};

// ─── Tabs ───
const TABS = [
  "Echipă",
  "Servicii",
  "Recenzii",
  "Before & After",
  "Hero",
] as const;
type Tab = (typeof TABS)[number];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("Echipă");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Eroare la autentificare");
        return;
      }
      localStorage.setItem("admin_token", data.token);
      setIsLoggedIn(true);
    } catch {
      setLoginError("Eroare de conexiune");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: "#FFF",
            borderRadius: "20px",
            padding: "48px 24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            width: "90%",
            maxWidth: "420px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "8px" }}>
            <IconShield />
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#0F1A2D" }}>ECODENT Admin</span>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "#878C96",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Autentificați-vă pentru a accesa panoul de administrare
          </p>
          {loginError && (
            <div
              style={{
                backgroundColor: "#FEE2E2",
                color: "#DC2626",
                padding: "12px 16px",
                borderRadius: "10px",
                fontSize: "14px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {loginError}
            </div>
          )}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Parolă</label>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loginLoading}
            style={{
              ...btnPrimary,
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              opacity: loginLoading ? 0.7 : 1,
            }}
          >
            {loginLoading ? "Se conectează..." : "Conectare"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F3F4F6" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#0F1A2D",
          padding: "20px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <h1 style={{ color: "#FFF", fontSize: "20px", fontWeight: 700 }}>
            ECODENT Admin
          </h1>
          <a
            href="/"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            ← Înapoi la site
          </a>
        </div>
        <button onClick={handleLogout} style={{ ...btnSecondary, display: "flex", alignItems: "center", gap: "8px" }}>
          <IconLogOut /> Deconectare
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "16px 16px 0",
          borderBottom: "1px solid #E5E7EB",
          backgroundColor: "#FFF",
          overflowX: "auto",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              backgroundColor: "transparent",
              color: tab === t ? "#0168FF" : "#878C96",
              borderBottom:
                tab === t ? "2px solid #0168FF" : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 16px", maxWidth: "1100px" }}>
        {tab === "Echipă" && <TeamSection />}
        {tab === "Servicii" && <ServicesSection />}
        {tab === "Recenzii" && <ReviewsSection />}
        {tab === "Before & After" && <BeforeAfterSection />}
        {tab === "Hero" && <HeroSection />}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// TEAM SECTION
// ═══════════════════════════════════════
function TeamSection() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/team");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (item: TeamMember) => {
    if (item._id) {
      await fetch("/api/team", {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(item),
      });
    } else {
      await fetch("/api/team", {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(item),
      });
    }
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi?")) return;
    await fetch(`/api/team?id=${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    load();
  };

  const handleImage = async (file: File, item: TeamMember, index: number) => {
    const url = await uploadImage(file);
    const updated = { ...item, image: url };
    setItems((prev) => prev.map((p, i) => (i === index ? updated : p)));
  };

  if (loading) return <p>Se încarcă...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0F1A2D" }}>
          Echipa Medicală
        </h2>
        <button
          onClick={() =>
            setItems([
              ...items,
              { name: "", role: "", image: "", order: items.length },
            ])
          }
          style={btnPrimary}
        >
          + Adaugă Membru
        </button>
      </div>
      {items.map((item, i) => (
        <div key={item._id || `new-${i}`} style={cardStyle}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              gap: "20px",
              alignItems: "start",
            }}
          >
            <div>
              {item.image && (
                <div
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              )}
              <label
                style={{
                  ...btnSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontSize: "12px",
                  padding: "6px 8px",
                  cursor: "pointer",
                }}
              >
                <IconCamera /> Imagine
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    handleImage(e.target.files[0], item, i)
                  }
                />
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <label style={labelStyle}>Nume</label>
                <input
                  style={inputStyle}
                  value={item.name}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((p, idx) =>
                        idx === i ? { ...p, name: e.target.value } : p,
                      ),
                    )
                  }
                  placeholder="Dr. Nume Prenume"
                />
              </div>
              <div>
                <label style={labelStyle}>Rol</label>
                <input
                  style={inputStyle}
                  value={item.role}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((p, idx) =>
                        idx === i ? { ...p, role: e.target.value } : p,
                      ),
                    )
                  }
                  placeholder="Specialist..."
                />
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <button onClick={() => handleSave(item)} style={{ ...btnPrimary, display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconSave /> Salvează
                </button>
                {item._id && (
                  <button
                    onClick={() => handleDelete(item._id!)}
                    style={{ ...btnDanger, display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <IconTrash /> Șterge
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════
function ServicesSection() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/services");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (item: Service) => {
    if (item._id) {
      await fetch("/api/services", {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(item),
      });
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(item),
      });
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest serviciu?")) return;
    await fetch(`/api/services?id=${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    load();
  };

  const handleImage = async (file: File, index: number) => {
    const url = await uploadImage(file);
    setItems((prev) =>
      prev.map((p, i) => (i === index ? { ...p, image: url } : p)),
    );
  };

  const updateItem = (index: number, updates: Partial<Service>) => {
    setItems((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...updates } : p)),
    );
  };

  const newService = (): Service => ({
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    image: "",
    imagePosition: "center 30%",
    features: [{ title: "", description: "" }],
    benefits: [""],
    cardColor: "#ECEEF1",
    order: items.length,
  });

  if (loading) return <p>Se încarcă...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0F1A2D" }}>
          Servicii
        </h2>
        <button
          onClick={() => {
            setItems([...items, newService()]);
            setEditing(items.length);
          }}
          style={btnPrimary}
        >
          + Adaugă Serviciu
        </button>
      </div>
      {items.map((item, i) => (
        <div key={item._id || `new-${i}`} style={cardStyle}>
          {editing === i ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label style={labelStyle}>Slug (URL)</label>
                  <input
                    style={inputStyle}
                    value={item.slug}
                    onChange={(e) => updateItem(i, { slug: e.target.value })}
                    placeholder="dental-implants"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Titlu</label>
                  <input
                    style={inputStyle}
                    value={item.title}
                    onChange={(e) => updateItem(i, { title: e.target.value })}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Subtitlu</label>
                  <input
                    style={inputStyle}
                    value={item.subtitle}
                    onChange={(e) =>
                      updateItem(i, { subtitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label style={labelStyle}>Culoare Card</label>
                  <input
                    style={inputStyle}
                    value={item.cardColor}
                    onChange={(e) =>
                      updateItem(i, { cardColor: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Descriere</label>
                <textarea
                  style={{
                    ...inputStyle,
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                  value={item.description}
                  onChange={(e) =>
                    updateItem(i, { description: e.target.value })
                  }
                />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {item.image && (
                  <div
                    style={{
                      position: "relative",
                      width: "120px",
                      height: "80px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                )}
                <label style={{ ...btnSecondary, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconCamera /> Imagine serviciu
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      e.target.files?.[0] && handleImage(e.target.files[0], i)
                    }
                  />
                </label>
              </div>

              <div>
                <label style={labelStyle}>Features</label>
                {item.features.map((f, fi) => (
                  <div
                    key={fi}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 40px",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <input
                      style={inputStyle}
                      value={f.title}
                      placeholder="Titlu feature"
                      onChange={(e) => {
                        const features = [...item.features];
                        features[fi] = {
                          ...features[fi],
                          title: e.target.value,
                        };
                        updateItem(i, { features });
                      }}
                    />
                    <input
                      style={inputStyle}
                      value={f.description}
                      placeholder="Descriere"
                      onChange={(e) => {
                        const features = [...item.features];
                        features[fi] = {
                          ...features[fi],
                          description: e.target.value,
                        };
                        updateItem(i, { features });
                      }}
                    />
                    <button
                      onClick={() => {
                        const features = item.features.filter(
                          (_, idx) => idx !== fi,
                        );
                        updateItem(i, { features });
                      }}
                      style={{
                        ...btnDanger,
                        padding: "6px 8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconX />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    updateItem(i, {
                      features: [
                        ...item.features,
                        { title: "", description: "" },
                      ],
                    })
                  }
                  style={{
                    ...btnSecondary,
                    fontSize: "12px",
                    padding: "6px 12px",
                  }}
                >
                  + Feature
                </button>
              </div>

              <div>
                <label style={labelStyle}>Beneficii</label>
                {item.benefits.map((b, bi) => (
                  <div
                    key={bi}
                    style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
                  >
                    <input
                      style={inputStyle}
                      value={b}
                      placeholder="Beneficiu..."
                      onChange={(e) => {
                        const benefits = [...item.benefits];
                        benefits[bi] = e.target.value;
                        updateItem(i, { benefits });
                      }}
                    />
                    <button
                      onClick={() =>
                        updateItem(i, {
                          benefits: item.benefits.filter(
                            (_, idx) => idx !== bi,
                          ),
                        })
                      }
                      style={{
                        ...btnDanger,
                        padding: "6px 8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconX />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    updateItem(i, { benefits: [...item.benefits, ""] })
                  }
                  style={{
                    ...btnSecondary,
                    fontSize: "12px",
                    padding: "6px 12px",
                  }}
                >
                  + Beneficiu
                </button>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleSave(item)} style={{ ...btnPrimary, display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconSave /> Salvează
                </button>
                <button
                  onClick={() => {
                    setEditing(null);
                    load();
                  }}
                  style={btnSecondary}
                >
                  Anulează
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                {item.image && (
                  <div
                    style={{
                      position: "relative",
                      width: "64px",
                      height: "48px",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#0F1A2D",
                    }}
                  >
                    {item.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "#878C96" }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setEditing(i)} style={{ ...btnSecondary, display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconEdit /> Editează
                </button>
                {item._id && (
                  <button
                    onClick={() => handleDelete(item._id!)}
                    style={{ ...btnDanger, display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <IconTrash />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// REVIEWS SECTION
// ═══════════════════════════════════════
function ReviewsSection() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/reviews");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (item: Review) => {
    const method = item._id ? "PUT" : "POST";
    await fetch("/api/reviews", {
      method,
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(item),
    });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi?")) return;
    await fetch(`/api/reviews?id=${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    load();
  };

  const handleImage = async (file: File, index: number) => {
    const url = await uploadImage(file);
    setItems((prev) =>
      prev.map((p, i) => (i === index ? { ...p, image: url } : p)),
    );
  };

  if (loading) return <p>Se încarcă...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0F1A2D" }}>
          Recenzii Pacienți
        </h2>
        <button
          onClick={() =>
            setItems([
              ...items,
              { name: "", image: "", grade: 5, text: "", order: items.length },
            ])
          }
          style={btnPrimary}
        >
          + Adaugă Recenzie
        </button>
      </div>
      {items.map((item, i) => (
        <div key={item._id || `new-${i}`} style={cardStyle}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              gap: "20px",
              alignItems: "start",
            }}
          >
            <div>
              {item.image && (
                <div
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              )}
              <label
                style={{
                  ...btnSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontSize: "12px",
                  padding: "6px 8px",
                  cursor: "pointer",
                }}
              >
                <IconCamera /> Fotografie
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    e.target.files?.[0] && handleImage(e.target.files[0], i)
                  }
                />
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px",
                  gap: "12px",
                }}
              >
                <div>
                  <label style={labelStyle}>Nume</label>
                  <input
                    style={inputStyle}
                    value={item.name}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((p, idx) =>
                          idx === i ? { ...p, name: e.target.value } : p,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <label style={labelStyle}>Notă</label>
                  <input
                    style={inputStyle}
                    type="number"
                    step="0.5"
                    min="0"
                    max="5"
                    value={item.grade}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((p, idx) =>
                          idx === i
                            ? { ...p, grade: parseFloat(e.target.value) }
                            : p,
                        ),
                      )
                    }
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Text recenzie</label>
                <textarea
                  style={{
                    ...inputStyle,
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                  value={item.text}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((p, idx) =>
                        idx === i ? { ...p, text: e.target.value } : p,
                      ),
                    )
                  }
                />
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleSave(item)} style={{ ...btnPrimary, display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconSave /> Salvează
                </button>
                {item._id && (
                  <button
                    onClick={() => handleDelete(item._id!)}
                    style={{ ...btnDanger, display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <IconTrash /> Șterge
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// BEFORE & AFTER SECTION
// ═══════════════════════════════════════
function BeforeAfterSection() {
  const [items, setItems] = useState<BeforeAfterCase[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/before-after");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (item: BeforeAfterCase) => {
    const method = item._id ? "PUT" : "POST";
    await fetch("/api/before-after", {
      method,
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(item),
    });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi?")) return;
    await fetch(`/api/before-after?id=${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    load();
  };

  const handleUpload = async (
    file: File,
    index: number,
    field: "before" | "after",
  ) => {
    const url = await uploadImage(file);
    setItems((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: url } : p)),
    );
  };

  if (loading) return <p>Se încarcă...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0F1A2D" }}>
          Before & After
        </h2>
        <button
          onClick={() =>
            setItems([
              ...items,
              { before: "", after: "", label: "", order: items.length },
            ])
          }
          style={btnPrimary}
        >
          + Adaugă Caz
        </button>
      </div>
      {items.map((item, i) => (
        <div key={item._id || `new-${i}`} style={cardStyle}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div>
              <label style={labelStyle}>Etichetă</label>
              <input
                style={inputStyle}
                value={item.label}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((p, idx) =>
                      idx === i ? { ...p, label: e.target.value } : p,
                    ),
                  )
                }
                placeholder="ex: Teeth Whitening"
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>Before</label>
                {item.before && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "140px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      marginBottom: "8px",
                    }}
                  >
                    <Image
                      src={item.before}
                      alt="Before"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                )}
                <label
                  style={{
                    ...btnSecondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <IconCamera /> Încarcă Before
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleUpload(e.target.files[0], i, "before")
                    }
                  />
                </label>
              </div>
              <div>
                <label style={labelStyle}>After</label>
                {item.after && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "140px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      marginBottom: "8px",
                    }}
                  >
                    <Image
                      src={item.after}
                      alt="After"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                )}
                <label
                  style={{
                    ...btnSecondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <IconCamera /> Încarcă After
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleUpload(e.target.files[0], i, "after")
                    }
                  />
                </label>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleSave(item)} style={{ ...btnPrimary, display: "flex", alignItems: "center", gap: "6px" }}>
                <IconSave /> Salvează
              </button>
              {item._id && (
                <button
                  onClick={() => handleDelete(item._id!)}
                  style={{ ...btnDanger, display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <IconTrash /> Șterge
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════
function HeroSection() {
  const [items, setItems] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/hero");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (file: File) => {
    const url = await uploadImage(file);
    await fetch("/api/hero", {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ url, order: items.length }),
    });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi?")) return;
    await fetch(`/api/hero?id=${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    load();
  };

  if (loading) return <p>Se încarcă...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0F1A2D" }}>
          Imagini Hero
        </h2>
        <label style={{ ...btnPrimary, cursor: "pointer" }}>
          + Adaugă Imagine
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files?.[0] && handleAdd(e.target.files[0])
            }
          />
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {items.map((item) => (
          <div
            key={item._id}
            style={{ ...cardStyle, padding: "0", overflow: "hidden" }}
          >
            <div
              style={{ position: "relative", width: "100%", height: "200px" }}
            >
              <Image
                src={item.url}
                alt="Hero"
                fill
                className="object-cover"
                sizes="350px"
              />
            </div>
            <div
              style={{
                padding: "12px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button onClick={() => handleDelete(item._id!)} style={{ ...btnDanger, display: "flex", alignItems: "center", gap: "6px" }}>
                <IconTrash /> Șterge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
