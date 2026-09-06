"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Home, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Loan<span className="text-emerald-600">Smart</span>
              </span>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              เครื่องคำนวณสินเชื่อและผ่อนชำระ
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-slate-100 text-emerald-700 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>หน้าหลัก</span>
          </Link>

          <Link
            href="/loancal"
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all shadow-sm ${
              pathname === "/loancal"
                ? "bg-emerald-600 text-white shadow-emerald-600/25 ring-2 ring-emerald-600/20"
                : "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>หน้าคำนวณ</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
