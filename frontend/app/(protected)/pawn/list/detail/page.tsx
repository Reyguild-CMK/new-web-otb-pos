"use client"

import { pawnData } from "@/app/(protected)/_data/data-pawn";
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

export default function DetailPage(){
    //masih hardcode
    const data = getPawnSummary(4);
    
    if (!data) {
        return <p>Data pawn tidak ditemukan.</p>;
    }

    return (
        <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4">
                <CardDocProposal data={data}></CardDocProposal>
                <CardDetailPawn data={data}></CardDetailPawn>
            </div>
            <div className="flex flex-col gap-4">
                <CardCustomer data={data}></CardCustomer>
                <CardBank data={data}></CardBank>
            </div>
            
        </div>
        <TableItemList data={data.pawnItems}></TableItemList>
        <CardDoc data={data}></CardDoc>
        <CardRepayment></CardRepayment>
        <CardReceipts data={data}></CardReceipts>
        </>
        
    )
}