/*
 * Fungsi agregasi utama (calculatePawnItem)
 * untuk kalkulasi Pawn Item berdasarkan mode
 * (normal-dj, normal-pg, manual-dj, manual-pg).
 */

export type PawnCalculationMode =
    | "normal-dj"
    | "normal-pg"
    | "manual-dj"
    | "manual-pg"

export interface PawnCalculationInput {
    mode: PawnCalculationMode;
    weight: number;
    quantity: number;

    appraisalInput?: number;
    invoiceValue?: number;

    netSales?: number;
    ppnDivider?: number;
    percentagePrice?: number;
    freeTaxArea?: boolean;
    isPPN11?: boolean;

    fineness?: number;
    pricePerGram?: number;

    conditionRate?: number;
    maxLoanRate?: number;
    ltv?: number;
    isTakeOver?: boolean;
}

export interface PawnCalculationResult {
    estimatedUnitAppraisalPrice: number,
    estimatedTotalAppraisalPrice: number,
    appraisal: number;
    maxLoanPrice: number;
}

function calculateMaxLoan(
    appraisal: number,
    conditionRate: number,
    maxLoanRate: number,
    ltv: number,
    isTakeOver: boolean): number {
    if (isTakeOver) {
        return Math.ceil((appraisal * ltv) / 100);
    }
    return Math.floor((appraisal * conditionRate) / 100);
}

export function calculatePawnItem(input: PawnCalculationInput): PawnCalculationResult {
    const {
        mode,
        weight,
        quantity = 1,
        appraisalInput = 0,
        invoiceValue = 0,
        netSales = 0,
        ppnDivider = 1.02,
        percentagePrice = 0,
        freeTaxArea = false,
        isPPN11 = false,
        pricePerGram = 0,
        conditionRate = 0,
        maxLoanRate = 90,
        ltv = 0,
        isTakeOver = false,
    } = input;

    let estimatedUnit = 0;
    let estimatedTotal = 0;
    let appraisal = 0;
    let maxLoan = 0;

    if (mode === "normal-dj") {
        let divisor = ppnDivider;
        if (ppnDivider !== 1.02 && !isPPN11) {
            divisor = 1.02;
        }
        if (ppnDivider === 1.02 && isPPN11) {
            divisor = 1.022;
        }

        estimatedUnit = freeTaxArea
            ? netSales * (percentagePrice / 100)
            : (netSales / divisor) * (percentagePrice / 100);

        estimatedUnit = Math.trunc(estimatedUnit);
        estimatedTotal = estimatedUnit * quantity;

        appraisal = estimatedTotal;

        maxLoan = isTakeOver
            ? Math.ceil((appraisal * ltv) / 100)
            : Math.trunc(appraisal * 0.85)
    }

    if (mode === "normal-pg") {
        estimatedUnit = Math.ceil(pricePerGram * weight);
        estimatedTotal = Math.ceil(estimatedUnit * quantity);
        appraisal = estimatedTotal;

        maxLoan = isTakeOver
            ? Math.ceil((appraisal * ltv) / 100)
            : Math.ceil((appraisal * maxLoanRate) / 100);
    }

    if (mode === "manual-dj" || mode === "manual-pg") {
        appraisal = appraisalInput;
        estimatedUnit = appraisal;
        estimatedTotal = appraisal;

        maxLoan = calculateMaxLoan(
            appraisal,
            conditionRate,
            maxLoanRate,
            ltv,
            isTakeOver
        );
    }

    return {
        estimatedUnitAppraisalPrice: estimatedUnit,
        estimatedTotalAppraisalPrice: estimatedTotal,
        appraisal,
        maxLoanPrice: maxLoan
    };
}