import Link from "next/link";
import { ShieldAlert, BookOpen, Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white font-bold shadow-sm shadow-purple-600/20">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="font-bold text-white">LoanSmart Calculator</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              เว็บแอปพลิเคชันคำนวณค่างวดผ่อนชำระสินเชื่อรายเดือน
              พร้อมแจกแจงตารางการผ่อนชำระ (Amortization Schedule) แบบละเอียดทุกงวด
              ตามหลักคณิตศาสตร์การเงิน (Annuity Formula)
            </p>
          </div>

          {/* Col 2: Formula Note */}
          <div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <BookOpen className="h-4 w-4 text-purple-400" />
              <span>สูตรการคำนวณที่ใช้</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              <span className="font-mono font-medium text-purple-400/90">M = P × [ r(1+r)ⁿ ] / [ (1+r)ⁿ - 1 ]</span>
              <br />
              โดยคำนวณอัตราดอกเบี้ยต่อเดือน <span className="font-mono text-zinc-200">r = (อัตราต่อปี / 100) / 12</span>{" "}
              และจำนวนงวด <span className="font-mono text-zinc-200">n</span> ในหน่วยเดือน
            </p>
          </div>

          {/* Col 3: Disclaimer */}
          <div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <ShieldAlert className="h-4 w-4 text-pink-400" />
              <span>ข้อจำกัดความรับผิดชอบ</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              ผลการคำนวณนี้เป็นเพียงการประมาณการเบื้องต้นเท่านั้น
              เงื่อนไขและอัตราดอกเบี้ยจริงอาจมีความแตกต่างตามนโยบายของแต่ละสถาบันการเงิน
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-zinc-800/80 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} next-loan-cal-app. สงวนลิขสิทธิ์.</p>
          <div className="mt-2 flex gap-4 sm:mt-0">
            <Link href="/" className="hover:text-purple-400 transition-colors">
              หน้าหลัก
            </Link>
            <Link href="/loancal" className="hover:text-purple-400 transition-colors">
              หน้าคำนวณสินเชื่อ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
