"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  Service,
  authHeaders,
  uploadImage,
  cardStyle,
  inputStyle,
  btnPrimary,
  btnDanger,
  btnSecondary,
  labelStyle,
} from "../lib";
import { IconCamera, IconSave, IconTrash, IconEdit, IconX } from "../icons";
import { CopyUrlBar } from "../components";

export default function ServiciiPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [lang, setLang] = useState<"ro" | "ru">("ro");

  const load = useCallback(async () => {
    const res = await fetch("/api/services");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (item: Service) => {
    const method = item._id ? "PUT" : "POST";
    await fetch("/api/services", {
      method,
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(item),
    });
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest serviciu?")) return;
    await fetch(`/api/services?id=${id}`, { method: "DELETE", headers: authHeaders() });
    load();
  };

  const handleImage = async (file: File, index: number) => {
    const url = await uploadImage(file);
    setItems((prev) => prev.map((p, i) => (i === index ? { ...p, image: url } : p)));
  };

  const updateItem = (index: number, updates: Partial<Service>) => {
    setItems((prev) => prev.map((p, i) => (i === index ? { ...p, ...updates } : p)));
  };

  const newService = (): Service => ({
    slug: "", title: "", subtitle: "", description: "",
    title_ru: "", subtitle_ru: "", description_ru: "",
    image: "", imagePosition: "center 30%",
    features: [{ title: "", description: "", title_ru: "", description_ru: "" }],
    benefits: [""], benefits_ru: [""],
    cardColor: "#ECEEF1", order: items.length,
  });

  const tabBtn = (active: boolean) => ({
    padding: "6px 18px", borderRadius: "8px", border: "none", cursor: "pointer",
    fontSize: "13px", fontWeight: 600,
    backgroundColor: active ? "#0168FF" : "#F3F4F6",
    color: active ? "#FFF" : "#878C96",
  } as React.CSSProperties);

  if (loading) return <div style={{ color: "#878C96", padding: "40px 0" }}>Se încarcă...</div>;

  return (
    <div>
      <style>{`
        .svc-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px; }
        .svc-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .svc-feat-row { display:grid; grid-template-columns:1fr 1fr 40px; gap:8px; margin-bottom:8px; }
        .svc-actions { display:flex; gap:8px; flex-wrap:wrap; }
        .svc-collapsed { display:flex; align-items:center; justify-content:space-between; gap:8px; }
        .svc-collapsed-left { display:flex; align-items:center; gap:12px; min-width:0; }
        .svc-collapsed-btns { display:flex; gap:8px; flex-shrink:0; }
        @media(max-width:520px) {
          .svc-grid-2 { grid-template-columns:1fr; }
          .svc-feat-row { grid-template-columns:1fr 40px; }
          .svc-feat-row input:nth-child(2) { display:none; }
          .svc-collapsed { flex-wrap:wrap; }
          .svc-collapsed-btns button span { display:none; }
        }
      `}</style>

      <div className="svc-header">
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#0F1A2D", margin: 0 }}>Servicii</h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginTop: "4px" }}>{items.length} servicii</p>
        </div>
        <button onClick={() => { setItems([...items, newService()]); setEditing(items.length); }} style={btnPrimary}>
          + Adaugă
        </button>
      </div>

      {items.map((item, i) => (
        <div key={item._id || `new-${i}`} style={cardStyle}>
          {editing === i ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Lang tabs */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "2px" }}>
                <button style={tabBtn(lang === "ro")} onClick={() => setLang("ro")}>🇷🇴 Română</button>
                <button style={tabBtn(lang === "ru")} onClick={() => setLang("ru")}>🇷🇺 Rusă</button>
              </div>

              {/* Slug + Color (always visible) */}
              <div className="svc-grid-2">
                <div>
                  <label style={labelStyle}>Slug (URL)</label>
                  <input style={inputStyle} value={item.slug}
                    onChange={(e) => updateItem(i, { slug: e.target.value })} placeholder="dental-implants" />
                </div>
                <div>
                  <label style={labelStyle}>Culoare Card</label>
                  <input style={inputStyle} value={item.cardColor}
                    onChange={(e) => updateItem(i, { cardColor: e.target.value })} />
                </div>
              </div>

              {lang === "ro" ? (<>
                {/* RO fields */}
                <div className="svc-grid-2">
                  <div>
                    <label style={labelStyle}>Titlu (RO)</label>
                    <input style={inputStyle} value={item.title}
                      onChange={(e) => updateItem(i, { title: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Subtitlu (RO)</label>
                    <input style={inputStyle} value={item.subtitle}
                      onChange={(e) => updateItem(i, { subtitle: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Descriere (RO)</label>
                  <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={item.description}
                    onChange={(e) => updateItem(i, { description: e.target.value })} />
                </div>

                {/* Image */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  {item.image && (
                    <div style={{ position: "relative", width: "100px", height: "70px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E5E7EB", flexShrink: 0 }}>
                      <Image src={item.image} alt="" fill className="object-cover" sizes="100px" />
                    </div>
                  )}
                  <label style={{ ...btnSecondary, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    <IconCamera /> Imagine
                    <input type="file" accept="image/*" style={{ display: "none" }}
                      onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0], i)} />
                  </label>
                </div>
                {item.image && <CopyUrlBar url={item.image} />}

                {/* Features RO */}
                <div>
                  <label style={labelStyle}>Features (RO)</label>
                  {item.features.map((f, fi) => (
                    <div key={fi} className="svc-feat-row">
                      <input style={inputStyle} value={f.title} placeholder="Titlu"
                        onChange={(e) => { const features = [...item.features]; features[fi] = { ...features[fi], title: e.target.value }; updateItem(i, { features }); }} />
                      <input style={inputStyle} value={f.description} placeholder="Descriere"
                        onChange={(e) => { const features = [...item.features]; features[fi] = { ...features[fi], description: e.target.value }; updateItem(i, { features }); }} />
                      <button onClick={() => updateItem(i, { features: item.features.filter((_, idx) => idx !== fi) })}
                        style={{ ...btnDanger, padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}><IconX /></button>
                    </div>
                  ))}
                  <button onClick={() => updateItem(i, { features: [...item.features, { title: "", description: "", title_ru: "", description_ru: "" }] })}
                    style={{ ...btnSecondary, fontSize: "12px", padding: "6px 12px" }}>+ Feature</button>
                </div>

                {/* Benefits RO */}
                <div>
                  <label style={labelStyle}>Beneficii (RO)</label>
                  {item.benefits.map((b, bi) => (
                    <div key={bi} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                      <input style={inputStyle} value={b} placeholder="Beneficiu..."
                        onChange={(e) => { const benefits = [...item.benefits]; benefits[bi] = e.target.value; updateItem(i, { benefits }); }} />
                      <button onClick={() => updateItem(i, { benefits: item.benefits.filter((_, idx) => idx !== bi) })}
                        style={{ ...btnDanger, padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}><IconX /></button>
                    </div>
                  ))}
                  <button onClick={() => updateItem(i, { benefits: [...item.benefits, ""] })}
                    style={{ ...btnSecondary, fontSize: "12px", padding: "6px 12px" }}>+ Beneficiu</button>
                </div>
              </>) : (<>
                {/* RU fields */}
                <div className="svc-grid-2">
                  <div>
                    <label style={labelStyle}>Titlu (RU)</label>
                    <input style={inputStyle} value={item.title_ru || ""}
                      onChange={(e) => updateItem(i, { title_ru: e.target.value })} placeholder="Название услуги" />
                  </div>
                  <div>
                    <label style={labelStyle}>Subtitlu (RU)</label>
                    <input style={inputStyle} value={item.subtitle_ru || ""}
                      onChange={(e) => updateItem(i, { subtitle_ru: e.target.value })} placeholder="Подзаголовок" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Descriere (RU)</label>
                  <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={item.description_ru || ""}
                    onChange={(e) => updateItem(i, { description_ru: e.target.value })} placeholder="Описание..." />
                </div>

                {/* Features RU */}
                <div>
                  <label style={labelStyle}>Features (RU)</label>
                  {item.features.map((f, fi) => (
                    <div key={fi} className="svc-feat-row">
                      <input style={inputStyle} value={f.title_ru || ""} placeholder="Название"
                        onChange={(e) => { const features = [...item.features]; features[fi] = { ...features[fi], title_ru: e.target.value }; updateItem(i, { features }); }} />
                      <input style={inputStyle} value={f.description_ru || ""} placeholder="Описание"
                        onChange={(e) => { const features = [...item.features]; features[fi] = { ...features[fi], description_ru: e.target.value }; updateItem(i, { features }); }} />
                      <div style={{ width: "40px" }} />
                    </div>
                  ))}
                  <p style={{ fontSize: "12px", color: "#878C96", margin: "4px 0 0" }}>Adaugă/șterge features din tab RO.</p>
                </div>

                {/* Benefits RU */}
                <div>
                  <label style={labelStyle}>Beneficii (RU)</label>
                  {(item.benefits_ru || []).map((b, bi) => (
                    <div key={bi} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                      <input style={inputStyle} value={b} placeholder="Преимущество..."
                        onChange={(e) => { const benefits_ru = [...(item.benefits_ru || [])]; benefits_ru[bi] = e.target.value; updateItem(i, { benefits_ru }); }} />
                      <button onClick={() => updateItem(i, { benefits_ru: (item.benefits_ru || []).filter((_, idx) => idx !== bi) })}
                        style={{ ...btnDanger, padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}><IconX /></button>
                    </div>
                  ))}
                  <button onClick={() => updateItem(i, { benefits_ru: [...(item.benefits_ru || []), ""] })}
                    style={{ ...btnSecondary, fontSize: "12px", padding: "6px 12px" }}>+ Beneficiu RU</button>
                </div>
              </>)}

              <div className="svc-actions">
                <button onClick={() => handleSave(item)}
                  style={{ ...btnPrimary, display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconSave /> Salvează
                </button>
                <button onClick={() => { setEditing(null); load(); }} style={btnSecondary}>Anulează</button>
              </div>
            </div>
          ) : (
            <div className="svc-collapsed">
              <div className="svc-collapsed-left">
                {item.image && (
                  <div style={{ position: "relative", width: "56px", height: "44px", borderRadius: "8px", overflow: "hidden", border: "1px solid #E5E7EB", flexShrink: 0 }}>
                    <Image src={item.image} alt="" fill className="object-cover" sizes="56px" />
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#0F1A2D", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title || <span style={{ color: "#C0C7D0" }}>Titlu necompletat</span>}
                  </p>
                  <p style={{ fontSize: "12px", color: "#878C96", margin: "2px 0 0" }}>/{item.slug}</p>
                </div>
              </div>
              <div className="svc-collapsed-btns">
                <button onClick={() => setEditing(i)}
                  style={{ ...btnSecondary, display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconEdit /> <span>Editează</span>
                </button>
                {item._id && (
                  <button onClick={() => handleDelete(item._id!)}
                    style={{ ...btnDanger, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 12px" }}>
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


