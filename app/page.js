"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ChevronDown, Search } from "lucide-react";
import Stats from "@/components/Stats";
const API = "https://api.abcz.workers.dev/api/fitlog";
export default function Home() {
  const [items, setItems] = useState(null); const [err, setErr] = useState(false);
  const [sort, setSort] = useState("duration"); const [q, setQ] = useState("");
  useEffect(() => { fetch(API).then((r) => r.json()).then(setItems).catch(() => setErr(true)); }, []);
  const list = useMemo(() => {
    if (!items) return [];
    const s = q.toLowerCase();
    const f = items.filter((w) => w.name.toLowerCase().includes(s) || w.muscleGroups.some((m) => m.toLowerCase().includes(s)));
    return [...f].sort((a, b) => sort === "duration" ? a.duration - b.duration : sort === "calories" ? b.caloriesBurned - a.caloriesBurned : b.rating - a.rating);
  }, [items, sort, q]);
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="mb-3 font-display text-sm tracking-[0.3em] text-accent">WORKOUT LIBRARY</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-none sm:text-6xl">Train with intent. Log every set.</h1>
          <p className="mt-5 max-w-xl text-neutral-400">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.</p>
          <a href="#library" className="btn-p mt-8">Browse workouts <ArrowDown size={16} /></a>
        </div>
        <img src="/hero.png" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740"; }} alt="Fitness illustration" className="aspect-square w-full max-w-md justify-self-center rounded-xl border border-line bg-white object-contain p-4" />
      </section>
      <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl uppercase">The Library</h2>
            <p className="text-neutral-400">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="relative"><Search size={14} className="absolute left-3 top-3.5 text-neutral-500" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or tag" className="w-48 rounded-md border border-line bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-accent" /></label>
            <label className="relative flex items-center text-sm">
              <span className="mr-2 text-neutral-400">Sort By</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none rounded-md border border-line bg-card py-2.5 pl-3 pr-9 outline-none focus:border-accent">
                <option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3" />
            </label>
          </div>
        </div>
        {!items && !err && <div className="flex justify-center py-20"><div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" aria-label="Loading" /></div>}
        {err && <p className="py-10 text-center text-red-400">Couldn't load workouts. Please refresh.</p>}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w) => (
            <Link key={w.id} href={`/workout/${w.id}`} className="group overflow-hidden rounded-xl border border-line bg-card transition hover:border-accent">
              <img src={w.image} alt={w.name} className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
              <div className="space-y-2 p-4">
                <div className="flex flex-wrap gap-1.5">{w.muscleGroups.map((m) => <span key={m} className="tag">{m}</span>)}</div>
                <h3 className="font-display text-xl uppercase">{w.name}</h3>
                <p className="text-sm text-neutral-400">{w.equipment}</p>
                <Stats w={w} />
              </div>
            </Link>
          ))}
        </div>
        {items && list.length === 0 && <p className="py-10 text-center text-neutral-400">No workouts match your search.</p>}
      </section>
    </>
  );
}
