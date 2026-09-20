"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReceiptText, WalletCards } from "lucide-react";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { dataPawnHistory } from "@/app/(protected)/_data/data-pawn-history";
import { ModalRepawn } from "./modal-repawn";
import { ModalDisbursement } from "./modal-disbursement";
import { ModalRepayment } from "./modal-repayment";

import { style_card } from "@/components/shared/Stepper/Stepper";

interface CardReceiptsProps {
    data: PawnSummary;
}

export function CardReceipts({ data }: CardReceiptsProps) {
    const pawnHistories = dataPawnHistory.filter(
        (history) => history.pawn_id === data.id
    );

    const openReceipt = (url: string | null) => {
        if (url) {
            window.open(url, "_blank");
        }
    };

    return (
        <div className={style_card}>
            <div className="flex flex-row items-center justify-start gap-2 pb-2">
                <ReceiptText size={20} />
                <h1 className="font-bold">Receipts</h1>
            </div>

            <div className="flex flex-wrap gap-3">
                {/* Pencairan Dana (Action if approved, Receipt if disbursed/done) */}
                {(data.status === "approved" || data.status === "disbursed" || data.status === "done") && (
                    <ModalDisbursement 
                        data={data} 
                        isReceiptMode={data.status === "disbursed" || data.status === "done"} 
                        isDisbursed={data.status === "disbursed" || data.status === "done"} 
                        buttonLabel="Pencairan Dana" 
                    />
                )}

                {/* Past Perpanjangan Receipts */}
                {pawnHistories.map((history) => (
                    <ModalRepawn 
                        key={history.id} 
                        data={data} 
                        historyData={history} 
                        isReceiptMode={true} 
                        buttonLabel={`Perpanjangan ${history.extend_number}`} 
                    />
                ))}

                {/* Pelunasan Receipt */}
                {data.status === "done" && (
                    <ModalRepayment 
                        data={data} 
                        isReceiptMode={true} 
                    />
                )}
            </div>
        </div>
    );
}