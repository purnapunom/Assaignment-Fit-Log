import Link from "next/link";
export default function NotFound() {
  return (
    <div className="px-4 py-28 text-center">
      <p className="font-display text-8xl text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl uppercase">Page not found</h1>
      <p className="mt-2 text-neutral-400">That rep didn't count. The page you're after doesn't exist.</p>
      <Link href="/" className="btn-p mt-6">Back to workouts</Link>
    </div>
  );
}
