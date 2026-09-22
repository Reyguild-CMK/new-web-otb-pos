"use client"

import * as React from "react"
import { Calculator, List, ShoppingCart, Wallet, Banknote, CalendarDays, Coins } from "lucide-react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Data
import { dataCustomer } from "@/app/(protected)/_data/data-customer"

// Components
import {
    enrichPawnData,
    JatuhTempoCard,
    MainTable,
    formatRupiah
} from "./_components/dashboard-components"

import { useAuthStore } from "@/app/(protected)/_store/useAuthStore"
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore"

export default function DashboardPage() {
    // Store handlers
    const { currentRole: role } = useAuthStore();
    const { transactionList: pawnData } = usePawnStore();

    // Enrich pawn data with customer names
    const enrichedData = enrichPawnData(pawnData, dataCustomer);

    // Calculate Summary Stats dynamically
    const activePawns = enrichedData.filter(p => !['done', 'cancel', 'rejected'].includes(p.status));
    const activePawnsCount = activePawns.length;
    const totalGoldTunai = activePawns.reduce((sum, p) => sum + p.nilaiPinjaman, 0);

    const currentMonth = new Date("2026-09-21").getMonth(); // using mock system date
    const currentYear = new Date("2026-09-21").getFullYear();

    const currentMonthPawns = activePawns.filter(p => {
        const txDate = new Date(p.tanggalTransaksi);
        return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
    });
    const currentMonthCount = currentMonthPawns.length;
    const currentMonthGold = currentMonthPawns.reduce((sum, p) => sum + p.nilaiPinjaman, 0);

    return (
        <div className="flex flex-col gap-6 py-4">
            
            {/* Header Section */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-[#142C44]">Welcome back CMK {role}</h1>
                        <p className="text-sm text-gray-500">We are at <span className="font-semibold text-gray-700">Deli Park Medan</span></p>
                    </div>
                </div>
                <div className="flex gap-4">
                    {role === "JR" && (
                        <Link href="/pawn/application/form-application" className="block">
                            <Card className="hover:bg-gray-50 cursor-pointer border-0 shadow-none transition-colors rounded-xl bg-white">
                                <CardContent className="flex flex-col items-center justify-center py-3 px-6 min-w-[140px] gap-2">
                                    <Calculator className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
                                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">TRANSAKSI BARU</span>
                                </CardContent>
                            </Card>
                        </Link>
                    )}
                    <Link href="/pawn/list" className="block">
                        <Card className="hover:bg-gray-50 cursor-pointer border-0 shadow-none transition-colors rounded-xl bg-white">
                            <CardContent className="flex flex-col items-center justify-center py-3 px-6 min-w-[140px] gap-2">
                                <List className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
                                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">DAFTAR TRANSAKSI</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/pawn/todays_transactions" className="block">
                        <Card className="hover:bg-gray-50 cursor-pointer border-0 shadow-none transition-colors rounded-xl bg-white">
                            <CardContent className="flex flex-col items-center justify-center py-3 px-6 min-w-[140px] gap-2">
                                <ShoppingCart className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
                                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">TRANSAKSI HARI INI</span>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* SM ONLY: Waiting Approval immediately after header */}
            {role === "SM" && (
                <div className="mt-2">
                    <MainTable 
                        title="Waiting Approval List"
                        data={enrichedData}
                        type="waiting_approval"
                    />
                </div>
            )}

            <h2 className="text-xl font-bold text-gray-600 mt-2">Dashboard Pawn</h2>

            {/* Jatuh Tempo Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JatuhTempoCard
                    title="Jatuh Tempo < 7"
                    headerColorClass="bg-[#FA6C6C] text-white"
                    data={enrichedData}
                    daysThreshold={7}
                    minDays={0}
                />
                <JatuhTempoCard
                    title="Jatuh Tempo < 14"
                    headerColorClass="bg-[#F6B714] text-white"
                    data={enrichedData}
                    daysThreshold={14}
                    minDays={7}
                />
                <JatuhTempoCard
                    title="Jatuh Tempo < 30"
                    headerColorClass="bg-[#12E275] text-white"
                    data={enrichedData}
                    daysThreshold={30}
                    minDays={14}
                />
            </div>

            {/* Summary Stats below Jatuh Tempo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 mb-4">
                <Card className="border-0 shadow-none rounded-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium uppercase">Titipan Aktif</span>
                            <span className="text-lg font-bold text-gray-800">{activePawnsCount} Transaksi</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-none rounded-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-cyan-50 rounded-full text-cyan-600">
                            <Banknote className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium uppercase">Total Gold Tunai</span>
                            <span className="text-lg font-bold text-gray-800">{formatRupiah(totalGoldTunai)}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-none rounded-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                            <CalendarDays className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium uppercase">Trx Bulan Berjalan</span>
                            <span className="text-lg font-bold text-gray-800">{currentMonthCount} Transaksi</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-none rounded-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
                            <Coins className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium uppercase">Gold Tunai Bulan Berjalan</span>
                            <span className="text-lg font-bold text-gray-800">{formatRupiah(currentMonthGold)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Tables */}
            <div className="flex flex-col gap-2 mt-4">
                
                {role === "JR" && (
                    <>
                        <MainTable 
                            title="Sedang proses persetujuan"
                            data={enrichedData}
                            type="waiting_approval"
                        />
                        
                        <MainTable 
                            title="Transaksi yang sudah disetujui"
                            data={enrichedData}
                            type="approved"
                        />
                    </>
                )}
            </div>

        </div>
    )
}
