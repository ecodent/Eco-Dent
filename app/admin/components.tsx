"use client";

import { useState, useCallback } from "react";

/** Toast notification hook */
export function useToast() {
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const show = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, show };
}

/** Toast UI component */
export function Toast({ toast }: { toast: { msg: string; type: "success" | "error" } | null }) {
  if (!toast) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: toast.type === "success" ? "#059669" : "#DC2626",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 600,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        animation: "fadeInUp 0.2s ease",
      }}
    >
      {toast.type === "success" ? "✓" : "✕"} {toast.msg}
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateX(-50%) translateY(12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}

/** Displays a read-only URL input with a one-click copy button. */
export function CopyUrlBar({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  if (!url || !url.startsWith("https://")) return null;

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 10px",
        backgroundColor: "#F8F9FB",
        borderRadius: "8px",
        border: "1px solid #E5E7EB",
        marginTop: "8px",
      }}
    >
      <input
        readOnly
        value={url}
        onClick={(e) => (e.target as HTMLInputElement).select()}
        style={{
          flex: 1,
          fontSize: "11px",
          color: "#555",
          border: "none",
          background: "transparent",
          outline: "none",
          fontFamily: "monospace",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
        }}
      />
      <button
        onClick={copy}
        style={{
          flexShrink: 0,
          fontSize: "11px",
          fontWeight: 600,
          padding: "3px 9px",
          borderRadius: "6px",
          border: "1px solid #E5E7EB",
          backgroundColor: copied ? "#D1FAE5" : "#FFF",
          color: copied ? "#059669" : "#374151",
          cursor: "pointer",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        {copied ? "✓ Copiat" : "Copiază"}
      </button>
    </div>
  );
}
