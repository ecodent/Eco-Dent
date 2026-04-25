"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  HeroImage,
  authHeaders,
  uploadImage,
  cardStyle,
  btnPrimary,
  btnDanger,
} from "../lib";
import { IconCamera, IconTrash } from "../icons";
import { CopyUrlBar } from "../components";

export default function HeroPage() {
  const [items, setItems] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/hero");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      await fetch("/api/hero", {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ url, order: items.length }),
      });
      load();
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi această imagine?")) return;
    await fetch(`/api/hero?id=${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    load();
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
            Hero
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginTop: "4px" }}>
            {items.length} imagini în slideshow
          </p>
        </div>
        <label
          style={{
            ...btnPrimary,
            cursor: uploading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: uploading ? 0.7 : 1,
          }}
        >
          <IconCamera />
          {uploading ? "Se încarcă..." : "+ Adaugă Imagine"}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            disabled={uploading}
            onChange={(e) =>
              e.target.files?.[0] && handleAdd(e.target.files[0])
            }
          />
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={item._id}
            style={{
              ...cardStyle,
              padding: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image */}
            <div
              style={{ position: "relative", width: "100%", height: "200px" }}
            >
              <Image
                src={item.url}
                alt={`Hero ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "12px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#FFF",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}
              >
                #{idx + 1}
              </div>
            </div>

            {/* Copyable URL */}
            <CopyUrlBar url={item.url} />

            {/* Actions */}
            <div
              style={{
                padding: "10px 14px",
                display: "flex",
                justifyContent: "flex-end",
                borderTop: "1px solid #F0F0F0",
              }}
            >
              <button
                onClick={() => handleDelete(item._id!)}
                style={{
                  ...btnDanger,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                }}
              >
                <IconTrash /> Șterge
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#878C96",
            backgroundColor: "#FFF",
            borderRadius: "16px",
            border: "2px dashed #E5E7EB",
          }}
        >
          <p style={{ margin: 0, fontSize: "15px" }}>
            Nu există imagini. Adăugați prima imagine hero.
          </p>
        </div>
      )}
    </div>
  );
}
