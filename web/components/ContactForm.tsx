"use client";

import { useState } from "react";
import { API_BASE, LEAD_MODE } from "@/lib/site";
import type { Dict } from "@/lib/types";

type Status = "idle" | "sending" | "ok" | "error";

type Fields = { name: string; email: string; message: string };

const EMPTY: Fields = { name: "", email: "", message: "" };

const INPUT_CLASS =
  "mt-2 w-full border-b border-line bg-transparent pb-2 text-[15px] text-ink " +
  "placeholder:text-ink-3/70 transition-colors duration-200 " +
  "hover:border-ink-3 focus:border-accent focus:outline-none";

function Field({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline gap-2">
        <span className="font-mono text-micro text-accent">{index}</span>
        <span className="font-mono text-micro uppercase tracking-[0.2em] text-ink-3">
          {label}
        </span>
      </span>
      {children}
    </label>
  );
}

/**
 * Lead form. In demo mode nothing leaves the browser — the acknowledgement is
 * local, and a one-line note under the button says so, because the rest of this
 * site is built on not claiming things it cannot back up.
 */
export default function ContactForm({ dict }: { dict: Dict }) {
  const copy = dict.visit;
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState<Fields>(EMPTY);

  const update = (key: keyof Fields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((prev) => ({ ...prev, [key]: event.target.value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    if (LEAD_MODE === "demo") {
      await new Promise((resolve) => setTimeout(resolve, 650));
      setStatus("ok");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) throw new Error(`lead rejected: ${response.status}`);
      setFields(EMPTY);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="mt-6 max-w-xl rounded-xl border border-line bg-paper-2 p-6">
        <p className="eyebrow">{copy.successTitle}</p>
        <p className="mt-3 font-serif text-xl leading-snug text-ink">
          {copy.success}
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY);
            setStatus("idle");
          }}
          className="mt-5 border-b border-line pb-0.5 font-mono text-micro uppercase tracking-[0.2em] text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          {copy.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl">
      <p className="text-sm leading-relaxed text-ink-2">{copy.formNote}</p>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field index="01" label={copy.name}>
          <input
            required
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={update("name")}
            className={INPUT_CLASS}
          />
        </Field>
        <Field index="02" label={copy.email}>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@studio.com"
            value={fields.email}
            onChange={update("email")}
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field index="03" label={copy.message}>
          <textarea
            required
            rows={3}
            name="message"
            value={fields.message}
            onChange={update("message")}
            className={`${INPUT_CLASS} resize-none leading-relaxed`}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary group disabled:translate-y-0 disabled:opacity-60"
        >
          {status === "sending" ? copy.sending : copy.submit}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
        <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink-3">
          {copy.replyNote}
        </span>
      </div>

      <p aria-live="polite" className="mt-2 min-h-4 text-sm text-accent">
        {status === "error" ? copy.error : ""}
      </p>

      {LEAD_MODE === "demo" && (
        <p className="mt-1 border-t border-line pt-3 font-mono text-micro leading-relaxed tracking-wide text-ink-3">
          {copy.demoNote}
        </p>
      )}
    </form>
  );
}
