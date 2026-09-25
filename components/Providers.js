"use client";
import { createContext, useContext, useEffect, useState } from "react";
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);
export function Providers({ children }) {
  const [plan, setPlan] = useState([]); // [{id, done}]
  const [saved, setSaved] = useState([]); // [id]
  const [toast, setToast] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem("fitlog") || "{}"); setPlan(d.plan || []); setSaved(d.saved || []); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("fitlog", JSON.stringify({ plan, saved })); }, [plan, saved, ready]);
  const say = (m) => { setToast(m); clearTimeout(window.__t); window.__t = setTimeout(() => setToast(null), 2200); };
  const addPlan = (w) => {
    if (plan.some((p) => p.id === w.id)) return say("Already in today's plan");
    if (plan.length >= 5) return say("Plan is full — 5 lifts max");
    setPlan([...plan, { id: w.id, done: false }]); say("Added to today's plan");
  };
  const addSaved = (w) => {
    if (saved.includes(w.id)) return say("Already saved");
    setSaved([...saved, w.id]); say("Saved for later");
  };
  const remove = (kind, id) => {
    if (kind === "plan") setPlan(plan.filter((p) => p.id !== id)); else setSaved(saved.filter((s) => s !== id));
    say("Removed");
  };
  const markDone = (id) => { setPlan(plan.map((p) => (p.id === id ? { ...p, done: true } : p))); say("Marked as done 💪"); };
  return (
    <Ctx.Provider value={{ plan, saved, addPlan, addSaved, remove, markDone }}>
      {children}
      {toast && <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-black shadow-lg">{toast}</div>}
    </Ctx.Provider>
  );
}
