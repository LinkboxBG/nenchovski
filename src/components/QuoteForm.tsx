"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import { SITE } from "@/data/site";

type Variant = "moving" | "onsite";
type Status = "idle" | "sending" | "ok" | "error";

interface QuoteFormProps {
  /** "moving" = Откъде/Накъде/Дата; "onsite" = адрес на обекта (къртене/почистване/извозване) */
  variant?: Variant;
  /** компактна форма — само телефон + съобщение (за странична лента до статия) */
  compact?: boolean;
  /** карта върху тъмен фон (напр. carbon секция) */
  dark?: boolean;
}

const labelClass = "block font-sans text-xs font-semibold uppercase tracking-wide";

function inputClass(dark: boolean) {
  return dark
    ? "mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[15px] text-white placeholder:text-white/35 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
    : "mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-[15px] transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40";
}

/**
 * Форма за оферта: телефон + описание задължителни, останалото по избор.
 * Полетата за адрес се променят според variant (местене vs. обект).
 * Honeypot "website". Няма upload на снимки — вместо това Viber линк.
 */
export function QuoteForm({
  variant = "moving",
  compact = false,
  dark = false,
}: QuoteFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact/", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Грешка при изпращане.");
      }
      setStatus("ok");
      trackEvent("form_submit");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Грешка при изпращане. Обади ни се."
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border-2 border-green-600/30 bg-green-50 p-6 text-center shadow-card">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-2 h-8 w-8 text-green-700"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12.5l2.5 2.5 5-5.5" />
        </svg>
        <p className="font-sans text-xl font-semibold text-green-800">
          Получихме запитването ти!
        </p>
        <p className="mt-2 text-green-900">
          Очаквай обаждане <strong>до 1 час в работно време</strong>. Ако е
          спешно — звънни направо на{" "}
          <a
            href={`tel:+359${SITE.phone.slice(1)}`}
            data-ga-event="tel_click"
            className="font-bold underline"
          >
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const cardClass = dark
    ? "rounded-2xl border border-line bg-carbon-2 p-5 md:p-6 shadow-premium text-white"
    : "rounded-2xl border border-black/10 bg-white p-5 md:p-6 shadow-premium";
  const labelTone = dark ? "text-white/60" : "text-secondary";
  const subtitleTone = dark ? "text-white/60" : "text-secondary";
  const trustTone = dark ? "text-white/50" : "text-secondary";

  return (
    <form onSubmit={onSubmit} className={cardClass}>
      <p className="font-sans text-lg font-semibold">
        Поискай безплатна оферта
      </p>
      <p className={`text-sm mb-4 ${subtitleTone}`}>
        Оферта до 1 час в работно време. {SITE.workingHours}
      </p>

      {/* variant за имейл темплейта в API-то */}
      <input type="hidden" name="variant" value={variant} />

      {/* honeypot — скрито за хора */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-3.5">
        <label className="block">
          <span className={`${labelClass} ${labelTone}`}>Телефон *</span>
          <input
            type="tel"
            name="phone"
            required
            minLength={6}
            placeholder="08xx xxx xxx"
            className={inputClass(dark)}
          />
        </label>
        <label className="block">
          <span className={`${labelClass} ${labelTone}`}>
            Какво ще{" "}
            {variant === "moving"
              ? "местим"
              : "къртим / чистим / извозваме"}
            ? *
          </span>
          <textarea
            name="message"
            required
            minLength={5}
            rows={compact ? 2 : 3}
            placeholder={
              variant === "moving"
                ? "Напр.: двустаен апартамент, 3-ти етаж с асансьор…"
                : "Напр.: къртене на стена в баня, извозване на строителен отпадък…"
            }
            className={inputClass(dark)}
          />
        </label>

        {!compact && variant === "moving" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <label className="block">
              <span className={`${labelClass} ${labelTone}`}>Откъде</span>
              <input
                type="text"
                name="from"
                placeholder="Квартал / град"
                className={inputClass(dark)}
              />
            </label>
            <label className="block">
              <span className={`${labelClass} ${labelTone}`}>Накъде</span>
              <input
                type="text"
                name="to"
                placeholder="Квартал / град"
                className={inputClass(dark)}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={`${labelClass} ${labelTone}`}>Дата</span>
              <input type="date" name="date" className={inputClass(dark)} />
            </label>
          </div>
        ) : null}

        {!compact && variant === "onsite" ? (
          <div className="grid gap-3.5">
            <label className="block">
              <span className={`${labelClass} ${labelTone}`}>
                Адрес на обекта / квартал
              </span>
              <input
                type="text"
                name="from"
                placeholder="Напр.: ул. Резбарска 9А / ж.к. Хаджи Димитър"
                className={inputClass(dark)}
              />
            </label>
            <label className="block">
              <span className={`${labelClass} ${labelTone}`}>Дата</span>
              <input type="date" name="date" className={inputClass(dark)} />
            </label>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-3 text-sm text-primary font-medium">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-xl bg-red-gradient text-white font-sans font-semibold py-3.5 shadow-premium transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Изпращане…" : "Изпрати запитване"}
      </button>

      <p className={`mt-3 text-center text-sm ${subtitleTone}`}>
        или се обади сега:{" "}
        <a
          href={`tel:+359${SITE.phone.slice(1)}`}
          data-ga-event="tel_click"
          className="font-sans font-bold text-primary whitespace-nowrap"
        >
          {SITE.phoneDisplay}
        </a>
      </p>

      {/* Viber — за изпращане на снимки на обекта */}
      <div className="mt-4">
        <p className={`mb-1.5 text-xs font-sans font-medium ${labelTone}`}>
          Имате снимки на обекта?
        </p>
        <a
          href={`viber://chat?number=%2B${SITE.viber.slice(1)}`}
          data-ga-event="viber_click"
          className={
            dark
              ? "flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 transition-colors hover:border-[#7360f2] hover:bg-[#7360f2]/10"
              : "flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 transition-colors hover:border-[#7360f2] hover:bg-[#7360f2]/5"
          }
        >
          <Image
            src="/brand/social/viber.svg"
            width={20}
            height={20}
            alt="Viber"
            className="shrink-0"
          />
          <span>
            <span className="block font-sans text-sm font-semibold">
              Пратете ги във Viber
            </span>
            <span className={`block text-xs ${trustTone}`}>
              {SITE.phoneSecondaryDisplay} — пратете снимките си тук
            </span>
          </span>
        </a>
      </div>

      {/* Trust lines */}
      <div className={`mt-4 space-y-2 border-t pt-3 ${dark ? "border-white/10" : "border-black/10"}`}>
        <p className={`flex items-start gap-2 text-xs ${trustTone}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span>
            Данните ти са защитени (GDPR) — ползваме ги само за офертата.{" "}
            <Link
              href="/politika-za-poveritelnost/"
              className={dark ? "underline hover:text-white" : "underline hover:text-primary"}
            >
              Политика за поверителност
            </Link>
          </span>
        </p>
        <p className={`flex items-start gap-2 text-xs ${trustTone}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <rect x="2" y="6" width="20" height="13" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </svg>
          <span>
            Не се изисква дебитна/кредитна карта — плащаш след свършена
            работа.
          </span>
        </p>
      </div>
    </form>
  );
}
