"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  IconSettings,
} from "./icons";
import { btnPrimary, labelStyle, inputStyle } from "./lib";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: <IconHome /> },
  { href: "/admin/echipa", label: "Echipă", icon: <IconUsers /> },
  { href: "/admin/servicii", label: "Servicii", icon: <IconBriefcase /> },
  { href: "/admin/recenzii", label: "Recenzii", icon: <IconStar /> },
  {
    href: "/admin/before-after",
    label: "Before & After",
    icon: <IconLayers />,
  },
  { href: "/admin/hero", label: "Hero", icon: <IconImage /> },
  { href: "/admin/setari", label: "Texte Site", icon: <IconSettings /> },
];

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SidebarContent({
  pathname,
  handleLogout,
  onNav,
}: {
  pathname: string;
  handleLogout: () => void;
  onNav?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Link href="/" style={{ display: "flex", lineHeight: 0 }}>
          <Image src="/logo.footer.png" alt="ECODENT" width={140} height={59} unoptimized style={{ width: "140px", height: "auto" }} />
        </Link>
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
              onClick={onNav}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px 12px",
                borderRadius: "10px",
                marginBottom: "2px",
                textDecoration: "none",
                fontSize: "14px",
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

      {/* Footer */}
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
            padding: "9px 12px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
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
            padding: "9px 12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            width: "100%",
            textAlign: "left",
          }}
        >
          <IconLogOut /> Deconectare
        </button>
      </div>
    </>
  );
}

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) setIsLoggedIn(true);
    setReady(true);
  }, []);

  // close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

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
          padding: "16px",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: "#FFF",
            borderRadius: "20px",
            padding: "40px 32px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            width: "100%",
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
            <Link href="/" style={{ display: "flex", lineHeight: 0 }}>
              <Image src="/logo.png" alt="ECODENT" width={160} height={67} unoptimized style={{ width: "160px", height: "auto" }} />
            </Link>
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
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#F0F2F5",
      }}
    >
      {/* ── Desktop Sidebar ── */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          backgroundColor: "#0F1A2D",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
        className="admin-sidebar-desktop"
      >
        <SidebarContent pathname={pathname} handleLogout={handleLogout} />
      </aside>

      {/* ── Mobile Drawer Overlay ── */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 99,
          }}
          className="admin-drawer-overlay"
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "260px",
          backgroundColor: "#0F1A2D",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
        className="admin-sidebar-mobile"
      >
        <button
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.5)",
            padding: "4px",
          }}
        >
          <CloseIcon />
        </button>
        <SidebarContent
          pathname={pathname}
          handleLogout={handleLogout}
          onNav={() => setDrawerOpen(false)}
        />
      </aside>

      {/* ── Main ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        {/* Mobile top bar */}
        <header
          className="admin-topbar-mobile"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: "#0F1A2D",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconShield />
            <span style={{ color: "#FFF", fontSize: "15px", fontWeight: 700 }}>
              ECODENT
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#FFF",
              padding: "4px",
              display: "flex",
            }}
          >
            <MenuIcon />
          </button>
        </header>

        <main style={{ flex: 1, padding: "24px 20px", overflowY: "auto" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-topbar-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .admin-sidebar-mobile { display: none !important; }
          .admin-drawer-overlay { display: none !important; }
        }
      `}</style>
    </div>
  );
}
