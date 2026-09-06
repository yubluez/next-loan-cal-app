import { LoanInput, LoanCalculationResult, AmortizationScheduleItem } from "@/types/loan";

/**
 * คำนวณสินเชื่อ/ผ่อนชำระตามสูตร Annuity Formula และสร้างตาราง Amortization Schedule
 */
export function calculateLoan(input: LoanInput): LoanCalculationResult {
  const P = Math.max(0, input.loanAmount || 0);
  const annualRate = Math.max(0, input.annualInterestRate || 0);
  const term = Math.max(0, input.loanTerm || 0);

  // คำนวณจำนวนงวดทั้งหมด (เดือน)
  const n = input.termUnit === "years" ? Math.round(term * 12) : Math.round(term);

  // กรณีข้อมูลไม่สมบูรณ์
  if (P <= 0 || n <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0,
      totalMonths: n,
      monthlyInterestRate: 0,
      schedule: [],
    };
  }

  // อัตราดอกเบี้ยต่อเดือน: r = (อัตราดอกเบี้ยต่อปี / 100) / 12
  const r = (annualRate / 100) / 12;

  let monthlyPayment = 0;

  // คำนวณค่างวดรายเดือน (M)
  if (r === 0) {
    // กรณีดอกเบี้ย 0%
    monthlyPayment = P / n;
  } else {
    // สูตร Annuity Formula: M = P * [ r * (1+r)^n ] / [ (1+r)^n - 1 ]
    const numerator = r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    monthlyPayment = P * (numerator / denominator);
  }

  // สร้างตาราง Amortization Schedule ละเอียดทุกงวด
  const schedule: AmortizationScheduleItem[] = [];
  let remainingBalance = P;
  let totalInterest = 0;
  let totalPayment = 0;

  for (let month = 1; month <= n; month++) {
    // ดอกเบี้ยในงวดนี้
    const interest = r > 0 ? remainingBalance * r : 0;
    
    // เงินต้นที่ตัดในงวดนี้
    let principal = monthlyPayment - interest;
    let payment = monthlyPayment;

    // ตรวจสอบงวดสุดท้ายหรือกรณีตัดเงินต้นเกินยอดหนี้คงเหลือ (เนื่องจากการปัดเศษ)
    if (month === n || principal >= remainingBalance) {
      principal = remainingBalance;
      payment = principal + interest;
      remainingBalance = 0;
    } else {
      remainingBalance = remainingBalance - principal;
    }

    totalInterest += interest;
    totalPayment += payment;

    schedule.push({
      installmentNo: month,
      payment: payment,
      principalPaid: principal,
      interestPaid: interest,
      remainingBalance: Math.max(0, remainingBalance),
    });

    if (remainingBalance === 0) {
      break;
    }
  }

  return {
    monthlyPayment,
    totalInterest,
    totalPayment,
    totalMonths: n,
    monthlyInterestRate: r,
    schedule,
  };
}

/**
 * แปลงตัวเลขเป็นข้อความสกุลเงินบาทพร้อมจุลภาคและทศนิยม 2 ตำแหน่ง
 */
export function formatCurrency(amount: number, showDecimals: boolean = true): string {
  if (isNaN(amount)) return "0.00";
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

/**
 * แปลงตัวเลขเป็นจำนวนเต็มพร้อมคอมม่า
 */
export function formatNumber(value: number): string {
  if (isNaN(value)) return "0";
  return new Intl.NumberFormat("th-TH").format(value);
}
