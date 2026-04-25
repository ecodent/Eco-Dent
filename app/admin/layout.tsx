"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconShield,
  IconLogOut,
  IconUsers,
  IconBriefcase,
  IconStar,
  IconLayers,
  IconImage,
  IconHome,
  IconExternalLink,
} from "./icons";
import { btnPrimary, labelStyle, inputStyle } from "./lib";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: <IconHome /> },
  { href: "/admin/echipa", label: "Echipă", icon: <IconUsers /> },
  { href: "/admin/servicii", label: "Servicii", icon: <IconBriefcase /> },
  { href: "/admin/recenzii", label: "Recenzii", icon: <IconStar /> },
  { href: "/admin/before-after", label: "Before & After", icon: <IconLayers /> },
  { href: "/admin/hero", label: "Hero", icon: <IconImage /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) setIsLoggedIn(true);
    setReady(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Eroare la autentificare");
        return;
      }
      localStorage.setItem("admin_token", data.token);
      setIsLoggedIn(true);
    } catch {
      setLoginError("Eroare de conexiune");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  if (!ready) return null;

  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F0F2F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: "#FFF",
            borderRadius: "20px",
            padding: "48px 40px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "8px",
            }}
          >
            <IconShield />
            <span style={{ fontSize: "22px", fontWeight: 700, color: "#0F1A2D" }}>
              ECODENT Admin
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "#878C96",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Autentificați-vă pentru a continua
          </p>
          {loginError && (
            <div
              style={{
                backgroundColor: "#FEE2E2",
                color: "#DC2626",
                padding: "12px 16px",
                borderRadius: "10px",
                fontSize: "13px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {loginError}
            </div>
          )}
          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Parolă</label>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loginLoading}
            style={{
              ...btnPrimary,
              width: "100%",
              padding: "14px",
              fontSize: "15px",
              opacity: loginLoading ? 0.7 : 1,
            }}
          >
            {loginLoading ? "Se conectează..." : "Conectare"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F0F2F5" }}>
      {/* ── Sidebar ── */}
      <aside
        style={{
          width: "240px",
          flexShrink: 0,
          backgroundColor: "#0F1A2D",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "28px 20px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconShield />
            <span style={{ color: "#FFF", fontSize: "16px", fontWeight: 700 }}>
              ECODENT
            </span>
          </div>
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
              marginTop: "4px",
              display: "block",
            }}
          >
            Panou de administrare
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {NAV.map(({ href, label, icon }) => {
            const active =
              href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  marginBottom: "2px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#FFF" : "rgba(255,255,255,0.5)",
                  backgroundColor: active
                    ? "rgba(1,104,255,0.25)"
                    : "transparent",
                  transition: "all 0.15s",
                }}
              >
                <span
                  style={{
                    color: active ? "#4FA3FF" : "rgba(255,255,255,0.4)",
                    display: "flex",
                  }}
                >
                  {icon}
                </span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer links */}
        <div
          style={{
            padding: "16px 10px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <IconExternalLink /> Vezi site-ul
          </a>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              width: "100%",
              textAlign: "left",
            }}
          >
            <IconLogOut /> Deconectare
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: "32px 28px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
