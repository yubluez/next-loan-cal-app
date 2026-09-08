"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Home, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-600/25 group-hover:scale-105 transition-transform">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white">
              Loan<span className="text-purple-400 ml-1">Calculator</span>
            </span>
            <p className="text-[11px] text-zinc-400">
              เครื่องคำนวณสินเชื่อและผ่อนชำระ
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
