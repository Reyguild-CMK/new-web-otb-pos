"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReceiptText, WalletCards } from "lucide-react";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { dataPawnHistory } from "@/app/(protected)/_data/data-pawn-history";

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
                <Button
                    variant="outline"
                    onClick={() => openReceipt(data.invoice)}
                    disabled={!data.invoice}
                >
                    <WalletCards />
                    Pencairan Dana
                </Button>

                {pawnHistories.map((history) => (
                    <Button
                        key={history.id}
                        variant="outline"
                        onClick={() =>
                            openReceipt(history.bukti_transaksi ?? null)
                        }
                        disabled={!history.bukti_transaksi}
                    >
                        <ReceiptText />
                        Perpanjangan {history.extend_number}
                    </Button>
                ))}
            </div>
        </div>
    );
}