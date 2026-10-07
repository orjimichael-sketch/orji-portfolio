import type { Metadata } from "next";
import JiggyLoginForm from "@/components/JiggyLoginForm";

export const metadata: Metadata = {
  title: "Jiggy's Login Form",
  description:
    "A glassmorphism double-slider login form built with React, Tailwind CSS, and Framer Motion.",
};

export default function GlassyLoginPage() {
  return (
    <main className="min-h-svh bg-[#07070b]">
      <JiggyLoginForm />
    </main>
  );
}
