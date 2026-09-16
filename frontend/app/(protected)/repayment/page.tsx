"use client";

import * as React from "react";
import { RepaymentTable } from "./_component/table-repayment";
import { pawnData } from "../_data/data-pawn";
import { getPawnSummary } from "../_data/data-summary";
import { SearchBarRepayment } from "./_component/search-bar-repayment";
import { CreditCard } from "lucide-react";

export default function RepaymentPage(){
    const [searchQuery, setSearchQuery] = React.useState("")
    const pawnTableData = pawnData.map((pawn)=>getPawnSummary(pawn.id)).filter((pawn)=>pawn!==undefined);
    const filteredApplications = pawnData.filter((application) => application.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    return(
        <>
        <div className="mt-4">
            {/* Judul */}
            <div className="mb-4 justify-left">
                <h3 className="font-bold flex gap-2 self-center"><CreditCard size={22} />Repayment</h3>
            </div>
        </div>
        <SearchBarRepayment onSearch={setSearchQuery}></SearchBarRepayment>
        <RepaymentTable data={pawnTableData}></RepaymentTable></>
    )
}