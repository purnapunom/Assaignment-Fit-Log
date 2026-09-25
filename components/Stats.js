import { Clock, Flame, Star } from "lucide-react";
export default function Stats({ w }) {
  return (
    <div className="flex items-center gap-4 text-xs text-neutral-300">
      <span className="flex items-center gap-1"><Clock size={14} className="text-accent" />{w.duration} min</span>
      <span className="flex items-center gap-1"><Flame size={14} className="text-accent" />{w.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1"><Star size={14} className="text-accent" />{w.rating}</span>
    </div>
  );
}
