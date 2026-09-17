/*
 * Rumus umum untuk ekosistem Gadai (Pawn).
 * Kalkulasi nilai gadai PG/DJ Auto, dan kalkulasi biaya refinancing
 */

// Kalkulasi PG Auto
export function calculatePGAutoAppraisal(weight: number, qty: number, pricePerGram: number): number {
  return Math.ceil(weight * qty * pricePerGram);
}

export function calculatePGAutoMaxLoan(appraisal: number, maxLoanRatio: number = 0.95): number {
  return Math.ceil(appraisal * maxLoanRatio);
}

// Kalkulasi DJ Auto
export function calculateDJAutoEstimatedValue(
  netSales: number,
  ppnPembagi: number,
  originalWeight: number,
  currentWeight: number,
  rvPercent: number,
  isFreeTaxArea: boolean
): number {
  let estOriginal = 0;
  if (isFreeTaxArea) {
    estOriginal = netSales * (rvPercent / 100);
  } else {
    estOriginal = (netSales / ppnPembagi) * (rvPercent / 100);
  }

  const estPerGram = originalWeight > 0 ? estOriginal / originalWeight : 0;
  return Math.trunc(estPerGram * currentWeight);
}

export function calculateDJAutoMaxLoan(estimatedValue: number): number {
  return Math.trunc(estimatedValue * 0.85);
}

// Kalkulasi Manual (PG & DJ)
export function calculateManualMaxLoan(appraisal: number, conditionPercentage: number): number {
  if (appraisal <= 0) return 0;
  return Math.floor(appraisal * (conditionPercentage / 100));
}

// Kalkulasi Stone (DJ Manual)
export function calculateCaratPerButir(totalCarat: number, totalButir: number): string {
  if (totalButir > 0 && totalCarat > 0) {
    return (totalCarat / totalButir).toFixed(3);
  }
  return "0.000";
}

export function calculateTotalStones(stones: { totalButir: string | number, totalCarat: string | number }[]) {
  const grandTotalButir = stones.reduce((tot, s) => tot + (parseFloat(s.totalButir as string) || 0), 0);
  const grandTotalCarat = stones.reduce((tot, s) => tot + (parseFloat(s.totalCarat as string) || 0), 0);

  return {
    grandTotalButir,
    grandTotalCarat,
    grandTotalCaratFormatted: grandTotalCarat.toFixed(3)
  };
}

// Kalkulasi Refinancing Loan
export function calculateRefinancingDueDate(transactionDate: string, tenorDays: number): string {
  if (!transactionDate || !tenorDays) return "";
  const date = new Date(transactionDate);
  date.setDate(date.getDate() + tenorDays);
  return date.toISOString().split('T')[0];
}

export function calculateRefinancingFees(nilaiPinjaman: number, rate: number, biayaAdmin: number = 0) {
  const np = Number(nilaiPinjaman) || 0;
  const ba = Number(biayaAdmin) || 0;
  const biayaPerawatan = (np * rate) / 100;
  const nominalDitransfer = np - biayaPerawatan - ba;

  return {
    biayaPerawatan,
    nominalDitransfer
  };
}
