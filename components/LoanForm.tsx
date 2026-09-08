"use client";

import { LoanInput, TermUnit } from "@/types/loan";
import { formatNumber } from "@/lib/loanCalculator";
import {
  Banknote,
  Percent,
  Calendar,
  RotateCcw,
} from "lucide-react";

interface LoanFormProps {
  input: LoanInput;
  onChange: (updated: LoanInput) => void;
  onReset: () => void;
}

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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl transition-all sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            ระบุข้อมูลสินเชื่อ (Input)
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            กรอกยอดเงินกู้ อัตราดอกเบี้ย และระยะเวลาผ่อนชำระเพื่อคำนวณค่างวด
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. ยอดเงินกู้ (บาท) */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="loanAmount"
              className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200"
            >
              <Banknote className="h-4 w-4 text-purple-400" />
              <span>ยอดเงินกู้ (บาท)</span>
            </label>
            <span className="text-xs font-mono text-purple-400 font-medium">
              {formatNumber(input.loanAmount)} บาท
            </span>
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <span className="text-sm font-semibold text-zinc-400">฿</span>
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
              className="block w-full rounded-xl border border-zinc-700 bg-zinc-950/70 py-3 pl-8 pr-12 text-white text-base font-semibold placeholder:text-zinc-600 transition-all focus:border-purple-500 focus:bg-zinc-950 focus:outline-none focus:ring-4 focus:ring-purple-500/20"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs font-medium text-zinc-400">บาท</span>
            </div>
          </div>
        </div>

        {/* 2. อัตราดอกเบี้ยต่อปี (%) */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="annualInterestRate"
              className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200"
            >
              <Percent className="h-4 w-4 text-purple-400" />
              <span>อัตราดอกเบี้ยต่อปี (%)</span>
            </label>
            <span className="text-xs font-mono text-purple-400 font-medium">
              {input.annualInterestRate} % ต่อปี
            </span>
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Percent className="h-4 w-4 text-zinc-500" />
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
              className="block w-full rounded-xl border border-zinc-700 bg-zinc-950/70 py-3 pl-10 pr-12 text-white text-base font-semibold placeholder:text-zinc-600 transition-all focus:border-purple-500 focus:bg-zinc-950 focus:outline-none focus:ring-4 focus:ring-purple-500/20"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs font-medium text-zinc-400">% / ปี</span>
            </div>
          </div>
        </div>

        {/* 3. ระยะเวลาผ่อนชำระ พร้อม toggle เลือกหน่วยเป็นเดือน / ปี */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="loanTerm"
              className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200"
            >
              <Calendar className="h-4 w-4 text-purple-400" />
              <span>ระยะเวลาผ่อนชำระ</span>
            </label>

            {/* Toggle หน่วย เดือน / ปี */}
            <div className="inline-flex rounded-lg bg-zinc-800 p-0.5 border border-zinc-700/60">
              <button
                type="button"
                onClick={() => handleUnitToggle("years")}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                  input.termUnit === "years"
                    ? "bg-purple-600 text-white font-bold shadow-xs"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ปี (Years)
              </button>
              <button
                type="button"
                onClick={() => handleUnitToggle("months")}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                  input.termUnit === "months"
                    ? "bg-purple-600 text-white font-bold shadow-xs"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                เดือน (Months)
              </button>
            </div>
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Calendar className="h-4 w-4 text-zinc-500" />
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
              className="block w-full rounded-xl border border-zinc-700 bg-zinc-950/70 py-3 pl-10 pr-20 text-white text-base font-semibold placeholder:text-zinc-600 transition-all focus:border-purple-500 focus:bg-zinc-950 focus:outline-none focus:ring-4 focus:ring-purple-500/20"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs font-medium text-zinc-300">
                {input.termUnit === "years" ? "ปี" : "เดือน"}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-zinc-950/80 p-3.5 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
          title="รีเซ็ตค่าเริ่มต้น"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>รีเซ็ต</span>
        </button>
      </div>
    </div>
  );
}
