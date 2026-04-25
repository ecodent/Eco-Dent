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

  const load = useCallback(async () => {
    const res = await fetch("/api/services");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

  if (loading) {
    return (
      <div style={{ color: "#878C96", padding: "40px 0" }}>Se încarcă...</div>
    );
  }

  return (
    <div>
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
            Servicii
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginTop: "4px" }}>
            {items.length} servicii
          </p>
        </div>
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
            /* ── Edit form ── */
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
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
                      border: "1px solid #E5E7EB",
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
                <label
                  style={{
                    ...btnSecondary,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
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
              {item.image && <CopyUrlBar url={item.image} />}

              {/* Features */}
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

              {/* Benefits */}
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
                <button
                  onClick={() => handleSave(item)}
                  style={{
                    ...btnPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
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
            /* ── Collapsed row ── */
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
                      border: "1px solid #E5E7EB",
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
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0F1A2D",
                      margin: 0,
                    }}
                  >
                    {item.title || (
                      <span style={{ color: "#C0C7D0" }}>
                        Titlu necompletat
                      </span>
                    )}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#878C96",
                      margin: "2px 0 0",
                    }}
                  >
                    /{item.slug}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setEditing(i)}
                  style={{
                    ...btnSecondary,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <IconEdit /> Editează
                </button>
                {item._id && (
                  <button
                    onClick={() => handleDelete(item._id!)}
                    style={{
                      ...btnDanger,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 12px",
                    }}
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
