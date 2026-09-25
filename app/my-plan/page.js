"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useApp } from "@/components/Providers";
import Stats from "@/components/Stats";
export default function MyPlan() {
  const { plan, saved, remove, markDone } = useApp();
  const [all, setAll] = useState(null); const [tab, setTab] = useState("plan");
  useEffect(() => { fetch("https://api.abcz.workers.dev/api/fitlog").then((r) => r.json()).then(setAll).catch(() => setAll([])); }, []);
  const rows = all ? (tab === "plan" ? plan : saved.map((id) => ({ id }))).map((p) => ({ ...p, w: all.find((x) => x.id === p.id) })).filter((r) => r.w) : [];
  const planned = all ? plan.map((p) => all.find((x) => x.id === p.id)).filter(Boolean) : [];
  const sum = (k) => planned.reduce((a, w) => a + w[k], 0);
  const metrics = [["Exercises", planned.length], ["Minutes", sum("duration")], ["Calories", sum("caloriesBurned")]];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-bold uppercase">My Plan</h1>
      <p className="mt-1 text-neutral-400">Cap of five lifts for today. Finish them, then load more.</p>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {metrics.map(([k, v]) => <div key={k} className="rounded-lg border border-line bg-card p-4"><p className="font-display text-3xl text-accent">{v}</p><p className="text-xs uppercase tracking-wider text-neutral-400">{k}</p></div>)}
      </div>
      <div className="mt-8 flex gap-2 border-b border-line">
        {[["plan", `Today's Plan (${plan.length})`], ["saved", `Saved (${saved.length})`]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 px-4 py-2 font-display uppercase tracking-wide ${tab === k ? "border-accent text-accent" : "border-transparent text-neutral-400"}`}>{l}</button>
        ))}
      </div>
      {!all && <p className="py-12 text-center text-neutral-400">Loading workouts…</p>}
      {all && rows.length === 0 && (
        <div className="py-16 text-center">
          <h2 className="font-display text-3xl uppercase">Nothing here yet</h2>
          <p className="mt-2 text-neutral-400">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn-p mt-6">Go to workouts</Link>
        </div>
      )}
      <ul className="mt-6 space-y-3">
        {rows.map(({ w, done }) => (
          <li key={w.id} className={`flex flex-col gap-4 rounded-xl border border-line bg-card p-3 sm:flex-row sm:items-center ${done ? "opacity-60" : ""}`}>
            <img src={w.image} alt={w.name} className="h-32 w-full rounded-lg object-cover sm:h-20 sm:w-28" />
            <div className="flex-1 space-y-1">
              <h3 className={`font-display text-lg uppercase ${done ? "line-through" : ""}`}>{w.name}</h3>
              <p className="text-sm text-neutral-400">{w.equipment}</p>
              <Stats w={w} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/workout/${w.id}`} className="btn-s !px-3 !py-2">View Details</Link>
              {tab === "plan" && <button disabled={done} onClick={() => markDone(w.id)} className="btn-p !px-3 !py-2"><Check size={14} />{done ? "Done" : "Mark as Done"}</button>}
              <button aria-label="Remove" onClick={() => remove(tab, w.id)} className="rounded-md border border-line p-2 hover:border-red-400 hover:text-red-400"><X size={16} /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
