import type { PawnSummary } from "../../_data/data-summary";
import { dataPawnHistory } from "../../_data/data-pawn-history";

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

export function getRepaymentStatus(pawn: PawnSummary){
    if (isPawnDone(pawn)){
        return "Paid Off";
    }
    if (hasPaymentHistory(pawn.id)){
        return "Perpanjangan - Paid Off"
    }
    return "Unpaid";
}
