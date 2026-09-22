"use client"
// Icon
import { Calculator, List, ShoppingCart, Wallet, Banknote, CalendarDays, Coins } from "lucide-react"

// Components
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// Data
import { dataCustomer } from "@/app/(protected)/_data/data-customer"
import { getPawnSummary, PawnSummary } from "@/app/(protected)/_data/data-summary"

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
    const { transactionList: pawnData, loadTransaction } = usePawnStore();

    // Enrich pawn data with customer names
    const summaryData = pawnData.map(p => getPawnSummary(p)).filter((p): p is PawnSummary => p !== undefined);
    const enrichedData = enrichPawnData(summaryData, dataCustomer);

    // Calculate Summary Stats dynamically
    const activePawns = enrichedData.filter(p => p.status === "disbursed");
    const activePawnsCount = activePawns.length;
    const totalGoldTunai = activePawns.reduce((sum, p) => sum + p.nilaiPinjaman, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthPawns = activePawns.filter(p => {
        let dueDate = p.jatuhTempo instanceof Date ? p.jatuhTempo : new Date(p.jatuhTempo);
        if (isNaN(dueDate.getTime())) {
            const txDate = new Date(p.tanggalTransaksi);
            dueDate = p.dueDate ? new Date(p.dueDate) : new Date(txDate.getTime() + ((p.tenordata?.tenor || p.tenor || 120) * 24 * 60 * 60 * 1000));
        }
        return dueDate.getMonth() === currentMonth && dueDate.getFullYear() === currentYear;
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
                <div className="grid grid-cols-3 gap-3">
                    {role === "JR" && (
                        <Link href="/pawn/application/form-application" className="block">
                            <Card className="hover:bg-gray-50 cursor-pointer border-0 shadow-none transition-colors rounded-xl bg-white h-full">
                                <CardContent className="flex flex-col items-center justify-center py-3 px-2 gap-2 h-full">
                                    <Calculator className="h-6 w-6 shrink-0" strokeWidth={1.5} />
                                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-center leading-tight">TRANSAKSI BARU</span>
                                </CardContent>
                            </Card>
                        </Link>
                    )}
                    <Link href="/pawn/list" className="block">
                        <Card className="hover:bg-gray-50 cursor-pointer border-0 shadow-none transition-colors rounded-xl bg-white h-full">
                            <CardContent className="flex flex-col items-center justify-center py-3 px-2 gap-2 h-full">
                                <List className="h-6 w-6 shrink-0" strokeWidth={1.5} />
                                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-center leading-tight">DAFTAR TRANSAKSI</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/pawn/todays_transactions" className="block">
                        <Card className="hover:bg-gray-50 cursor-pointer border-0 shadow-none transition-colors rounded-xl bg-white h-full">
                            <CardContent className="flex flex-col items-center justify-center py-3 px-2 gap-2 h-full">
                                <ShoppingCart className="h-6 w-6 shrink-0" strokeWidth={1.5} />
                                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-center leading-tight">TRANSAKSI HARI INI</span>
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
                        role={role}
                        loadTransaction={loadTransaction}
                    />
                </div>
            )}

            <h2 className="text-xl font-bold mt-2">Dashboard Pawn</h2>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-none rounded-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium uppercase">Titipan Aktif</span>
                            <span className="text-lg font-bold">{activePawnsCount} Transaksi</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-none rounded-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-cyan-50 rounded-full text-cyan-600">
                            <Banknote className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium uppercase">Total Gold Tunai</span>
                            <span className="text-lg font-bold ">{formatRupiah(totalGoldTunai)}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-none rounded-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                            <CalendarDays className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium uppercase">Trx Bulan Berjalan</span>
                            <span className="text-lg font-bold">{currentMonthCount} Transaksi</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-none rounded-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
                            <Coins className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium uppercase">Gold Tunai Bulan Berjalan</span>
                            <span className="text-lg font-bold">{formatRupiah(currentMonthGold)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Jatuh Tempo Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                <div className="h-full">
                    <JatuhTempoCard
                        title="Jatuh Tempo <= 7 Hari"
                        headerColorClass="bg-alert-error-bg"
                        data={enrichedData}
                        daysThreshold={7}
                        minDays={0}
                        role={role}
                        loadTransaction={loadTransaction}
                    />
                </div>
                <div className="h-full">
                    <JatuhTempoCard
                        title="Jatuh Tempo <= 14 Hari"
                        headerColorClass="bg-alert-warning-bg"
                        data={enrichedData}
                        daysThreshold={14}
                        minDays={8}
                        role={role}
                        loadTransaction={loadTransaction}
                    />
                </div>
                <div className="h-full">
                    <JatuhTempoCard
                        title="Jatuh Tempo <= 30 Hari"
                        headerColorClass="bg-alert-success-bg"
                        data={enrichedData}
                        daysThreshold={30}
                        minDays={15}
                        role={role}
                        loadTransaction={loadTransaction}
                    />
                </div>
            </div>

            {/* Main Tables */}
            <div className="flex flex-col gap-2 mt-4">

                {role === "JR" && (
                    <>
                        <MainTable
                            title="Transaksi yang akan jatuh tempo"
                            data={enrichedData}
                            type="due"
                            role={role}
                            loadTransaction={loadTransaction}
                        />

                        <MainTable
                            title="Sedang proses persetujuan"
                            data={enrichedData}
                            type="waiting_approval"
                            role={role}
                            loadTransaction={loadTransaction}
                        />

                        <MainTable
                            title="Transaksi yang sudah disetujui"
                            data={enrichedData}
                            type="approved"
                            role={role}
                            loadTransaction={loadTransaction}
                        />
                    </>
                )}

                {role === "SM" && (
                    <MainTable
                        title="Transaksi yang akan jatuh tempo"
                        data={enrichedData}
                        type="due"
                        role={role}
                        loadTransaction={loadTransaction}
                    />
                )}
            </div>

        </div>
    )
}
