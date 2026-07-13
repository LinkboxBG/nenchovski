import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SITE } from "@/data/site";

export const runtime = "nodejs";

/**
 * Контакт форма: zod валидация + honeypot + per-IP rate limit.
 * Доставка: Resend (щом RESEND_API_KEY е наличен в env) — иначе само лог.
 * Google Sheets append: Phase 2.
 * Снимки на обекта се изпращат отделно през Viber — не се качват тук.
 * Нищо от подаденото не се рендерира обратно като HTML.
 */

const schema = z.object({
  phone: z.string().min(6).max(30),
  message: z.string().min(5).max(3000),
  from: z.string().max(200).optional().or(z.literal("")),
  to: z.string().max(200).optional().or(z.literal("")),
  date: z.string().max(20).optional().or(z.literal("")),
  variant: z.enum(["moving", "onsite"]).optional().default("moving"),
  website: z.literal("").optional().or(z.undefined()), // honeypot
});

// In-memory rate limit: 5 заявки / час на IP (рестартира се при deploy)
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW = 60 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count++;
  return rec.count > LIMIT;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Твърде много заявки. Обади ни се по телефона." },
      { status: 429 }
    );
  }

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Невалидна заявка." },
      { status: 400 }
    );
  }

  // honeypot: ботовете попълват скритото поле
  if ((fd.get("website") as string) !== "" && fd.get("website") !== null) {
    return NextResponse.json({ ok: true }); // тихо приемаме, не доставяме
  }

  const parsed = schema.safeParse({
    phone: fd.get("phone"),
    message: fd.get("message"),
    from: fd.get("from") ?? "",
    to: fd.get("to") ?? "",
    date: fd.get("date") ?? "",
    variant: fd.get("variant") || undefined,
    website: fd.get("website") ?? "",
  });
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Провери телефона и описанието." },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const lines = [
    `Ново запитване от nenchovski.com`,
    `Тип: ${d.variant === "onsite" ? "Обект (къртене/почистване/извозване)" : "Преместване"}`,
    `Телефон: ${d.phone}`,
    `Описание: ${d.message}`,
    d.from
      ? `${d.variant === "onsite" ? "Адрес на обекта" : "Откъде"}: ${d.from}`
      : "",
    d.to ? `Накъде: ${d.to}` : "",
    d.date ? `Дата: ${d.date}` : "",
  ].filter(Boolean);

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM ?? "Хамали Ненчовски <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? SITE.email],
        subject: `Запитване от сайта — ${d.phone}`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "Грешка при изпращане. Обади ни се по телефона." },
        { status: 502 }
      );
    }
  } else {
    // Няма ключ (staging) — логваме без лични данни в клартекст извън Vercel logs
    console.log("[contact] заявка приета (без Resend ключ):", {
      phone: d.phone.slice(0, 4) + "***",
      variant: d.variant,
    });
  }

  // TODO Phase 2: Google Sheets append (GOOGLE_SHEETS_* env)

  return NextResponse.json({ ok: true });
}
