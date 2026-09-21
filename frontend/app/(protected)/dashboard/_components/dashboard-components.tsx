"use client"

import * as React from "react"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

// Types
import { Pawn } from "@/app/(protected)/_data/data-pawn"
import { Customer } from "@/app/(protected)/_data/data-customer"

// Helper to format currency
export const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};

// Helper to calculate days until due
export const getDaysUntilDue = (dueDate: Date | string | null) => {
    if (!dueDate) return 999; // Fallback
    const parsedDate = new Date(dueDate);
    const today = new Date("2026-09-21T00:00:00"); // Using current system date for consistency
    const diffTime = parsedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Helper to merge pawn with customer data
export type EnrichedPawn = Pawn & { customerName: string };
export const enrichPawnData = (pawns: Pawn[], customers: Customer[]): EnrichedPawn[] => {
    return pawns.map(pawn => {
        const customer = customers.find(c => c.id === pawn.customerId);
        return {
            ...pawn,
            customerName: customer ? customer.name : "Unknown",
        };
    });
};

// ----------------------------------------------------------------------
// Jatuh Tempo Card Component
// ----------------------------------------------------------------------
interface JatuhTempoCardProps {
    title: string;
    headerColorClass: string;
    data: EnrichedPawn[];
    daysThreshold: number;
    minDays?: number;
}

export function JatuhTempoCard({ title, headerColorClass, data, daysThreshold, minDays = 0 }: JatuhTempoCardProps) {
    const filteredData = data.filter(pawn => {
        const txDate = new Date(pawn.tanggalTransaksi);
        const dueDate = pawn.dueDate ? new Date(pawn.dueDate) : new Date(txDate.getTime() + (pawn.tenor * 24 * 60 * 60 * 1000));
        const days = getDaysUntilDue(dueDate);
        return pawn.status === "disbursed" && days < daysThreshold && days >= minDays;
    }).slice(0, 4); // Take top 4 for the small card

    return (
        <Card className="flex flex-col h-full border-0 shadow-sm rounded-md overflow-hidden bg-white">
            <div className={`py-4 text-center ${headerColorClass}`}>
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <div className="flex-1 overflow-x-auto [&>div[data-slot=table-container]]:rounded-none [&>div[data-slot=table-container]]:border-x-0 [&>div[data-slot=table-container]]:border-t-0">
                <Table className="w-full text-xs">
                    <TableHeader>
                        <TableRow className="bg-white hover:bg-white border-b-2 border-gray-100">
                            <TableHead className="font-semibold text-gray-500 h-10 w-12 text-center bg-transparent pt-3">Hari</TableHead>
                            <TableHead className="font-semibold text-gray-500 h-10 bg-transparent pt-3 border-x border-gray-100">Nama Customer</TableHead>
                            <TableHead className="font-semibold text-gray-500 h-10 bg-transparent pt-3 text-center">Jumlah Pinjaman</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, idx) => {
                                const txDate = new Date(item.tanggalTransaksi);
                                const dueDate = item.dueDate ? new Date(item.dueDate) : new Date(txDate.getTime() + (item.tenor * 24 * 60 * 60 * 1000));
                                return (
                                <TableRow key={idx} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                    <TableCell className={`text-center font-bold text-gray-600`}>{getDaysUntilDue(dueDate)}</TableCell>
                                    <TableCell className="border-x border-gray-100 text-gray-600">{item.customerName}</TableCell>
                                    <TableCell className="text-center text-gray-600">{formatRupiah(item.nilaiPinjaman)}</TableCell>
                                </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-6 text-gray-400">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <CardFooter className="p-3 justify-end bg-white border-t border-gray-100">
                <Button variant="ghost" size="sm" className="text-xs h-6 text-gray-400 hover:text-gray-600 font-medium px-2">Lihat semua</Button>
            </CardFooter>
        </Card>
    );
}



// ----------------------------------------------------------------------
// Main Table Component
// ----------------------------------------------------------------------
interface MainTableProps {
    title: string;
    data: EnrichedPawn[];
    type: "due" | "processing" | "approved" | "waiting_approval";
}

export function MainTable({ title, data, type }: MainTableProps) {
    const filteredData = data.filter(pawn => {
        if (type === "due") {
            const txDate = new Date(pawn.tanggalTransaksi);
            const dueDate = pawn.dueDate ? new Date(pawn.dueDate) : new Date(txDate.getTime() + (pawn.tenor * 24 * 60 * 60 * 1000));
            const days = getDaysUntilDue(dueDate);
            return days < 30 && pawn.status !== "done" && pawn.status !== "cancel" && pawn.status !== "rejected";
        }
        if (type === "processing") return pawn.status === "processing";
        if (type === "waiting_approval") return pawn.status === "waiting_approval";
        if (type === "approved") return pawn.status === "approved";
        return true;
    }).slice(0, 5); // limit to 5 for UI

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">{title}</h2>
                <Link href={`/pawn/list?status=${type}`}>
                    <Button variant="secondary" size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs h-8 px-4 rounded-sm">
                        {type === "approved" ? "Lihat Detail" : "See Detail"}
                    </Button>
                </Link>
            </div>
            <div className="w-full">
                <Table className="w-full text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[20%]">No SBG</TableHead>
                            <TableHead className="w-[30%]">Nama</TableHead>
                            <TableHead className="w-[20%]">Jumlah Pinjaman</TableHead>
                            <TableHead className="w-[20%]">{(type === "processing" || type === "waiting_approval") ? "Transaksi Dibuat" : "Jatuh Tempo"}</TableHead>
                            <TableHead className="w-[10%] text-center">#</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, idx) => {
                                const txDate = new Date(item.tanggalTransaksi);
                                const dateToShow = (type === "processing" || type === "waiting_approval") 
                                    ? txDate 
                                    : (item.dueDate ? new Date(item.dueDate) : new Date(txDate.getTime() + (item.tenor * 24 * 60 * 60 * 1000)));
                                
                                return (
                                    <TableRow key={idx} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                        <TableCell className="text-gray-600 font-medium">{item.applicationNumber}</TableCell>
                                        <TableCell className="text-gray-600">{item.customerName}</TableCell>
                                        <TableCell className="text-gray-600">{formatRupiah(item.nilaiPinjaman)}</TableCell>
                                        <TableCell className="text-gray-600">
                                            {dateToShow.toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "2-digit",
                                                ...((type === "processing" || type === "waiting_approval") ? { hour: '2-digit', minute: '2-digit' } : {})
                                            }).replace(',', '')}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500">
                                                <FileText className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-gray-500">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
