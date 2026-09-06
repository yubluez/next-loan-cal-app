export type TermUnit = "years" | "months";

export interface LoanInput {
  loanAmount: number; // ยอดเงินกู้ (P) ในหน่วยบาท
  annualInterestRate: number; // อัตราดอกเบี้ยต่อปี (%)
  loanTerm: number; // ระยะเวลาผ่อนชำระ
  termUnit: TermUnit; // หน่วยระยะเวลา: "years" (ปี) หรือ "months" (เดือน)
}

export interface AmortizationScheduleItem {
  installmentNo: number; // งวดที่
  payment: number; // ค่างวด (M)
  principalPaid: number; // เงินต้นที่ชำระ
  interestPaid: number; // ดอกเบี้ยที่ชำระ
  remainingBalance: number; // เงินต้นคงเหลือปลายงวด
}

export interface LoanCalculationResult {
  monthlyPayment: number; // ค่างวดรายเดือน (M)
  totalInterest: number; // ยอดดอกเบี้ยรวมตลอดสัญญา
  totalPayment: number; // ยอดชำระรวมทั้งหมด (เงินต้น + ดอกเบี้ย)
  totalMonths: number; // จำนวนงวดทั้งหมด (n)
  monthlyInterestRate: number; // อัตราดอกเบี้ยต่อเดือน (r)
  schedule: AmortizationScheduleItem[]; // ตารางแจกแจงการผ่อนชำระทุกงวด
}
