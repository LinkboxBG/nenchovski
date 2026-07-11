"use client";

import { useState } from "react";
import { trackEvent } from "@/components/Analytics";
import { SITE } from "@/data/site";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Форма за оферта: 2 задължителни полета (телефон + какво местим),
 * останалото по желание. Honeypot поле "website". До 5 снимки ≤5MB.
 */
export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const files = fd.getAll("photos") as File[];
    const real = files.filter((f) => f.size > 0);
    if (real.length > 5) {
      setError("Максимум 5 снимки.");
      return;
    }
    if (real.some((f) => f.size > 5 * 1024 * 1024)) {
      setError("Всяка снимка трябва да е до 5 MB.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
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
      <div className="rounded-xl border-2 border-green-600/30 bg-green-50 p-6 text-center">
        <p className="font-sans text-xl font-semibold text-green-800">
          Получихме запитването ти! ✅
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

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-black/10 bg-white p-5 md:p-6 shadow-lg"
    >
      <p className="font-sans text-lg font-semibold">
        Поискай безплатна оферта
      </p>
      <p className="text-sm text-secondary mb-4">
        Оферта до 1 час в работно време. {SITE.workingHours.toLowerCase()}.
      </p>

      {/* honeypot — скрито за хора */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-3">
        <label className="block">
          <span className="font-sans text-sm font-medium">Телефон *</span>
          <input
            type="tel"
            name="phone"
            required
            minLength={6}
            placeholder="08xx xxx xxx"
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-medium">
            Какво ще местим / къртим / извозваме? *
          </span>
          <textarea
            name="message"
            required
            minLength={5}
            rows={compact ? 2 : 3}
            placeholder="Напр.: двустаен апартамент, 3-ти етаж с асансьор…"
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        {!compact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="font-sans text-sm font-medium">Откъде</span>
              <input
                type="text"
                name="from"
                placeholder="Квартал / град"
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>
            <label className="block">
              <span className="font-sans text-sm font-medium">Накъде</span>
              <input
                type="text"
                name="to"
                placeholder="Квартал / град"
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>
            <label className="block">
              <span className="font-sans text-sm font-medium">Дата</span>
              <input
                type="date"
                name="date"
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>
            <label className="block">
              <span className="font-sans text-sm font-medium">
                Снимки (до 5, по 5 MB)
              </span>
              <input
                type="file"
                name="photos"
                accept="image/*"
                multiple
                className="mt-1 w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-soft file:px-3 file:py-2 file:font-sans file:text-sm"
              />
            </label>
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-3 text-sm text-primary font-medium">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-lg bg-primary hover:bg-accent disabled:opacity-60 text-white font-sans font-semibold py-3 transition-colors"
      >
        {status === "sending" ? "Изпращане…" : "Изпрати запитване"}
      </button>
      <p className="mt-3 text-center text-sm text-secondary">
        или се обади сега:{" "}
        <a
          href={`tel:+359${SITE.phone.slice(1)}`}
          data-ga-event="tel_click"
          className="font-sans font-bold text-primary whitespace-nowrap"
        >
          {SITE.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
