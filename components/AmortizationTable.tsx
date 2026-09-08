"use client";

import { useState, useMemo } from "react";
import { AmortizationScheduleItem } from "@/types/loan";
import { formatCurrency } from "@/lib/loanCalculator";
import {
  Table,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  FileSpreadsheet,
} from "lucide-react";

interface AmortizationTableProps {
  schedule: AmortizationScheduleItem[];
  loanAmount: number;
}

export default function AmortizationTable({
  schedule,
  loanAmount,
}: AmortizationTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12); // เริ่มต้นแสดง 12 งวด (1 ปี)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  // จำนวนปีทั้งหมดที่มีในตาราง
  const totalYears = Math.ceil(schedule.length / 12);

  // กรองตารางตามปีที่เลือก และคำค้นหางวด
  const filteredSchedule = useMemo(() => {
    return schedule.filter((item) => {
      // กรองตามปี
      if (selectedYear !== "all") {
        const itemYear = Math.ceil(item.installmentNo / 12);
        if (itemYear !== selectedYear) return false;
      }

      // กรองตามคำค้นหา
      if (searchQuery.trim() !== "") {
        const query = searchQuery.trim();
        const matchesInstallment = item.installmentNo.toString() === query;
        return matchesInstallment;
      }

      return true;
    });
  }, [schedule, selectedYear, searchQuery]);

  // คำนวณการแบ่งหน้า (Pagination)
  const totalPages =
    pageSize === -1
      ? 1
      : Math.ceil(filteredSchedule.length / (pageSize || 12));

  const paginatedSchedule = useMemo(() => {
    if (pageSize === -1) return filteredSchedule;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSchedule.slice(startIndex, startIndex + pageSize);
  }, [filteredSchedule, currentPage, pageSize]);

  // เมื่อเปลี่ยนฟิลเตอร์ ให้กลับไปหน้า 1
  const handleYearChange = (yr: number | "all") => {
    setSelectedYear(yr);
    setCurrentPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  // ฟังก์ชันดาวน์โหลดรายงานเป็น CSV
  const handleExportCSV = () => {
    if (schedule.length === 0) return;

    const headers = [
      "งวดที่ (Installment)",
      "ค่างวด (Payment)",
      "ตัดเงินต้น (Principal)",
      "ตัดดอกเบี้ย (Interest)",
      "เงินต้นคงเหลือ (Remaining Balance)",
    ];

    const rows = schedule.map((row) => [
      row.installmentNo,
      row.payment.toFixed(2),
      row.principalPaid.toFixed(2),
      row.interestPaid.toFixed(2),
      row.remainingBalance.toFixed(2),
    ]);

    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `amortization_schedule_${loanAmount}_baht.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (schedule.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-8 text-center shadow-xl">
        <Table className="mx-auto h-12 w-12 text-zinc-600" />
        <h3 className="mt-3 text-base font-semibold text-white">
          ยังไม่มีข้อมูลตารางการผ่อนชำระ
        </h3>
        <p className="mt-1 text-xs text-zinc-400">
          กรุณาระบุยอดเงินกู้ อัตราดอกเบี้ย และระยะเวลาผ่อนชำระในแบบฟอร์มด้านบน
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl sm:p-8">
      {/* Title & Actions Bar */}
      <div className="flex flex-col gap-4 border-b border-zinc-800 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white font-bold">
              <Table className="h-4 w-4" />
            </span>
            ตารางการผ่อนชำระ (Amortization Schedule)
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            แสดงรายละเอียดการตัดเงินต้น ดอกเบี้ย และยอดหนี้คงเหลือครบถ้วนทุกงวด
            (รวม {schedule.length} งวด)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-purple-600 bg-purple-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-purple-500 transition-colors shadow-md shadow-purple-600/25"
          >
            <Download className="h-4 w-4" />
            <span>ส่งออกเป็น CSV (Excel)</span>
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Year Filter */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-zinc-300">
            <Filter className="h-3.5 w-3.5 text-purple-400" />
            <span>กรองตามปีที่ผ่อนชำระ:</span>
          </label>
          <select
            value={selectedYear}
            onChange={(e) =>
              handleYearChange(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-3 py-2 text-xs font-medium text-zinc-200 focus:border-purple-500 focus:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="all">แสดงทั้งหมด ({totalYears} ปี / {schedule.length} งวด)</option>
            {Array.from({ length: totalYears }, (_, i) => i + 1).map((yr) => (
              <option key={yr} value={yr}>
                ปีที่ {yr} (งวดที่ {(yr - 1) * 12 + 1} - {Math.min(yr * 12, schedule.length)})
              </option>
            ))}
          </select>
        </div>

        {/* Search Specific Installment */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-zinc-300">
            <Search className="h-3.5 w-3.5 text-purple-400" />
            <span>ค้นหางวดที่เจาะจง:</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max={schedule.length}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="ใส่งวดที่ต้องการค้นหา เช่น 24"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 py-2 pl-3 pr-8 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-purple-500 focus:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Page size selector */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-zinc-300">
            <FileSpreadsheet className="h-3.5 w-3.5 text-purple-400" />
            <span>จำนวนรายการต่อหน้า:</span>
          </label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-3 py-2 text-xs font-medium text-zinc-200 focus:border-purple-500 focus:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value={12}>12 งวด (1 ปี)</option>
            <option value={24}>24 งวด (2 ปี)</option>
            <option value={36}>36 งวด (3 ปี)</option>
            <option value={60}>60 งวด (5 ปี)</option>
            <option value={-1}>แสดงทั้งหมดพร้อมกัน</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="max-h-[520px] overflow-x-auto overflow-y-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="sticky top-0 z-20 bg-zinc-950 text-zinc-300 shadow-xs border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3.5 font-bold text-center w-16">
                  งวดที่
                </th>
                <th className="px-4 py-3.5 font-bold text-right">
                  ค่างวด (บาท)
                </th>
                <th className="px-4 py-3.5 font-bold text-right text-purple-400">
                  เงินต้น (บาท)
                </th>
                <th className="px-4 py-3.5 font-bold text-right text-pink-400">
                  ดอกเบี้ย (บาท)
                </th>
                <th className="px-4 py-3.5 font-bold text-right text-zinc-200">
                  เงินต้นคงเหลือ (บาท)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 bg-zinc-900/40">
              {paginatedSchedule.map((row) => (
                <tr
                  key={row.installmentNo}
                  className="transition-colors hover:bg-purple-500/10"
                >
                  <td className="px-4 py-2.5 text-center font-mono font-semibold text-zinc-400 bg-zinc-950/50">
                    {row.installmentNo}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-white">
                    ฿{formatCurrency(row.payment)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold text-purple-400">
                    ฿{formatCurrency(row.principalPaid)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-medium text-pink-400">
                    ฿{formatCurrency(row.interestPaid)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-zinc-200">
                    {row.remainingBalance === 0 ? (
                      <span className="inline-flex items-center rounded-md bg-purple-500/20 border border-purple-500/40 px-2 py-0.5 text-xs font-bold text-purple-300">
                        0.00 (ชำระหมด)
                      </span>
                    ) : (
                      `฿${formatCurrency(row.remainingBalance)}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {pageSize !== -1 && totalPages > 1 && (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-zinc-800 pt-4 text-xs text-zinc-400 sm:flex-row">
          <div>
            แสดงงวดที่{" "}
            <span className="font-semibold text-white">
              {(currentPage - 1) * pageSize + 1}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-white">
              {Math.min(currentPage * pageSize, filteredSchedule.length)}
            </span>{" "}
            จากทั้งหมด{" "}
            <span className="font-semibold text-white">
              {filteredSchedule.length}
            </span>{" "}
            งวด
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 px-2.5 py-1.5 font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>ก่อนหน้า</span>
            </button>

            <span className="px-2 font-mono font-medium text-zinc-300">
              หน้า {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 px-2.5 py-1.5 font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span>ถัดไป</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

