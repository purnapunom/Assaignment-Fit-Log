"use client";
import { useState } from "react";
import { Dumbbell } from "lucide-react";
export default function Logo({ size = 24 }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Dumbbell className="text-accent" size={size} />;
  return <img src="/logo.png" alt="FitLog logo" width={size} height={size} style={{ height: size, width: "auto" }} onError={() => setFailed(true)} />;
}
