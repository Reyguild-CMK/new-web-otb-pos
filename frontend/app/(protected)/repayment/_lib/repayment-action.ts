import { PawnStatusNotification } from "../../_data/data-pawn";
import { PawnSummary } from "../../_data/data-summary";
import { isPawnDone, getPendingPawnHistory } from "./repayment-logic";
import { PaymentSubmission } from "./repayment-types";

export type RepawnFormType =
    | "repayment"
    | "gadai-ulang"
    | null

export function getRepawnFormType( status: PawnStatusNotification): RepawnFormType{
    if (status === "akan_lunas"){
        return "repayment"
    } if (status === "gadai_ulang"){
        return "gadai-ulang"
    }

    return null
}

export function getRepaymentAction(
    pawn: PawnSummary,
    status: PawnStatusNotification | null,
    payment?: PaymentSubmission
){
    if (isPawnDone(pawn)){
        return "Paid Off"
    }
    if (status === "akan_lunas") {
        return payment?.submitted
            ? "refinancing"
            : "payment-method";
    }
    if (status === "gadai_ulang"){
        const pendingHistory = getPendingPawnHistory(pawn);
        if (pendingHistory.length > 0 || payment?.submitted){
            return payment?.uploadedFormApplication ? "view-docs" : "upload-docs"
        }
        return "payment-method"
    }

    return "Unpaid";
}