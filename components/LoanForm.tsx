"use client";

import { LoanInput, TermUnit } from "@/types/loan";
import { formatNumber } from "@/lib/loanCalculator";
import {
  Banknote,
  Percent,
  Calendar,
  RotateCcw,
  Sparkles,
  HelpCircle,
} from "lucide-react";

interface LoanFormProps {
  input: LoanInput;
  onChange: (updated: LoanInput) => void;
  onReset: () => void;
}

const AMOUNT_PRESETS = [
  { label: "1 แสน", value: 100000 },
  { label: "5 แสน", value: 500000 },
  { label: "1 ล้าน", value: 1000000 },
  { label: "3 ล้าน", value: 3000000 },
  { label: "5 ล้าน", value: 5000000 },
];

const RATE_PRESETS = [
  { label: "2.5% (บ้าน MRR พิเศษ)", value: 2.5 },
  { label: "3.75% (สินเชื่อบ้าน)", value: 3.75 },
  { label: "5.5% (สินเชื่อรถ)", value: 5.5 },
  { label: "8.0% (สินเชื่อบุคคล)", value: 8.0 },
];

export default function LoanForm({ input, onChange, onReset }: LoanFormProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange({ ...input, loanAmount: isNaN(val) ? 0 : val });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange({ ...input, annualInterestRate: isNaN(val) ? 0 : val });
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange({ ...input, loanTerm: isNaN(val) ? 0 : val });
  };

  const handleUnitToggle = (unit: TermUnit) => {
    if (unit === input.termUnit) return;

    // แปลงค่าอัตโนมัติเมื่อสลับหน่วย เพื่อความสะดวกของผู้ใช้
    let newTerm = input.loanTerm;
    if (unit === "months" && input.termUnit === "years") {
      newTerm = Math.round(input.loanTerm * 12);
    } else if (unit === "years" && input.termUnit === "months") {
      newTerm = Math.max(1, Math.round(input.loanTerm / 12));
    }

    onChange({
      ...input,
      termUnit: unit,
      loanTerm: newTerm,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              1
            </span>
            ระบุข้อมูลสินเชื่อ (Input)
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            กรอกยอดเงินกู้ อัตราดอกเบี้ย และระยะเวลาผ่อนชำระเพื่อคำนวณค่างวด
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          title="รีเซ็ตค่าเริ่มต้น"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>รีเซ็ต</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* 1. ยอดเงินกู้ (บาท) */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="loanAmount"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-800"
            >
              <Banknote className="h-4 w-4 text-emerald-600" />
              <span>ยอดเงินกู้ (บาท)</span>
            </label>
            <span className="text-xs font-mono text-emerald-700 font-medium">
              {formatNumber(input.loanAmount)} บาท
            </span>
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <span className="text-sm font-semibold text-slate-500">฿</span>
            </div>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              min="0"
              step="10000"
              value={input.loanAmount === 0 ? "" : input.loanAmount}
              onChange={handleAmountChange}
              placeholder="เช่น 1,000,000"
              className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-8 pr-12 text-slate-900 text-base font-semibold transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs font-medium text-slate-400">บาท</span>
            </div>
          </div>

          {/* Quick presets for loan amount */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="text-[11px] text-slate-400 self-center mr-1">
              ยอดฮิต:
            </span>
            {AMOUNT_PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => onChange({ ...input, loanAmount: p.value })}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  input.loanAmount === p.value
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. อัตราดอกเบี้ยต่อปี (%) */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="annualInterestRate"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-800"
            >
              <Percent className="h-4 w-4 text-emerald-600" />
              <span>อัตราดอกเบี้ยต่อปี (%)</span>
            </label>
            <span className="text-xs font-mono text-emerald-700 font-medium">
              {input.annualInterestRate} % ต่อปี
            </span>
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Percent className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="number"
              id="annualInterestRate"
              name="annualInterestRate"
              min="0"
              max="100"
              step="0.05"
              value={
                input.annualInterestRate === 0 ? "" : input.annualInterestRate
              }
              onChange={handleRateChange}
              placeholder="เช่น 5.0"
              className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-12 text-slate-900 text-base font-semibold transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs font-medium text-slate-400">%/ปี</span>
            </div>
          </div>

          {/* Quick presets for interest rate */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {RATE_PRESETS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() =>
                  onChange({ ...input, annualInterestRate: r.value })
                }
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  input.annualInterestRate === r.value
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. ระยะเวลาผ่อนชำระ พร้อม toggle เลือกหน่วยเป็นเดือน / ปี */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="loanTerm"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-800"
            >
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span>ระยะเวลาผ่อนชำระ</span>
            </label>

            {/* Toggle หน่วย เดือน / ปี */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
              <button
                type="button"
                onClick={() => handleUnitToggle("years")}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                  input.termUnit === "years"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                ปี (Years)
              </button>
              <button
                type="button"
                onClick={() => handleUnitToggle("months")}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                  input.termUnit === "months"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                เดือน (Months)
              </button>
            </div>
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Calendar className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="number"
              id="loanTerm"
              name="loanTerm"
              min="1"
              max={input.termUnit === "years" ? 50 : 600}
              step="1"
              value={input.loanTerm === 0 ? "" : input.loanTerm}
              onChange={handleTermChange}
              placeholder={input.termUnit === "years" ? "เช่น 30" : "เช่น 360"}
              className="block w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-20 text-slate-900 text-base font-semibold transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {input.termUnit === "years" ? "ปี" : "เดือน"}
              </span>
            </div>
          </div>

          {/* Quick presets for term */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-slate-400 mr-1">ระยะเวลาแนะนำ:</span>
            {input.termUnit === "years" ? (
              <>
                {[1, 3, 5, 10, 15, 20, 25, 30].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => onChange({ ...input, loanTerm: yr })}
                    className={`rounded-md px-2 py-0.5 text-xs font-medium transition-all ${
                      input.loanTerm === yr
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {yr} ปี
                  </button>
                ))}
              </>
            ) : (
              <>
                {[12, 24, 36, 48, 60, 120, 240, 360].map((mo) => (
                  <button
                    key={mo}
                    type="button"
                    onClick={() => onChange({ ...input, loanTerm: mo })}
                    className={`rounded-md px-2 py-0.5 text-xs font-medium transition-all ${
                      input.loanTerm === mo
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {mo} ด.
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Informative Tip */}
        <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 text-xs text-slate-600 border border-slate-200/70">
          <HelpCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-700">การคำนวณแบบ Real-time:</span>{" "}
            เมื่อคุณแก้ไขตัวเลขในช่องด้านบน
            ระบบจะอัปเดตค่างวดรายเดือนและตารางผ่อนชำระให้ทันทีอัตโนมัติ
          </div>
        </div>
      </div>
    </div>
  );
}
