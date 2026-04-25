import React from "react";

// ─── Types ───
export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  image: string;
  order: number;
}
export interface ServiceFeature {
  title: string;
  description: string;
}
export interface Service {
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
export interface Review {
  _id?: string;
  name: string;
  image: string;
  grade: number;
  text: string;
  name_ru: string;
  text_ru: string;
  order: number;
}
export interface BeforeAfterCase {
  _id?: string;
  before: string;
  after: string;
  label: string;
  label_ru: string;
  order: number;
}
export interface HeroImage {
  _id?: string;
  url: string;
  order: number;
}

// ─── Auth Helpers ───
export function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("admin_token") || "";
}
export function authHeaders(
  extra?: Record<string, string>,
): Record<string, string> {
  return { Authorization: `Bearer ${getToken()}`, ...extra };
}
export async function uploadImage(file: File): Promise<string> {
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
export const cardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  marginBottom: "16px",
};
export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};
export const btnPrimary: React.CSSProperties = {
  backgroundColor: "#0168FF",
  color: "#FFF",
  border: "none",
  borderRadius: "10px",
  padding: "10px 24px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};
export const btnDanger: React.CSSProperties = {
  backgroundColor: "#EF4444",
  color: "#FFF",
  border: "none",
  borderRadius: "10px",
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
};
export const btnSecondary: React.CSSProperties = {
  backgroundColor: "#F3F4F6",
  color: "#0F1A2D",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  padding: "10px 24px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};
export const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "4px",
  display: "block",
};
