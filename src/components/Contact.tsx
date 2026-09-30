"use client";

import { useState, type FormEvent } from "react";
import { contact, profile, socials } from "@/content/site";
import { SocialIcon } from "@/lib/social-icons";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { availability } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Client validation
    const next: Record<string, string> = {};
    if (!name) next.name = "Please add your name.";
    if (!email) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(email)) next.email = "That email doesn't look right.";
    if (message.length < 10) next.message = "A little more detail, please (min. 10 characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle"); // clear any stale network-error banner
      const firstInvalid = (["name", "email", "message"] as const).find((f) => next[f]);
      if (firstInvalid) document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company: String(data.get("company") ?? "") }),
      });
      if (!res.ok) {
        // Surface the server's specific message (not-configured notice, rate
        // limit, validation) instead of a generic failure.
        let serverMsg = "";
        try {
          serverMsg = (await res.json())?.error ?? "";
        } catch {
          // non-JSON body — fall through to the generic message
        }
        setServerError(serverMsg);
        setStatus("error");
        return;
      }
      setServerError("");
      setStatus("success");
      form.reset();
    } catch {
      setServerError("");
      setStatus("error");
    }
  }

  const inputBase =
    "w-full rounded-2xl border bg-canvas px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-ink focus:outline-none";

  const fieldClass = (field: string) =>
    `${inputBase} ${errors[field] ? "border-red-400/60" : "border-line-strong"}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    >
      <div className="rounded-[var(--radius-card)] bg-card p-6 sm:p-10 lg:p-14">
        <div id="contact-heading">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <Eyebrow>Contact</Eyebrow>
                <h2 className="mt-8 text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-ink">
                  {contact.heading}
                </h2>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-body">
                  {contact.sub}
                </p>

                {/* Availability chips */}
                <div className="mt-10">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-faint">
                    {availability.heading}
                  </p>
                  <ul className="mt-4 flex max-w-md flex-wrap gap-2">
                    {availability.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-body"
                      >
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Channels + form */}
              <div className="lg:col-span-7">
                <Reveal delay={100}>
                  <ul className="mb-8 space-y-1">
                    <li>
                      <a
                        href={`mailto:${profile.email}`}
                        className="group flex items-center justify-between gap-4 border-b border-line py-3.5"
                      >
                        <span className="text-[11px] uppercase tracking-[0.14em] text-faint">
                          Email
                        </span>
                        <span className="text-sm text-ink transition-colors group-hover:text-body">
                          {profile.email}
                        </span>
                      </a>
                    </li>
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group flex items-center justify-between gap-4 border-b border-line py-3.5"
                        >
                          <span className="text-[11px] uppercase tracking-[0.14em] text-faint">
                            {s.label}
                          </span>
                          <span className="flex items-center gap-2 text-sm text-ink transition-colors group-hover:text-body">
                            <SocialIcon name={s.icon} className="h-4 w-4" />
                            <span aria-hidden="true" className="text-[11px] text-faint">
                              ↗
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={150}>
                  {status === "success" ? (
                    <div
                      role="status"
                      className="flex min-h-[320px] flex-col items-start justify-center rounded-[var(--radius-card-sm)] border border-line bg-canvas p-8 sm:p-10"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-ink"
                      >
                        ✓
                      </span>
                      <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">
                        {contact.success.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-body">
                        {contact.success.body}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-8 text-[13px] font-medium text-ink underline-offset-4 hover:underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={onSubmit}
                      noValidate
                      className="rounded-[var(--radius-card-sm)] border border-line bg-canvas p-6 sm:p-8"
                    >
                      {/* Honeypot — hidden from humans, catches naive bots */}
                      <div className="absolute -left-[9999px]" aria-hidden="true">
                        <label>
                          Company
                          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                        </label>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-body"
                          >
                            {contact.form.name.label}
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder={contact.form.name.placeholder}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "contact-name-error" : undefined}
                            className={fieldClass("name")}
                          />
                          {errors.name && (
                            <p
                              id="contact-name-error"
                              role="alert"
                              className="mt-2 text-xs text-red-600"
                            >
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="contact-email"
                            className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-body"
                          >
                            {contact.form.email.label}
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder={contact.form.email.placeholder}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "contact-email-error" : undefined}
                            className={fieldClass("email")}
                          />
                          {errors.email && (
                            <p
                              id="contact-email-error"
                              role="alert"
                              className="mt-2 text-xs text-red-600"
                            >
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-5">
                        <label
                          htmlFor="contact-message"
                          className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-body"
                        >
                          {contact.form.message.label}
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={6}
                          placeholder={contact.form.message.placeholder}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "contact-message-error" : undefined}
                          className={`${fieldClass("message")} resize-y`}
                        />
                        {errors.message && (
                          <p
                            id="contact-message-error"
                            role="alert"
                            className="mt-2 text-xs text-red-600"
                          >
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {status === "error" && (
                        <p
                          role="alert"
                          className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs leading-relaxed text-red-600"
                        >
                          {serverError ? (
                            <>
                              {serverError} Or reach me at{" "}
                              <a
                                href={`mailto:${profile.email}`}
                                className="underline underline-offset-2"
                              >
                                {profile.email}
                              </a>
                              .
                            </>
                          ) : (
                            <>
                              Something went wrong sending your message. Please try again, or email{" "}
                              <a
                                href={`mailto:${profile.email}`}
                                className="underline underline-offset-2"
                              >
                                {profile.email}
                              </a>{" "}
                              directly.
                            </>
                          )}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 text-[13px] font-medium text-white transition-colors hover:bg-[#2a2c31] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        {status === "submitting" ? (
                          <>
                            <span
                              aria-hidden="true"
                              className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white"
                            />
                            {contact.form.submitting}
                          </>
                        ) : (
                          <>
                            {contact.form.submit} <span aria-hidden="true">→</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
