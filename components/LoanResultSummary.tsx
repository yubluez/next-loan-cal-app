"use client";

import { LoanCalculationResult, LoanInput } from "@/types/loan";
import { formatCurrency } from "@/lib/loanCalculator";
import {
  CreditCard,
  Percent,
  Coins,
  ReceiptText,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

interface LoanResultSummaryProps {
  input: LoanInput;
  result: LoanCalculationResult;
}

export default function LoanResultSummary({
  input,
  result,
}: LoanResultSummaryProps) {
  const principal = input.loanAmount;
  const totalPayment = result.totalPayment;
  const totalInterest = result.totalInterest;

  // คำนวณสัดส่วนเงินต้นและดอกเบี้ย (%)
  const principalPercent =
    totalPayment > 0 ? ((principal / totalPayment) * 100).toFixed(1) : "100";
  const interestPercent =
    totalPayment > 0 ? ((totalInterest / totalPayment) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* 1. ค่างวดรายเดือน (M) - แสดงเด่นชัดที่สุดในหน้าตามโจทย์ */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-6 text-white shadow-xl shadow-emerald-700/20 sm:p-8">
        {/* Decorative background blurs */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-100 backdrop-blur-md">
              <CreditCard className="h-3.5 w-3.5" />
              <span>ค่างวดรายเดือน (Annuity Payment)</span>
            </div>
            <span className="text-xs text-emerald-200">
              จำนวน {result.totalMonths} งวด
            </span>
          </div>

          <div className="mt-4 flex flex-col items-baseline sm:flex-row sm:gap-2">
            <span className="text-xs font-medium text-emerald-200 uppercase tracking-wider mb-1 sm:mb-0">
              ยอดผ่อนชำระงวดละ
            </span>
          </div>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-sm font-mono">
              ฿{formatCurrency(result.monthlyPayment)}
            </span>
            <span className="text-base sm:text-lg font-medium text-emerald-200">
              / เดือน
            </span>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
            * ค่างวดรายเดือนคำนวณแบบเงินงวดเท่ากันทุกเดือน (Annuity Formula)
            โดยแบ่งเป็นสัดส่วนตัดเงินต้นและดอกเบี้ยตามยอดหนี้คงเหลือ
          </p>
        </div>
      </div>

      {/* 2. สรุปยอดดอกเบี้ยรวม และ ยอดชำระรวมทั้งหมด */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* ดอกเบี้ยรวมตลอดสัญญา */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Percent className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                ยอดดอกเบี้ยรวมตลอดสัญญา
              </p>
              <p className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-mono">
                ฿{formatCurrency(totalInterest)}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
            <span>คิดเป็นสัดส่วน</span>
            <span className="font-semibold text-amber-600">
              {interestPercent}% ของยอดชำระรวม
            </span>
          </div>
        </div>

        {/* ยอดชำระรวมทั้งหมด (เงินต้น + ดอกเบี้ย) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ReceiptText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                ยอดชำระรวมทั้งหมด (เงินต้น + ดอกเบี้ย)
              </p>
              <p className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-mono">
                ฿{formatCurrency(totalPayment)}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
            <span>เงินต้น ฿{formatCurrency(principal)}</span>
            <span className="font-semibold text-blue-600">
              {principalPercent}% ของยอดชำระรวม
            </span>
          </div>
        </div>
      </div>

      {/* 3. แถบแสดงสัดส่วนเงินต้น vs ดอกเบี้ย (Visual Ratio Bar) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            สัดส่วนการชำระเงินทั้งหมด
          </span>
          <span className="text-xs text-slate-500">
            รวม ฿{formatCurrency(totalPayment)}
          </span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 flex shadow-inner">
          <div
            style={{ width: `${principalPercent}%` }}
            className="h-full bg-emerald-500 transition-all duration-500"
            title={`เงินต้น: ${principalPercent}%`}
          />
          <div
            style={{ width: `${interestPercent}%` }}
            className="h-full bg-amber-400 transition-all duration-500"
            title={`ดอกเบี้ย: ${interestPercent}%`}
          />
        </div>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-600">
              เงินต้น: <strong className="text-slate-900">{principalPercent}%</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-400 shrink-0" />
            <span className="text-slate-600">
              ดอกเบี้ย: <strong className="text-slate-900">{interestPercent}%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 4. สรุปรายละเอียดเงื่อนไขเงินกู้ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Coins className="h-3 w-3 text-slate-400" />
            วงเงินต้นเริ่มต้น (P)
          </span>
          <p className="mt-1 text-sm font-bold text-slate-800 font-mono">
            ฿{formatCurrency(principal)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <CalendarCheck className="h-3 w-3 text-slate-400" />
            จำนวนงวดผ่อนชำระ (n)
          </span>
          <p className="mt-1 text-sm font-bold text-slate-800 font-mono">
            {result.totalMonths} งวด{" "}
            <span className="text-xs font-normal text-slate-500">
              ({(result.totalMonths / 12).toFixed(1)} ปี)
            </span>
          </p>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl bg-slate-50 border border-slate-200/80 p-3">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Percent className="h-3 w-3 text-slate-400" />
            อัตราดอกเบี้ยต่อเดือน (r)
          </span>
          <p className="mt-1 text-sm font-bold text-slate-800 font-mono">
            {(result.monthlyInterestRate * 100).toFixed(4)} % / เดือน
          </p>
        </div>
      </div>
    </div>
  );
}
