"use client";

import { useState } from "react";
import RollingText from "./RollingText";
import { site } from "@/data/site";

type Field = { name: string; label: string; placeholder: string; type?: string; rows?: number };

const fields: Field[] = [
  { name: "name", label: "NAME", placeholder: "Jane Smith" },
  { name: "email", label: "EMAIL", placeholder: "email@example.com", type: "email" },
  { name: "message", label: "MESSAGE", placeholder: "How can I help?", rows: 3 },
];

/**
 * The reference keeps the submit button disabled-looking until every field has
 * content, and swaps its label from "FILL OUT THE FORM" to "SEND MESSAGE".
 * Submitting opens the visitor's mail client — no backend to stand up.
 */
export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const complete = Object.values(values).every((v) => v.trim().length > 0);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete) return;
    const subject = encodeURIComponent(`New enquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[6px]">
      {fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-1 rounded-card bg-surface px-4 py-3 transition-colors duration-300 ease-framer focus-within:bg-white/[0.08]">
          <span className="ui-label text-muted">{f.label}</span>
          {f.rows ? (
            <textarea
              name={f.name}
              rows={f.rows}
              placeholder={f.placeholder}
              value={values[f.name as keyof typeof values]}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className="resize-none bg-transparent text-[15px] font-light text-paper outline-none placeholder:text-white/30"
            />
          ) : (
            <input
              name={f.name}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              value={values[f.name as keyof typeof values]}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className="bg-transparent text-[15px] font-light text-paper outline-none placeholder:text-white/30"
            />
          )}
        </label>
      ))}

      <button
        type="submit"
        disabled={!complete}
        data-roll-host
        data-cursor="link"
        className="mt-[6px] flex h-11 items-center justify-center rounded-card bg-surface text-paper transition-colors duration-300 ease-framer enabled:hover:bg-white/[0.12] disabled:text-muted"
      >
        <RollingText text={complete ? "SEND MESSAGE" : "FILL OUT THE FORM"} className="ui-label" />
      </button>
    </form>
  );
}
