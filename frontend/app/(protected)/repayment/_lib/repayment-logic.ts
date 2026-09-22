import type { PawnSummary } from "../../_data/data-summary";
import { dataPawnHistory } from "../../_data/data-pawn-history";
import { PaymentSubmission } from "./repayment-types";

export function isPawnDone(pawn: PawnSummary){
    return pawn.status === "done";
}

export function canChangeStatus(pawn: PawnSummary){
    return pawn.tanggalTransaksi.getTime() <= Date.now();
}

export function hasUploadedReceipt(pawn: PawnSummary){
    return pawn.pawnDocs?.nota_tanda_terima != null;
}

export function getPawnHistory(pawnId: number){
    return dataPawnHistory.filter((history) => history.pawn_id === pawnId);
}

export function hasPaymentHistory(pawnId: number){
    return getPawnHistory(pawnId).length > 0;
}

export function getRepaymentStatus(pawn: PawnSummary, payment?: PaymentSubmission){
    if (isPawnDone(pawn)){
        return "Paid Off";
    }
    if (payment?.status === "akan_lunas" && payment.submitted){
        return "Paid Off";
    }
    if (payment?.status === "gadai_ulang" && payment.submitted){
        return "Paid Off - Perpanjangan";
    }
    return "Unpaid";
}

export function getPendingPawnHistory(pawn: PawnSummary){
    return pawn.pawnHistory.filter((history) => history.status === "not_complete")
        .sort((a,b) => b.extend_number - a.extend_number);
}
