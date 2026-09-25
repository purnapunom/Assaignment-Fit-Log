# 🏋️ FitLog — Workout Library

A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

## Technologies
Next.js 14 (App Router) · React 18 · Tailwind CSS · lucide-react · Oswald + Inter (next/font)

## Features
1. Responsive workout library grid (3 columns on desktop, stacks on mobile)
2. Sort by Duration / Calories / Rating, plus search by name or muscle tag
3. Workout detail page with specs table and step-by-step instructions
4. "Add to today's plan" (5-lift cap) and "Save for later" with live navbar counters and toasts
5. My Plan page with live Exercises / Minutes / Calories metrics, Mark as Done and Remove
6. Data persisted in localStorage, loading states, empty states and a custom 404 page

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Push to GitHub and import into Vercel (zero config). All routes are handled by Next.js, so reloads never break.
