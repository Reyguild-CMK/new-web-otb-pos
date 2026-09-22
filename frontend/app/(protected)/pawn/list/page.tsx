"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

// icon
import { List, Plus, X } from 'lucide-react';

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
    return (
        <React.Suspense fallback={<div className="p-6">Loading...</div>}>
            <PawnListContent />
        </React.Suspense>
    )
}

function PawnListContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const txDateFrom = searchParams.get("txDateFrom");
    const txDateTo = searchParams.get("txDateTo");
    const urlStatus = searchParams.get("status");
    const dueDateFrom = searchParams.get("dueDateFrom");
    const dueDateTo = searchParams.get("dueDateTo");

    const [searchQuery, setSearchQuery] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("all")
    
    const dateRange = React.useMemo<DateRange | undefined>(() => {
        if (txDateFrom) {
            return {
                from: new Date(txDateFrom),
                to: txDateTo ? new Date(txDateTo) : undefined
            };
        }
        return undefined;
    }, [txDateFrom, txDateTo]);

    const setDateRange = (range: DateRange | undefined) => {
        const params = new URLSearchParams(searchParams.toString());
        if (range?.from) {
            // Need to adjust for local timezone offset when converting to ISO date string
            const fromDate = new Date(range.from.getTime() - (range.from.getTimezoneOffset() * 60000));
            params.set("txDateFrom", fromDate.toISOString().split("T")[0]);
        } else {
            params.delete("txDateFrom");
        }

        if (range?.to) {
            const toDate = new Date(range.to.getTime() - (range.to.getTimezoneOffset() * 60000));
            params.set("txDateTo", toDate.toISOString().split("T")[0]);
        } else {
            params.delete("txDateTo");
        }
        router.push(`/pawn/list?${params.toString()}`);
    };

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

        // 3. Transaction Date Filter (from PawnDataPicker)
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

        // Note: dueDate filter is handled in pawn-table.tsx directly via URL parameters.

        // 4. URL Status Filter
        let matchUrlStatus = true;
        if (urlStatus) {
            if (urlStatus === "processing") {
                matchUrlStatus = application.status === "processing";
            } else if (urlStatus === "waiting_approval") {
                matchUrlStatus = application.status === "waiting_approval";
            } else if (urlStatus === "approved") {
                matchUrlStatus = application.status === "approved";
            } else if (urlStatus === "disbursed") {
                matchUrlStatus = application.status === "disbursed";
            }
        }

        // 5. Due Date Filter
        let matchDueDate = true;
        
        if (dueDateFrom && dueDateTo) {
            // Parse as local date (YYYY-MM-DD without timezone = UTC in JS, so we parse manually)
            const [fy, fm, fd] = dueDateFrom.split("-").map(Number);
            const [ty, tm, td] = dueDateTo.split("-").map(Number);
            const fromDate = new Date(fy, fm - 1, fd, 0, 0, 0, 0);
            const toDate = new Date(ty, tm - 1, td, 23, 59, 59, 999);
            
            let itemDueDate = application.jatuhTempo instanceof Date ? application.jatuhTempo : new Date(application.jatuhTempo);
            
            if (isNaN(itemDueDate.getTime())) {
                const txDate = new Date(application.tanggalTransaksi);
                itemDueDate = application.dueDate ? new Date(application.dueDate) : new Date(txDate.getTime() + ((application.tenordata?.tenor || application.tenor || 120) * 24 * 60 * 60 * 1000));
            }
            
            matchDueDate = itemDueDate.getTime() >= fromDate.getTime() && itemDueDate.getTime() <= toDate.getTime();
        }

        return matchSearch && matchStatus && matchDate && matchUrlStatus && matchDueDate;
    });

    return (
        <div>
            <div className="mt-6">
                {/* Judul */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="flex items-center gap-2 text-xl font-bold"><List size={22} aria-hidden="true" />Application List</h1>
                    {currentRole === 'JR' && (
                        <Button size="sm" onClick={handleNewTransaction} className="w-full bg-btn-primary-bg text-btn-primary-text text-xs sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add New Transaction
                        </Button>
                    )}
                </div>

                {/* Search Bar, Dropdown Filter & Date Picker */}
                <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <SearchBar onSearch={setSearchQuery} />
                    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:w-auto lg:min-w-95">
                        <DropDown data={selectData} value={statusFilter} onChange={setStatusFilter}></DropDown>
                        <PawnDataPicker date={dateRange} setDate={setDateRange}></PawnDataPicker>
                    </div>
                </div>

                {/* Active Filters Display */}
                {(dueDateFrom || urlStatus || searchQuery || statusFilter !== "all" || txDateFrom) && (
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-xs font-medium text-gray-700">Active Filters:</span>
                        
                        {searchQuery && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium">
                                <span>Pencarian: {searchQuery}</span>
                                <button
                                    type="button"
                                    aria-label="Hapus filter pencarian"
                                    onClick={() => setSearchQuery("")}
                                    className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-gray-200"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}

                        {statusFilter !== "all" && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-medium uppercase">
                                <span>Tipe: {statusFilter.replace('_', ' ')}</span>
                                <button
                                    type="button"
                                    aria-label="Hapus filter tipe transaksi"
                                    onClick={() => setStatusFilter("all")}
                                    className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-orange-200"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}

                        {txDateFrom && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-medium">
                                <span>Tanggal Transaksi: {new Date(txDateFrom).toLocaleDateString('id-ID')} {txDateTo ? `- ${new Date(txDateTo).toLocaleDateString('id-ID')}` : ''}</span>
                                <button
                                    type="button"
                                    aria-label="Hapus filter tanggal transaksi"
                                    onClick={() => setDateRange(undefined)}
                                    className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-green-200"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}

                        {dueDateFrom && dueDateTo && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium">
                                <span>Jatuh Tempo: {new Date(dueDateFrom).toLocaleDateString('id-ID')} - {new Date(dueDateTo).toLocaleDateString('id-ID')}</span>
                                <button
                                    type="button"
                                    aria-label="Hapus filter jatuh tempo"
                                    onClick={() => {
                                        const params = new URLSearchParams(searchParams.toString());
                                        params.delete("dueDateFrom");
                                        params.delete("dueDateTo");
                                        router.push(`/pawn/list?${params.toString()}`);
                                    }}
                                    className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-blue-200"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}

                        {urlStatus && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-medium uppercase">
                                <span>Status: {urlStatus.replace('_', ' ')}</span>
                                <button
                                    type="button"
                                    aria-label="Hapus filter status"
                                    onClick={() => {
                                        const params = new URLSearchParams(searchParams.toString());
                                        params.delete("status");
                                        router.push(`/pawn/list?${params.toString()}`);
                                    }}
                                    className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-purple-200"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}
                        
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs text-gray-700 hover:text-gray-900"
                            onClick={() => {
                                setSearchQuery("");
                                setStatusFilter("all");
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete("dueDateFrom");
                                params.delete("dueDateTo");
                                params.delete("status");
                                params.delete("txDateFrom");
                                params.delete("txDateTo");
                                router.push(`/pawn/list?${params.toString()}`);
                            }}
                        >
                            Clear All
                        </Button>
                    </div>
                )}

                {/* Show Table based on Filter */}
                <PawnTable data={filteredApplications}></PawnTable>
            </div>
        </div>
    )
}