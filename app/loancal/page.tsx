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
    setLoanInput(DEFAULT_INPUT);
  };

  // ตัวอย่างแบบสำเร็จรูป (Preset Scenarios)
  const applyScenario = (preset: LoanInput) => {
    setLoanInput(preset);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-6 sm:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>กลับสู่หน้าหลัก</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>คำนวณแบบ Real-time</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <Calculator className="h-6 w-6" />
            </span>
            เครื่องคำนวณสินเชื่อ / ผ่อนชำระ
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            ระบุยอดเงินกู้ อัตราดอกเบี้ยต่อปี และระยะเวลาผ่อนชำระ
            ระบบจะคำนวณค่างวดรายเดือนและแจกแจงตารางผ่อนชำระทุกงวดทันที
          </p>
        </div>

        {/* Quick Scenario Preset Chips */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-600" />
              <span>เลือกกรณีตัวอย่างด่วน:</span>
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  applyScenario({
                    loanAmount: 2500000,
                    annualInterestRate: 3.5,
                    loanTerm: 30,
                    termUnit: "years",
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition-all"
              >
                <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>สินเชื่อบ้าน 2.5 ล้าน (3.5% / 30 ปี)</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  applyScenario({
                    loanAmount: 700000,
                    annualInterestRate: 4.5,
                    loanTerm: 60,
                    termUnit: "months",
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 transition-all"
              >
                <Car className="h-3.5 w-3.5 text-teal-600" />
                <span>สินเชื่อรถ 7 แสน (4.5% / 60 เดือน)</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  applyScenario({
                    loanAmount: 150000,
                    annualInterestRate: 9.0,
                    loanTerm: 24,
                    termUnit: "months",
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-800 transition-all"
              >
                <User className="h-3.5 w-3.5 text-indigo-600" />
                <span>สินเชื่อส่วนบุคคล 1.5 แสน (9% / 24 เดือน)</span>
              </button>
            </div>
          </div>
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
