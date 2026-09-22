import { PawnSummary } from "../../../_data/data-summary";
import { hasPaymentHistory, isPawnDone } from "../../_lib/repayment-logic";

export function getRepaymentAction(
    pawn: PawnSummary,
    status: string | null
){
    if (isPawnDone(pawn)){
        return pawn.pawnDocs?.nota_tanda_terima
            ? "view-docs": "upload-docs";
    }

    if (status === "bayar_sebagian"){
        return "repayment-detail";
    }

    if (status === "akan_lunas" || status === "gadai_ulang"){
        return hasPaymentHistory(pawn.id) ? "upload-docs" : "payment-method";
    }

    return "none";
}