"use client";

import Link from "next/link";
import { IconUsers, IconBriefcase, IconStar, IconLayers, IconImage } from "./icons";

const SECTIONS = [
  {
    href: "/admin/echipa",
    icon: <IconUsers />,
    label: "Echipă",
    description: "Gestionați membrii echipei medicale",
    color: "#EBF2FF",
    accent: "#0168FF",
  },
  {
    href: "/admin/servicii",
    icon: <IconBriefcase />,
    label: "Servicii",
    description: "Adăugați sau editați serviciile oferite",
    color: "#F0FDF4",
    accent: "#16A34A",
  },
  {
    href: "/admin/recenzii",
    icon: <IconStar />,
    label: "Recenzii",
    description: "Gestionați recenziile pacienților",
    color: "#FFFBEB",
    accent: "#D97706",
  },
  {
    href: "/admin/before-after",
    icon: <IconLayers />,
    label: "Before & After",
    description: "Cazuri înainte și după tratament",
    color: "#FDF2F8",
    accent: "#9333EA",
  },
  {
    href: "/admin/hero",
    icon: <IconImage />,
    label: "Hero",
    description: "Imagini din slideshow-ul principal",
    color: "#FFF7ED",
    accent: "#EA580C",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#0F1A2D",
            margin: 0,
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: "#878C96", marginTop: "6px" }}>
          Bun venit! Selectați o secțiune pentru a edita conținutul site-ului.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {SECTIONS.map(({ href, icon, label, description, color, accent }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div
              style={{
                backgroundColor: "#FFF",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                border: "1px solid #F0F0F0",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  color: accent,
                }}
              >
                {icon}
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#0F1A2D",
                  margin: "0 0 6px",
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: "13px", color: "#878C96", margin: 0 }}>
                {description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
