"use client"

import * as React from "react"

// icon
import { List } from 'lucide-react';

// components
import { SearchBar } from "./_components/search-bar"
import { PawnDataPicker } from "./_components/date-picker"
import { DropDown } from "./_components/dropdown"
import { PawnTable } from "./_components/pawn-table"

// Data Dummy for Select
import { pawnData } from "../../_data/data-pawn"
import { getPawnSummary } from "../../_data/data-summary";
import { selectData } from "../../_data/status-take-over"

export default function PawnList(){
    const [searchQuery, setSearchQuery] = React.useState("")
    const pawnTableData = pawnData.map((pawn)=>getPawnSummary(pawn.id)).filter((pawn)=>pawn!==undefined);
    const filteredApplications = pawnData.filter((application) => application.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    return(
        <div>
            <div className="mt-6">
                {/* Judul */}
                <div className="mb-6 justify-left">
                    <h1 className="font-bold flex gap-2 self-center"><List size={22}/>Application List</h1>
                </div>

                {/* Search Bar, Dropdown Filter & Date Picker */}
                <div className="mb-2 flex justify-between">
                    <SearchBar onSearch={setSearchQuery} />
                    <div className="flex gap-2">
                        <DropDown data={selectData}></DropDown>
                        <PawnDataPicker></PawnDataPicker>
                    </div>
                </div>

                {/* Show Table based on Filter */}
                <PawnTable data={pawnTableData}></PawnTable>
            </div>
        </div>
    )
}