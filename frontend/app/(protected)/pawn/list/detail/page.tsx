"use client"

import { useState } from "react";
import { formatDateTime } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Edit, Mail } from "lucide-react";
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";
import { CardDoc } from "./_components/card-document";
import { CardDetailPawn } from "./_components/card-detail-pawn";
import { CardCustomer } from "./_components/card-customer";
import { CardBank } from "./_components/card-bank";
import { TableItemList } from "./_components/table-item-list";
import { TableDocument } from "../../application/_components/table-document";
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";
import { dataPawnItems } from "@/app/(protected)/_data/data-pawn-item";
import { CardRepayment } from "./_components/card-repayment";
import { CardDocProposal } from "./_components/card-document-proposal";
import { CardReceipts } from "./_components/card-receipts";

export default function DetailPage() {
    const [isReuploadMode, setIsReuploadMode] = useState(false);
    
    const activeTransactionId = usePawnStore((state) => state.activeTransactionId);
    const transactionList = usePawnStore((state) => state.transactionList);

    const pawnObj = transactionList.find(p => p.id === activeTransactionId);
    const data = pawnObj ? getPawnSummary(pawnObj) : undefined;

    if (!data) {
        return <p>Data pawn tidak ditemukan.</p>;
    }

    return (
        <div className="flex flex-col gap-4 pb-10">
            {/* Header Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl shadow-sm">
                <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Edit size={20} />
                    Document Proposal
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary uppercase tracking-wide border border-primary/20">
                        {data.status}
                    </span>
                </h1>
                <div className="flex items-center gap-2">
                    <Button
                        className="bg-btn-action-bg text-btn-action-text hover:bg-btn-action-bg/90 hover:text-btn-action-text border-0"
                        size="sm"
                        onClick={() => setIsReuploadMode(!isReuploadMode)}
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        {isReuploadMode ? "Cancel Reupload" : "Request Reupload"}
                    </Button>
                    {data.status === "disbursed" && (
                        <Button className="bg-btn-action-bg text-btn-action-text hover:bg-btn-action-bg/90 hover:text-btn-action-text border-0" size="sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email Payment Notification
                        </Button>
                    )}
                </div>
            </div>

            {/* Done Alert */}
            {data.status === "done" && (
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 px-4 py-3 rounded-lg text-sm font-medium">
                    TRANSAKSI DENGAN NO GADAI <b>{data.applicationNumber}</b> SUDAH TERBAYAR {data.pawnDoneDate ? `PADA TANGGAL ${formatDateTime(data.pawnDoneDate)}` : ""}
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <CardDocProposal data={data}></CardDocProposal>
                    <CardDetailPawn data={data}></CardDetailPawn>
                </div>
                <div className="flex flex-col gap-4">
                    <CardCustomer data={data} isReuploadMode={isReuploadMode} />
                    <CardBank data={data} />
                </div>


            </div>

            <div className="flex flex-col gap-4 mt-4">
                <TableItemList data={data.pawnItems} isReuploadMode={isReuploadMode} />
                <CardDoc data={data} isReuploadMode={isReuploadMode} />
                <CardRepayment data={data} />
                <CardReceipts data={data} />
            </div>
        </div>

    )
}