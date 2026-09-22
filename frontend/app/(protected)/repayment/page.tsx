"use client";

import * as React from "react";
import { pawnData } from "../_data/data-pawn";
import { PaymentTable } from "./_component/table-payment";
import { PawnSummary } from "../_data/data-summary";
import { getPawnSummary } from "../_data/data-summary";
import { SearchBarPayment } from "./_component/search-bar-payment";
import { CreditCard } from "lucide-react";

export default function RepaymentPage(){
    const [searchQuery, setSearchQuery] = React.useState("")
    const pawnTableData = pawnData
        .filter((pawn) => pawn.status === "disbursed")
        .filter((pawn) =>
            pawn.applicationNumber
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
        .map((pawn) => getPawnSummary(pawn))
        .filter((pawn): pawn is PawnSummary => pawn !== undefined);
    return(
        <>
        <div className="mt-4">
            {/* Judul */}
            <div className="mb-4 justify-left">
                <h3 className="font-bold flex gap-2 self-center"><CreditCard size={22} />Payment</h3>
            </div>
        </div>
        <SearchBarPayment onSearch={setSearchQuery}></SearchBarPayment>
        <PaymentTable data={pawnTableData}></PaymentTable></>
    )
}