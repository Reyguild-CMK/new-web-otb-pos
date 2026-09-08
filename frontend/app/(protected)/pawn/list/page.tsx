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
import { dataCustomer } from "../../_data/data-customer";
import { selectData } from "../../_data/status-take-over"

const pawnTableData = pawnData.map((pawn) => {
    const customer = dataCustomer.find((item) => String(item.idNumber) === pawn.customerId
    );
    return {
        ...pawn,
        customerName: customer?.nama ?? "-",
    };
});


export default function PawnList(){
    const [searchQuery, setSearchQuery] = React.useState("")
    const filteredApplications = pawnData.filter((application) => application.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    return(
        <div>
            <div className="mt-6">
                {/* Judul */}
                <div className="mb-4 flex justify-left">
                    <List className="inline-block mr-2" size={12} />
                    <h3>Application List</h3>
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