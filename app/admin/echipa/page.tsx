"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  TeamMember,
  getToken,
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

export default function EchipaPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  void getToken;

  const load = useCallback(async () => {
    const res = await fetch("/api/team");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (item: TeamMember) => {
    const method = item._id ? "PUT" : "POST";
    await fetch("/api/team", {
      method,
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(item),
    });
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

  const handleImage = async (file: File, index: number) => {
    const url = await uploadImage(file);
    setItems((prev) => {
      const updated = prev.map((p, i) =>
        i === index ? { ...p, image: url } : p,
      );
      const item = updated[index];
      const method = item._id ? "PUT" : "POST";
      fetch("/api/team", {
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
        .echipa-card-grid { display: grid; grid-template-columns: 100px 1fr; gap: 20px; align-items: start; }
        .echipa-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 500px) {
          .echipa-card-grid { grid-template-columns: 1fr; }
          .echipa-fields-grid { grid-template-columns: 1fr; }
        }
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
            Echipă
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginTop: "4px" }}>
            {items.length} membri
          </p>
        </div>
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
          <div className="echipa-card-grid">
            {/* Image column */}
            <div>
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  borderRadius: "14px",
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
                <IconCamera /> Imagine
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
              <div className="echipa-fields-grid">
                <div>
                  <label style={labelStyle}>Nume (RO)</label>
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
                  <label style={labelStyle}>Rol (RO)</label>
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
                <div>
                  <label style={labelStyle}>Nume (RU)</label>
                  <input
                    style={inputStyle}
                    value={item.name_ru || ""}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((p, idx) =>
                          idx === i ? { ...p, name_ru: e.target.value } : p,
                        ),
                      )
                    }
                    placeholder="Др. Имя Фамилия"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Rol (RU)</label>
                  <input
                    style={inputStyle}
                    value={item.role_ru || ""}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((p, idx) =>
                          idx === i ? { ...p, role_ru: e.target.value } : p,
                        ),
                      )
                    }
                    placeholder="Специалист..."
                  />
                </div>
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
