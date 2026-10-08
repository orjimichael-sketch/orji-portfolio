"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

/**
 * "Jiggy's Login Form" — a glassmorphism double-slider login card:
 * both forms sit side by side and a glass overlay panel slides over the
 * inactive half. Built with React + Tailwind + Framer Motion (no UI kit,
 * inline icons only).
 *
 * Desktop: both forms sit side by side; a glass overlay panel slides over
 * whichever half is inactive, flipping between "Hello, Friend!" and
 * "Welcome Back!". Mobile: one form at a time with a slide swap.
 *
 * Demo only — nothing is submitted anywhere; the submit buttons just
 * flash a local confirmation state.
 */

type Mode = "login" | "signup";

/* Shared ease-out curve — fast start, long silky tail. Used everywhere
   motion moves so the whole form breathes with one rhythm. */
const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Inline icons (no icon-library dependency) ───────────────────────────── */

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.2-3 3.8-4.5 7-4.5s5.8 1.5 7 4.5" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <path d="m4 4 16 16" />
      <path d="M10.6 5.9a9.9 9.9 0 0 1 1.4-.4c6 0 9.5 6.5 9.5 6.5a17.7 17.7 0 0 1-2.9 3.6M6.2 6.9A17.2 17.2 0 0 0 2.5 12S6 18.5 12 18.5a9.5 9.5 0 0 0 3.9-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/* ── Glass field ─────────────────────────────────────────────────────────── */

function Field({
  label,
  icon,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  icon: ReactNode;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-caps text-white/45">
        {label}
      </span>
      <span className="group flex items-center gap-3 border border-white/10 bg-white/[0.04] px-3.5 transition-colors duration-200 hover:bg-white/[0.06] focus-within:bg-white/[0.07]">
        <span className="shrink-0 text-white/35 transition-colors duration-200 group-focus-within:text-emerald-300/90">
          {icon}
        </span>
        <input
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-12 w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="-m-1.5 shrink-0 rounded-full p-1.5 text-white/35 transition-colors duration-200 hover:bg-white/10 hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300/70"
          >
            {show ? <IconEyeOff /> : <IconEye />}
          </button>
        )}
      </span>
    </label>
  );
}

/* ── Form bodies ─────────────────────────────────────────────────────────── */

function LoginFormBody({ onSwitch }: { onSwitch: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        window.setTimeout(() => setSent(false), 1800);
      }}
    >
      <h2 className="mb-1 text-2xl font-semibold tracking-tight text-white">Login</h2>
      <Field label="Username" icon={<IconUser />} placeholder="codexjoshin" autoComplete="username" />
      <Field label="Password" icon={<IconLock />} type="password" placeholder="••••••••••" autoComplete="current-password" />
      <button
        type="button"
        className="self-end text-xs text-white/45 transition-colors duration-200 hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300/70"
      >
        Forgot password?
      </button>
      <motion.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-teal-300 text-sm font-semibold text-[#04231b] shadow-[0_10px_30px_-8px_rgba(52,211,153,0.45)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-10px_rgba(52,211,153,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300/70"
      >
        {sent ? "Welcome back ✓" : "Login"}
        <IconArrow />
      </motion.button>
      <p className="text-center text-xs text-white/45">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-emerald-300 transition-colors duration-200 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300/70"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

function SignupFormBody({ onSwitch }: { onSwitch: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        window.setTimeout(() => setSent(false), 1800);
      }}
    >
      <h2 className="mb-1 text-2xl font-semibold tracking-tight text-white">Sign up</h2>
      <Field label="Name" icon={<IconUser />} placeholder="Jane Doe" autoComplete="name" />
      <Field label="Email" icon={<IconMail />} type="email" placeholder="jane@example.com" autoComplete="email" />
      <Field label="Password" icon={<IconLock />} type="password" placeholder="••••••••••" autoComplete="new-password" />
      <motion.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-teal-300 text-sm font-semibold text-[#04231b] shadow-[0_10px_30px_-8px_rgba(52,211,153,0.45)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-10px_rgba(52,211,153,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300/70"
      >
        {sent ? "Account created ✓" : "Create account"}
        <IconArrow />
      </motion.button>
      <p className="text-center text-xs text-white/45">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-emerald-300 transition-colors duration-200 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300/70"
        >
          Log in
        </button>
      </p>
    </form>
  );
}

/* ── Overlay copy ────────────────────────────────────────────────────────── */

