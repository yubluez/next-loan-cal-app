import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  Building2,
  Car,
  UserCheck,
  FileSpreadsheet,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 pb-16">
      {/* Background radial gradient decoration */}
      <div className="pointer-events-none absolute -top-40 right-1/2 h-96 w-96 translate-x-1/2 rounded-full bg-purple-600/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />

      {/* 1. Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            วางแผนสินเชื่อและค่างวดผ่อนชำระ{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-purple-500 bg-clip-text text-transparent">
              อย่างแม่นยำและโปร่งใส
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg leading-relaxed">
            เว็บแอปพลิเคชันคำนวณค่างวดผ่อนชำระรายเดือนด้วยสูตรมาตรฐานสากล
            (Annuity Formula) พร้อมตารางแจกแจงการผ่อนชำระ (Amortization
            Schedule) แบบละเอียดทุกงวด
            ช่วยให้คุณมองเห็นภาพรวมเงินต้นและดอกเบี้ยได้อย่างชัดเจน
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/loancal"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              <Calculator className="h-5 w-5" />
              <span>ไปยังหน้าคำนวณสินเชื่อ</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#formula-section"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/80 px-6 py-4 text-base font-semibold text-zinc-200 shadow-xs hover:bg-zinc-800 hover:text-white transition-all w-full sm:w-auto"
            >
              <span>ดูสูตรการคำนวณ</span>
            </a>
          </div>

          {/* Feature Highlights Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400" />
              <span>คำนวณค่างวดรายเดือน (M) ทันที</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400" />
              <span>ตาราง Amortization Schedule ครบทุกงวด</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400" />
              <span>รองรับสลับหน่วย ปี / เดือน</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400" />
              <span>ส่งออกรายงานเป็นไฟล์ CSV</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Cards Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-sm hover:border-zinc-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400">
              <Calculator className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              คำนวณค่างวดแม่นยำ
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              ใช้สูตร Annuity Formula คำนวณค่างวดที่ต้องชำระรายเดือน (M)
              แสดงผลเด่นชัด พร้อมยอดดอกเบี้ยรวมตลอดอายุสัญญา
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-sm hover:border-zinc-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              ตาราง Amortization Schedule
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              แจกแจงรายละเอียดทุกงวด ตั้งแต่งวดที่ 1 จนถึงงวดสุดท้าย
              เห็นชัดเจนว่างวดไหนตัดเงินต้นเท่าไหร่ ดอกเบี้ยเท่าไหร่
              และเหลือหนี้เท่าไหร่
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-sm hover:border-zinc-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/15 text-pink-400">
              <TrendingDown className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              วิเคราะห์สัดส่วนเงินต้น & ดอกเบี้ย
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              แสดงแผนภูมิแถบสัดส่วนเปรียบเทียบระหว่างเงินต้นจริงกับดอกเบี้ยทั้งหมดที่ต้องจ่าย
              ช่วยให้ตัดสินใจเลือกแผนผ่อนชำระที่คุ้มค่าที่สุด
            </p>
          </div>
        </div>
      </section>

      {/* 3. Types of Loans Supported */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            รองรับการคำนวณสินเชื่อหลากหลายรูปแบบ
          </h2>
          <p className="mt-2 text-xs text-zinc-400 max-w-xl mx-auto">
            ไม่ว่าจะเป็นสินเชื่อเพื่อที่อยู่อาศัย สินเชื่อยานยนต์
            หรือสินเชื่อส่วนบุคคล ระบบสามารถคำนวณได้ทันที
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Housing */}
          <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-sm hover:border-purple-500/50 hover:bg-zinc-800/60 transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Building2 className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-white">สินเชื่อบ้าน/คอนโด</h4>
            </div>
            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              เหมาะสำหรับวงเงินกู้ระยะยาว เช่น 1 - 30 ปี อัตราดอกเบี้ยเฉลี่ย
              2.5% - 5.0%
            </p>
            <div className="mt-4 text-xs font-semibold text-purple-400">
              ระยะเวลา: 10 - 30 ปี
            </div>
          </div>

          {/* Auto */}
          <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-sm hover:border-purple-500/50 hover:bg-zinc-800/60 transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Car className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-white">สินเชื่อรถยนต์</h4>
            </div>
            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              เหมาะสำหรับการผ่อนชำระ 12 - 84 งวด (1 - 7 ปี) อัตราดอกเบี้ยเฉลี่ย
              3.0% - 6.0%
            </p>
            <div className="mt-4 text-xs font-semibold text-purple-400">
              ระยะเวลา: 1 - 7 ปี (12 - 84 เดือน)
            </div>
          </div>

          {/* Personal */}
          <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-sm hover:border-purple-500/50 hover:bg-zinc-800/60 transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <UserCheck className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-white">สินเชื่อส่วนบุคคล</h4>
            </div>
            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              วงเงินหมุนเวียนหรือผ่อนชำระระยะสั้นถึงปานกลาง อัตราดอกเบี้ย 7% -
              15%
            </p>
            <div className="mt-4 text-xs font-semibold text-purple-400">
              ระยะเวลา: 12 - 60 เดือน
            </div>
          </div>
        </div>
      </section>

      {/* 4. Formula Section */}
      <section
        id="formula-section"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-sm sm:p-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
            <ShieldCheck className="h-4 w-4" />
            <span>สูตรคณิตศาสตร์การเงินตามโจทย์</span>
          </div>

          <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            สูตรการคำนวณค่างวดผ่อนชำระ (Annuity Formula)
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
            ระบบคำนวณตามสูตรที่ระบุไว้ในโจทย์ที่ 3 อย่างเคร่งครัด
            เพื่อให้ได้ค่างวดที่ถูกต้องตามมาตรฐานสถาบันการเงิน:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Formula display box */}
            <div className="rounded-2xl border border-zinc-800 bg-black p-6 text-white shadow-inner font-mono text-sm leading-relaxed">
              <div className="text-purple-400 font-semibold mb-2">
                // 1. อัตราดอกเบี้ยต่อเดือน (r)
              </div>
              <div className="text-zinc-300 pl-3 border-l-2 border-purple-500 mb-4">
                r = (อัตราดอกเบี้ยต่อปี / 100) / 12
              </div>

              <div className="text-purple-400 font-semibold mb-2">
                // 2. จำนวนงวดทั้งหมด (n)
              </div>
              <div className="text-zinc-300 pl-3 border-l-2 border-purple-500 mb-4">
                n = ระยะเวลาผ่อน (เดือน)
              </div>

              <div className="text-purple-400 font-semibold mb-2">
                // 3. ค่างวดรายเดือน (M)
              </div>
              <div className="text-purple-300 text-base font-bold pl-3 border-l-2 border-purple-500 bg-purple-500/10 py-2 rounded-r-lg">
                M = P × [ r(1+r)ⁿ ] / [ (1+r)ⁿ - 1 ]
              </div>
            </div>

            {/* Variable explanation */}
            <div className="flex flex-col justify-center space-y-3 text-xs text-zinc-400">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
                <strong className="text-purple-400 font-semibold">
                  P (Principal):
                </strong>{" "}
                ยอดเงินกู้เริ่มต้น (บาท)
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
                <strong className="text-purple-400 font-semibold">
                  r (Monthly Rate):
                </strong>{" "}
                อัตราดอกเบี้ยต่อเดือน คำนวณจากดอกเบี้ยต่อปีหารด้วย 12 เดือน
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
                <strong className="text-purple-400 font-semibold">
                  n (Total Months):
                </strong>{" "}
                จำนวนงวดผ่อนชำระทั้งหมดในหน่วยเดือน
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
                <strong className="text-purple-400 font-semibold">
                  M (Monthly Payment):
                </strong>{" "}
                ค่างวดที่ต้องชำระเท่ากันทุกเดือน
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Banner */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-8 text-center text-white shadow-xl shadow-purple-900/30 sm:p-12">
          <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
            พร้อมเริ่มคำนวณสินเชื่อของคุณหรือยัง?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-purple-100">
            คลิกปุ่มด้านล่างเพื่อเข้าสู่เครื่องมือคำนวณสินเชื่อ
            พร้อมทดลองปรับยอดเงินกู้ ดอกเบี้ย และดูตารางผ่อนชำระได้ทันที
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/loancal"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-purple-900 shadow-md hover:bg-purple-50 hover:text-purple-950 transition-all"
            >
              <Calculator className="h-5 w-5 text-purple-600" />
              <span>เริ่มคำนวณสินเชื่อเลย (ไปที่หน้า loancal)</span>
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
