import { NextRequest, NextResponse } from "next/server";
import { sanitizeString } from "@/lib/auth";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = sanitizeString(body?.name);
    const phone = sanitizeString(body?.phone);

    if (!name || !phone) {
      return NextResponse.json({ error: "Date lipsă" }, { status: 400 });
    }

    const message =
      `🦷 *Cerere nouă - Ecodent*\n\n` +
      `👤 *Nume:* ${name}\n` +
      `📞 *Telefon:* ${phone}`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!tgRes.ok) {
      const err = await tgRes.text();
      console.error("Telegram error:", err);
      return NextResponse.json({ error: "Eroare trimitere" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
