"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  BeforeAfterCase,
  authHeaders,
  uploadImage,
  cardStyle,
  inputStyle,
  btnPrimary,
  btnDanger,
  labelStyle,
  btnSecondary,
} from "../lib";
import { IconCamera, IconSave, IconTrash } from "../icons";
import { CopyUrlBar } from "../components";

export default function BeforeAfterPage() {
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
    setItems((prev) => {
      const updated = prev.map((p, i) =>
        i === index ? { ...p, [field]: url } : p,
      );
      // auto-save immediately after upload
      const item = updated[index];
      const method = item._id ? "PUT" : "POST";
      fetch("/api/before-after", {
        method,
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(item),
      }).then(() => load());
      return updated;
    });
  };

  if (loading) {
    return (
      <div style={{ color: "#878C96", padding: "40px 0" }}>Se încarcă...</div>
    );
  }

  return (
    <div>
      <style>{`
        .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ba-label-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 600px) { .ba-grid { grid-template-columns: 1fr; } .ba-label-grid { grid-template-columns: 1fr; } }
      `}</style>
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
            Before & After
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginTop: "4px" }}>
            {items.length} cazuri
          </p>
        </div>
        <button
          onClick={() =>
            setItems([
              ...items,
              { before: "", after: "", label: "", label_ru: "", order: items.length },
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
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div className="ba-label-grid">
              <div>
                <label style={labelStyle}>Etichetă (RO)</label>
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
                  placeholder="ex: Albire Dentară"
                />
              </div>
              <div>
                <label style={labelStyle}>Etichetă (RU)</label>
                <input
                  style={inputStyle}
                  value={item.label_ru || ""}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((p, idx) =>
                        idx === i ? { ...p, label_ru: e.target.value } : p,
                      ),
                    )
                  }
                  placeholder="ex: Отбеливание Зубов"
                />
              </div>
            </div>

            <div className="ba-grid">
              {(["before", "after"] as const).map((field) => (
                <div key={field}>
                  <label style={labelStyle}>
                    {field === "before" ? "Înainte" : "După"}
                  </label>
                  {item[field] && (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "160px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        marginBottom: "10px",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <Image
                        src={item[field]}
                        alt={field}
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
                      cursor: "pointer",
                    }}
                  >
                    <IconCamera />{" "}
                    {field === "before" ? "Încarcă Înainte" : "Încarcă După"}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleUpload(e.target.files[0], i, field)
                      }
                    />
                  </label>
                  {item[field] && <CopyUrlBar url={item[field]} />}
                </div>
              ))}
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
              {item._id && (
                <button
                  onClick={() => handleDelete(item._id!)}
                  style={{
                    ...btnDanger,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
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
