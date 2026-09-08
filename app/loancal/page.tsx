"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { LoanInput } from "@/types/loan";
import { calculateLoan } from "@/lib/loanCalculator";
import LoanForm from "@/components/LoanForm";
import LoanResultSummary from "@/components/LoanResultSummary";
import AmortizationTable from "@/components/AmortizationTable";
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Calculator,
  Building2,
  Car,
  User,
} from "lucide-react";

// ค่าเริ่มต้นสำหรับการคำนวณ (ตัวอย่างสินเชื่อบ้าน 1,000,000 บาท ดอกเบี้ย 5% ผ่อน 30 ปี)
const DEFAULT_INPUT: LoanInput = {
  loanAmount: 1000000,
  annualInterestRate: 5.0,
  loanTerm: 30,
  termUnit: "years",
};

export default function LoanCalculatorPage() {
  const [loanInput, setLoanInput] = useState<LoanInput>(DEFAULT_INPUT);

  // คำนวณผลลัพธ์แบบ Memoized เพื่อประสิทธิภาพสูง
  const result = useMemo(() => {
    return calculateLoan(loanInput);
  }, [loanInput]);

  const handleReset = () => {
    setLoanInput({
      loanAmount: 0,
      annualInterestRate: 0,
      loanTerm: 0,
      termUnit: "years",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 pt-6 sm:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>กลับสู่หน้าหลัก</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/30">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>คำนวณแบบ Real-time</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/25">
              <Calculator className="h-6 w-6" />
            </span>
            เครื่องคำนวณสินเชื่อ / ผ่อนชำระ
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            ระบุยอดเงินกู้ อัตราดอกเบี้ยต่อปี และระยะเวลาผ่อนชำระ
            ระบบจะคำนวณค่างวดรายเดือนและแจกแจงตารางผ่อนชำระทุกงวดทันที
          </p>
        </div>

        {/* Top Grid: Left = Input Form, Right = Summary Result */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Form Input Column (5 cols on lg) */}
          <div className="lg:col-span-5">
            <LoanForm
              input={loanInput}
              onChange={setLoanInput}
              onReset={handleReset}
            />
          </div>

          {/* Results Summary Column (7 cols on lg) */}
          <div className="lg:col-span-7">
            <LoanResultSummary input={loanInput} result={result} />
          </div>
        </div>

        {/* Bottom Section: Amortization Schedule Table */}
        <div className="mt-12">
          <AmortizationTable
            schedule={result.schedule}
            loanAmount={loanInput.loanAmount}
          />
        </div>
      </div>
    </div>
  );
}
