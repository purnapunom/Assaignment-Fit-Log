"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useApp } from "./Providers";
export default function Navbar() {
  const path = usePathname(); const { plan, saved } = useApp();
  const link = (href, label, active) => (
    <Link href={href} className={`px-3 py-1.5 rounded-md font-display uppercase tracking-wide text-sm ${active ? "bg-accent/10 text-accent" : "text-neutral-300 hover:text-white"}`}>{label}</Link>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl tracking-wider"><Logo size={28} />FITLOG</Link>
        <div className="order-3 flex w-full justify-center gap-2 sm:order-none sm:w-auto">
          {link("/", "Workout", path === "/" || path.startsWith("/workout"))}
          {link("/my-plan", "My Plan", path === "/my-plan")}
        </div>
        <Link href="/my-plan" className="flex gap-2 text-xs font-semibold">
          <span className="rounded-full bg-accent px-3 py-1 text-black">Plan {plan.length}</span>
          <span className="rounded-full border border-accent px-3 py-1 text-accent">Saved {saved.length}</span>
        </Link>
      </nav>
    </header>
  );
}
