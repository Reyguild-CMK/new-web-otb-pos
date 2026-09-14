"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReceiptText, WalletCards } from "lucide-react";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { dataPawnHistory } from "@/app/(protected)/_data/data-pawn-history";

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
        <div>
            <div className="flex items-center gap-2 pb-2 pt-2">
                <ReceiptText size={20} />
                <h1 className="font-bold">Receipts</h1>
            </div>

            <Card className="rounded-none ring-0">
                <CardContent className="flex flex-wrap gap-3 p-4">
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
                </CardContent>
            </Card>
        </div>
    );
}