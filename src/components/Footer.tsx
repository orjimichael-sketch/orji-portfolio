import { nav, profile, socials } from "@/content/site";
import { SocialIcon } from "@/lib/social-icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-[1240px] px-4 pb-6 sm:px-6">
      <div className="mt-10 rounded-[var(--radius-card)] bg-ink p-6 sm:mt-14 sm:p-10 lg:mt-20 lg:p-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="text-[15px] font-semibold tracking-[0.04em] text-white">
              {profile.wordmark}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {profile.role} — {profile.location}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-block text-sm text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ul className="flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/50">
            © {year} {profile.name}
          </p>
          <a
            href="#home"
            className="text-[12px] text-white/50 transition-colors hover:text-white"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
