"use client";

import * as React from "react";
import { FileText } from "lucide-react";
import { DueDateListsTable } from "./_components/due-date-list";
import { getPawnSummary, type PawnSummary } from "../../_data/data-summary";
import { pawnData } from "../../_data/data-pawn";
import { DropDownFilter } from "./_components/filter-due-date";
import { filterDueDateData } from "./_data/filter-function";

export default function DueDatePage() {
    const [filter, setFilter] = React.useState("Semua");
    const allData: PawnSummary[] = pawnData
        .map((pawn) => getPawnSummary(pawn.id))
        .filter((item): item is PawnSummary => Boolean(item))
        .filter((item) => item.status === "disbursed")
        .sort((a, b) => a.jatuhTempo.getTime() - b.jatuhTempo.getTime());
    const filteredData = filterDueDateData(allData, filter);

    return (
        <div className="">
            <div className="flex justify-between">
                <div className="md:flex justify-items-start gap-2 pb-2 pt-2">
                    <FileText size={20} />
                    <h3 className="font-bold">Due Date Pawn List</h3>
                </div>
                <div>
                    <DropDownFilter value={filter} onChange={setFilter}></DropDownFilter>
                </div>
            </div>
        <DueDateListsTable data={filteredData} />
        </div>
    );
}