"use client";

import { useState, useTransition } from "react";

/**
 * Email fallback — for prospects who'd rather not pick a calendar slot.
 * Posts to a placeholder mailto: link until the founder wires a real
 * inbound endpoint (Formspark, Resend, or a Vercel function). Designed to
 * match the editorial vocabulary: one field per row, hairline rules, sage
 * accent on the submit. No "Get Started", no consent-cookie modal.
 */

export function ContactFormFallback() {
  const [state, setState] = useState<"idle" | "sent">("idle");
  const [, startTransition] = useTransition();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        const subject = encodeURIComponent(
          `Enquiry from ${String(fd.get("name") ?? "site")}`,
        );
        const body = encodeURIComponent(
          `${String(fd.get("name") ?? "")}\n${String(fd.get("email") ?? "")}\n\n${String(fd.get("message") ?? "")}`,
        );
        window.location.href = `mailto:hello@stuckey.studio?subject=${subject}&body=${body}`;
        startTransition(() => setState("sent"));
      }}
      className="flex flex-col gap-5"
    >
      <Field label="Your name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field
        label="One sentence on what your site is failing to do"
        name="message"
        textarea
        required
      />

      <button
        type="submit"
        className="self-start mt-2 inline-flex items-center gap-3 bg-accent text-bg px-6 py-3.5 text-[0.9375rem] font-medium tracking-wide transition-colors duration-200 ease-[var(--ease-quart)] hover:bg-ink"
      >
        {state === "sent" ? "Sending in your mail app…" : "Send"}
        <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const baseClasses =
    "w-full bg-transparent border-b border-rule pt-5 pb-2 text-[0.9375rem] text-ink focus:outline-none focus:border-accent transition-colors duration-200 ease-[var(--ease-quart)] placeholder:text-muted/70";

  return (
    <label className="flex flex-col gap-1">
      <span className="eyebrow">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className={baseClasses}
        />
      )}
    </label>
  );
}
