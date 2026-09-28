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
 *
 * Where a message actually goes depends on whether a Web3Forms key is set. With
 * one, the form posts the message and it lands in the inbox — which is what the
 * button has always promised. Without one it falls back to handing the text to
 * the visitor's own mail client as a draft, and the button then says so instead
 * of claiming to have sent anything: a visitor with no mail client configured
 * would otherwise press "send" and have nothing happen at all, which is how
 * enquiries were being lost.
 *
 * The key is public by design — it travels with the request from the browser —
 * but it lives in an environment variable rather than the source, because this
 * repository is public and a key sitting in it invites spam.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const complete = Object.values(values).every((v) => v.trim().length > 0);

  const openMailClient = () => {
    const subject = encodeURIComponent(`New enquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete || status === "sending") return;

    if (!ACCESS_KEY) {
      openMailClient();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New enquiry from ${values.name}`,
          from_name: site.wordmark,
          // Replying in the inbox then goes to the visitor rather than to himself.
          replyto: values.email,
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? "send failed");
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div data-reveal className="enter-lift flex flex-col gap-2 bg-surface px-4 py-8 text-center">
        <p className="ui-label text-paper">MESSAGE SENT</p>
        <p className="body-copy text-[15px]">Thanks — I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  const label =
    status === "sending"
      ? "SENDING…"
      : !complete
        ? "FILL OUT THE FORM"
        : ACCESS_KEY
          ? "SEND MESSAGE"
          : "OPEN IN MAIL APP";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-1 bg-surface px-4 py-3 transition-colors duration-300 ease-framer focus-within:bg-[rgba(18,18,18,0.08)]">
          <span className="ui-label text-muted">{f.label}</span>
          {f.rows ? (
            <textarea
              name={f.name}
              rows={f.rows}
              placeholder={f.placeholder}
              value={values[f.name as keyof typeof values]}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className="resize-none bg-transparent text-[15px] font-light text-paper outline-none placeholder:text-black/30"
            />
          ) : (
            <input
              name={f.name}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              value={values[f.name as keyof typeof values]}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className="bg-transparent text-[15px] font-light text-paper outline-none placeholder:text-black/30"
            />
          )}
        </label>
      ))}

      {status === "error" && (
        <p className="ui-label text-[11px] leading-[1.5] text-muted">
          That didn&apos;t send. Write to {site.email} directly and it&apos;ll reach me.
        </p>
      )}

      <button
        type="submit"
        disabled={!complete || status === "sending"}
        data-roll-host
        data-cursor="link"
        className="mt-3 flex h-11 items-center justify-center bg-paper text-ink transition-opacity duration-300 ease-framer enabled:hover:opacity-80 disabled:opacity-40"
      >
        <RollingText text={label} className="ui-label" />
      </button>
    </form>
  );
}
