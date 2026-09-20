"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

// icon
import { List, Plus } from 'lucide-react';

// components
import { SearchBar } from "./_components/search-bar"
import { PawnDataPicker } from "./_components/date-picker"
import { DropDown } from "./_components/dropdown"
import { PawnTable } from "./_components/pawn-table"
import { Button } from "@/components/ui/button"

// Data Dummy for Select
import { getPawnSummary, PawnSummary } from "../../_data/data-summary";
import { selectData } from "../../_data/status-take-over"

// Store
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";
import { useAuthStore } from "@/app/(protected)/_store/useAuthStore";

import { type DateRange } from "react-day-picker"

export default function PawnList() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("all")
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

    const { currentRole } = useAuthStore();
    const transactionList = usePawnStore((state) => state.transactionList);
    const createNewTransaction = usePawnStore((state) => state.createNewTransaction);

    const handleNewTransaction = () => {
        createNewTransaction();
        router.push("/pawn/application/form-application");
    };

    const pawnTableData = transactionList
        .map((pawn) => getPawnSummary(pawn))
        .filter((pawn): pawn is PawnSummary => pawn !== undefined);

    const filteredApplications = pawnTableData.filter((application) => {
        // 1. Search Query
        const matchSearch = application.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Status Filter (Take Over) & Role Filter
        let matchStatus = true;

        if (statusFilter === "take over") {
            matchStatus = application.isTakeOver === true;
        } else if (statusFilter === "without take over") {
            matchStatus = application.isTakeOver === false;
        }

        // 3. Date Filter
        let matchDate = true;
        if (dateRange?.from) {
            const appDate = new Date(application.tanggalTransaksi);
            appDate.setHours(0, 0, 0, 0);

            const fromDate = new Date(dateRange.from);
            fromDate.setHours(0, 0, 0, 0);

            if (dateRange.to) {
                const toDate = new Date(dateRange.to);
                toDate.setHours(23, 59, 59, 999);
                matchDate = appDate >= fromDate && appDate <= toDate;
            } else {
                matchDate = appDate.getTime() === fromDate.getTime();
            }
        }

        return matchSearch && matchStatus && matchDate;
    });

    return (
        <div>
            <div className="mt-6">
                {/* Judul */}
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="font-bold flex gap-2 items-center"><List size={22} />Application List</h1>
                    {currentRole === 'JR' && (
                        <Button size="sm" onClick={handleNewTransaction} className="bg-btn-primary-bg text-btn-primary-text text-xs">
                            <Plus className="mr-2 h-4 w-4" /> Add New Transaction
                        </Button>
                    )}
                </div>

                {/* Search Bar, Dropdown Filter & Date Picker */}
                <div className="mb-2 flex justify-between">
                    <SearchBar onSearch={setSearchQuery} />
                    <div className="flex gap-2">
                        <DropDown data={selectData} value={statusFilter} onChange={setStatusFilter}></DropDown>
                        <PawnDataPicker date={dateRange} setDate={setDateRange}></PawnDataPicker>
                    </div>
                </div>

                {/* Show Table based on Filter */}
                <PawnTable data={filteredApplications}></PawnTable>
            </div>
        </div>
    )
}