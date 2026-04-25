"use client";

import { useState } from "react";
import { useT } from "./i18n/LanguageProvider";

function LocationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0168FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0168FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0168FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0168FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function Contact({
  phone,
  email,
  address,
  hours,
}: {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}) {
  const { t } = useT();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("contact.form.success"));
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="section-px section-py"
      style={{
        backgroundColor: "#F8F8F8",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#0168FF",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "12px",
          }}
        >
          {t("contact.kicker")}
        </p>
        <h2
          className="text-[32px] md:text-[42px]"
          style={{
            fontWeight: 300,
            color: "#0F1A2D",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {t("contact.title")}{" "}
          <span style={{ fontStyle: "italic", fontWeight: 700 }}>
            {t("contact.title.italic")}
          </span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ gap: "40px" }}>
        {/* Left — Map + Contact Info */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {/* Map */}
          <div
            style={{
              borderRadius: "28px",
              overflow: "hidden",
              height: "320px",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2724.5!2d29.6710852!3d46.5158631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c8456d94dfbed3%3A0xd5d7269ee4af44e1!2sEcodent!5e0!3m2!1sen!2s!4v1713500000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Details */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <div style={{ marginTop: "2px" }}>
                <LocationIcon />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0F1A2D",
                    margin: "0 0 4px 0",
                  }}
                >
                  {t("contact.address")}
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#878C96",
                    margin: 0,
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                  }}
                >
                  {address || t("contact.address.value")}
                </p>
              </div>
            </div>

            <a
              href={`tel:${phone || "+37369221112"}`}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}
            >
              <div style={{ marginTop: "2px" }}>
                <PhoneIcon />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0F1A2D",
                    margin: "0 0 4px 0",
                  }}
                >
                  {t("contact.phone")}
                </h4>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#0168FF",
                    fontWeight: 500,
                  }}
                >
                  {phone || "+373 69 221 112"}
                </span>
              </div>
            </a>

            <a
              href={`mailto:${email || "ecodent.web@gmail.com"}`}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}
            >
              <div style={{ marginTop: "2px" }}>
                <MailIcon />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0F1A2D",
                    margin: "0 0 4px 0",
                  }}
                >
                  {t("contact.email")}
                </h4>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#0168FF",
                    fontWeight: 500,
                  }}
                >
                  {email || "ecodent.web@gmail.com"}
                </span>
              </div>
            </a>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <div style={{ marginTop: "2px" }}>
                <ClockIcon />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0F1A2D",
                    margin: "0 0 4px 0",
                  }}
                >
                  {t("contact.hours")}
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#878C96",
                    margin: 0,
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                  }}
                >
                  {hours || t("contact.hours.value")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: "28px",
            padding: "32px 24px",
          }}
        >
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#0F1A2D",
              margin: "0 0 8px 0",
            }}
          >
            {t("contact.form.title")}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#878C96",
              margin: "0 0 32px 0",
              lineHeight: 1.6,
            }}
          >
            {t("contact.form.subtitle")}
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0F1A2D",
                  marginBottom: "8px",
                }}
              >
                {t("contact.form.name")}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("contact.form.name.placeholder")}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#F8F8F8",
                  fontSize: "14px",
                  color: "#0F1A2D",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row" style={{ gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#0F1A2D",
                    marginBottom: "8px",
                  }}
                >
                  {t("contact.form.phone")}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder={t("contact.form.phone.placeholder")}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#F8F8F8",
                    fontSize: "14px",
                    color: "#0F1A2D",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#0F1A2D",
                    marginBottom: "8px",
                  }}
                >
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder={t("contact.form.email.placeholder")}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#F8F8F8",
                    fontSize: "14px",
                    color: "#0F1A2D",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0F1A2D",
                  marginBottom: "8px",
                }}
              >
                {t("contact.form.message")}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder={t("contact.form.message.placeholder")}
                required
                rows={5}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#F8F8F8",
                  fontSize: "14px",
                  color: "#0F1A2D",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "9999px",
                backgroundColor: "#0168FF",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                marginTop: "8px",
                transition: "background-color 0.2s",
              }}
            >
              <SendIcon />
              {t("contact.form.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
