"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  Review,
  authHeaders,
  uploadImage,
  cardStyle,
  inputStyle,
  btnPrimary,
  btnDanger,
  btnSecondary,
  labelStyle,
} from "../lib";
import { IconCamera, IconSave, IconTrash } from "../icons";
import { CopyUrlBar } from "../components";

export default function RecenziiPage() {
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
            Recenzii
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginTop: "4px" }}>
            {items.length} recenzii
          </p>
        </div>
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
              gridTemplateColumns: "110px 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Photo column */}
            <div>
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: "10px",
                  backgroundColor: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                }}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                )}
              </div>
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
              {item.image && <CopyUrlBar url={item.image} />}
            </div>

            {/* Fields column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px",
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
                    placeholder="Pacient..."
                  />
                </div>
                <div>
                  <label style={labelStyle}>Notă (0–5)</label>
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
                    minHeight: "90px",
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
        </div>
      ))}
    </div>
  );
}
