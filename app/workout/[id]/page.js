"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";
import { useApp } from "@/components/Providers";
export default function Detail() {
  const { id } = useParams(); const { plan, addPlan, addSaved } = useApp();
  const [w, setW] = useState(null); const [missing, setMissing] = useState(false);
  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`).then((r) => (r.ok ? r.json() : Promise.reject())).then((d) => (d && d.id ? setW(d) : setMissing(true))).catch(() => setMissing(true));
  }, [id]);
  if (missing) notFound();
  if (!w) return <div className="flex justify-center py-32"><div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" /></div>;
  const specs = [["Equipment", w.equipment], ["Difficulty", w.difficulty], ["Sets", w.sets], ["Reps", w.reps], ["Duration", `${w.duration} min`], ["Calories", `${w.caloriesBurned} kcal`], ["Rating", w.rating]];
  const full = plan.length >= 5 && !plan.some((p) => p.id === w.id);
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
      <img src={w.image} alt={w.name} className="w-full rounded-xl border border-line object-cover lg:h-full" />
      <div>
        <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">{w.name}</h1>
        <p className="mt-3 text-neutral-400">{w.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{w.muscleGroups.map((m) => <span key={m} className="tag">{m}</span>)}</div>
        <h2 className="mb-2 mt-8 font-display text-xl uppercase text-accent">Key Specs</h2>
        <dl className="divide-y divide-line rounded-lg border border-line bg-card">
          {specs.map(([k, v]) => <div key={k} className="flex justify-between px-4 py-2.5 text-sm"><dt className="uppercase tracking-wider text-neutral-400">{k}</dt><dd className="font-semibold">{v}</dd></div>)}
        </dl>
        <h2 className="mb-2 mt-8 font-display text-xl uppercase text-accent">Instructions</h2>
        <ol className="space-y-3">{w.instructions.map((s, i) => <li key={i} className="flex gap-3 text-sm"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-black">{i + 1}</span>{s}</li>)}</ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => addPlan(w)} disabled={full} className="btn-p"><Plus size={16} />Add to today's plan</button>
          <button onClick={() => addSaved(w)} className="btn-s"><Bookmark size={16} />Save for later</button>
        </div>
        {full && <p className="mt-2 text-xs text-neutral-400">Today's plan is full (5 lifts).</p>}
      </div>
    </div>
  );
}