const overlayCopy: Record<
  Mode,
  { title: string; body: string; cta: string; target: Mode }
> = {
  login: {
    title: "Hello, Friend!",
    body: "Enter your personal details and start your journey with us.",
    cta: "Create account",
    target: "signup",
  },
  signup: {
    title: "Welcome Back!",
    body: "To keep you connected, please log in with your personal info.",
    cta: "Log in",
    target: "login",
  },
};

/* ── Component ───────────────────────────────────────────────────────────── */

export default function JiggyLoginForm() {
  const [mode, setMode] = useState<Mode>("login");
  // Direction of the last overlay slide — drives the content counter-parallax.
  const [dir, setDir] = useState<Mode | null>(null);
  const copy = overlayCopy[mode];

  const switchMode = (next: Mode) => {
    setDir(next);
    setMode(next);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section data-jiggy-form className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#07070b] px-4 py-16 sm:px-6">
        {/* Dark premium backdrop — emerald glows + shattered-glass streaks */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 right-[-8%] h-[26rem] w-[26rem] rounded-full bg-teal-400/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.045) 42%, transparent 46%), linear-gradient(245deg, transparent 58%, rgba(255,255,255,0.035) 60%, transparent 64%), linear-gradient(20deg, transparent 72%, rgba(255,255,255,0.03) 73.5%, transparent 77%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[6%] top-[14%] hidden h-64 w-40 rotate-12 bg-gradient-to-br from-white/[0.06] to-transparent lg:block"
          style={{ clipPath: "polygon(0 0, 100% 18%, 78% 100%, 12% 82%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[10%] left-[14%] hidden h-40 w-56 -rotate-6 bg-gradient-to-tr from-white/[0.05] to-transparent lg:block"
          style={{ clipPath: "polygon(8% 22%, 92% 0, 100% 70%, 20% 100%)" }}
        />

        {/* Heading */}
        <div className="relative z-10 mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Jiggy&apos;s login form
          </h1>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: PREMIUM_EASE }}
          className="relative z-10 w-full max-w-[52rem]"
        >
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.05] shadow-[0_60px_160px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
            {/* Top hairline highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />

            {/* Desktop: both forms + sliding glass overlay */}
            <div className="hidden md:grid md:grid-cols-2">
              <div className="p-10 lg:p-14" inert={mode === "signup" ? true : undefined}>
                <LoginFormBody onSwitch={() => switchMode("signup")} />
              </div>
              <div className="p-10 lg:p-14" inert={mode === "login" ? true : undefined}>
                <SignupFormBody onSwitch={() => switchMode("login")} />
              </div>
            </div>

            {/* Sliding glass overlay (desktop) — covers the inactive half */}
            <motion.div
              className="absolute inset-y-0 left-0 z-10 hidden w-1/2 md:block"
              animate={{ x: mode === "login" ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: PREMIUM_EASE }}
            >
              <div className="relative flex h-full flex-col items-center justify-center overflow-hidden border-l border-white/10 bg-gradient-to-br from-[#1a241f] via-[#131c17] to-[#0d1310] px-10 text-center lg:px-14">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[90px]"
                />
                {/* Content lags the panel by a few pixels and settles — a
                    counter-parallax that makes the slide feel weighty. */}
                <motion.div
                  initial={false}
                  animate={{ x: dir === "login" ? [-48, 0] : dir === "signup" ? [48, 0] : 0 }}
                  transition={{ duration: 0.6, ease: PREMIUM_EASE }}
                  className="relative"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                      transition={{ duration: 0.34, ease: PREMIUM_EASE }}
                      className="relative"
                    >
                      <h2 className="text-3xl font-semibold tracking-tight text-white">
                        {copy.title}
                      </h2>
                      <p className="mx-auto mt-4 max-w-[22rem] text-sm leading-relaxed text-white/60">
                        {copy.body}
                      </p>
                      <motion.button
                        type="button"
                        onClick={() => switchMode(copy.target)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-9 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/20 hover:shadow-[0_12px_32px_-12px_rgba(255,255,255,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                      >
                        {copy.cta}
                        <IconArrow />
                      </motion.button>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile: one form at a time, slide-swap on toggle */}
            <div className="px-6 py-9 sm:px-10 md:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                >
                  {mode === "login" ? (
                    <LoginFormBody onSwitch={() => switchMode("signup")} />
                  ) : (
                    <SignupFormBody onSwitch={() => switchMode("login")} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
