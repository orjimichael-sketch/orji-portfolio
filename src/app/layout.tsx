import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { profile, socials } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: "Orji Michael — Full-Stack Developer & Digital Professional",
    template: "%s — Orji Michael",
  },
  description:
    "Portfolio of Orji Michael — full-stack developer in Nigeria building complete web applications, with a background in client communication, virtual assistance, and digital operations.",
  keywords: [
    "Orji Michael",
    "Full-Stack Developer",
    "Frontend Developer",
    "Next.js",
    "Nigeria",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Orji Michael — Full-Stack Developer & Digital Professional",
    description:
      "Full-stack developer building complete web applications — with real experience in client communication and digital operations.",
    url: "/",
    siteName: "Orji Michael",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orji — Full-Stack Developer & Digital Professional",
    description:
      "Full-stack developer building complete web applications — with real experience in client communication and digital operations.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#e8eaee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    sameAs: socials.map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Keep all content visible when JavaScript is unavailable */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
