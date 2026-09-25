import "./globals.css";
import { Oswald, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata = { title: "FitLog — Workout Library", description: "Pick a lift, lock it into today's plan." };
export default function RootLayout({ children }) {
  return (
    <html lang="en"><body className={`${oswald.variable} ${inter.variable} font-sans min-h-screen flex flex-col`}>
      <Providers><Navbar /><main className="flex-1">{children}</main><Footer /></Providers>
    </body></html>
  );
}
