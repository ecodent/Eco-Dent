"use client";

import { useState } from "react";

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
