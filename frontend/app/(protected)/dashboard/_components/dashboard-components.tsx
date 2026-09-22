"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { Customer } from "@/app/(protected)/_data/data-customer"
import { PawnSummary } from "@/app/(protected)/_data/data-summary"
import { Role } from "@/app/(protected)/_store/useAuthStore"

export const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};

// Helper to calculate days until due
export const getDaysUntilDue = (dueDate: Date | string | null) => {
    if (!dueDate) return 999;
    const parsedDate = new Date(dueDate);
    parsedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = parsedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Helper to merge pawn with customer data
export type EnrichedPawn = PawnSummary & { customerName: string };
export const enrichPawnData = (pawns: PawnSummary[], customers: Customer[]): EnrichedPawn[] => {
    return pawns.map(pawn => {
        const customer = customers.find(c => c.id === pawn.customerId);
        return {
            ...pawn,
            customerName: customer ? customer.name : "Unknown",
        };
    });
};

const getLastStepUrl = (pawn: EnrichedPawn, role: Role) => {
    switch (pawn.status) {
        case "created":
            if (role === "SM") return "/pawn/list/detail";
            if (!pawn.pawnItems || pawn.pawnItems.length === 0) return "/pawn/application/form-application";
            if (!pawn.draftData?.loanDetails?.isCalculated) return "/pawn/application/loan";
            if (!pawn.customer || pawn.customer.id === 0) return "/pawn/application/customer_data";
            if (!pawn.pawnDocs) return "/pawn/application/document";
            return "/pawn/application/summary";
        case "waiting_approval":
            return role === "SM" ? "/pawn/list/detail" : "/pawn/application/document";
        case "approved":
            return "/pawn/application/summary";
        case "done":
        case "disbursed":
        case "ready_disburse":
            return "/pawn/list/detail";
        default:
            return "/pawn/application/form-application";
    }
}

interface JatuhTempoCardProps {
    title: string;
    headerColorClass: string;
    data: EnrichedPawn[];
    daysThreshold: number;
    minDays?: number;
    role: Role;
    loadTransaction: (id: number) => void;
}

export function JatuhTempoCard({ title, headerColorClass, data, daysThreshold, minDays = 0, role, loadTransaction }: JatuhTempoCardProps) {
    const router = useRouter();
    const filteredData = data.filter(pawn => {
        const dueDate = pawn.jatuhTempo instanceof Date ? pawn.jatuhTempo : new Date(pawn.jatuhTempo);
        const days = getDaysUntilDue(dueDate);
        const isActive = pawn.status === "disbursed";
        return isActive && days <= daysThreshold && days >= minDays;
    }).slice(0, 4); // Take top 4 for the small card

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const toLocalDateStr = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    const minDateStr = toLocalDateStr(new Date(today.getTime() + (minDays * 24 * 60 * 60 * 1000)));
    const thresholdDateStr = toLocalDateStr(new Date(today.getTime() + (daysThreshold * 24 * 60 * 60 * 1000)));

    return (
        <Card className="flex flex-col h-full border-0 shadow-sm rounded-md overflow-hidden bg-white">
            <div className={`py-4 text-center ${headerColorClass}`}>
                <h3 className="font-medium">{title}</h3>
            </div>
            <div className="flex-1 overflow-x-auto [&>div[data-slot=table-container]]:rounded-none [&>div[data-slot=table-container]]:border-x-0 [&>div[data-slot=table-container]]:border-t-0">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-white hover:bg-white border-b-2 border-gray-100">
                            <TableHead className="font-semibold h-10 w-12 text-center bg-transparent pt-3">Hari</TableHead>
                            <TableHead className="font-semibold h-10 bg-transparent pt-3 border-x border-gray-100">Nama Customer</TableHead>
                            <TableHead className="font-semibold h-10 bg-transparent pt-3 text-center">Jumlah Pinjaman</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, idx) => {
                                const dueDate = item.jatuhTempo instanceof Date ? item.jatuhTempo : new Date(item.jatuhTempo);
                                return (
                                    <TableRow
                                        key={item.id}
                                        className="bg-white hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                                        onClick={() => {
                                            loadTransaction(item.id);
                                            router.push(getLastStepUrl(item, role));
                                        }}
                                    >
                                        <TableCell className={`text-center font-bold`}>{getDaysUntilDue(dueDate)}</TableCell>
                                        <TableCell className="border-x border-gray-100">{item.customerName}</TableCell>
                                        <TableCell className="text-center">{formatRupiah(item.nilaiPinjaman)}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-6">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <CardFooter className="p-3 justify-end bg-white border-t border-gray-100 mt-auto">
                <Button
                    nativeButton={false}
                    render={<Link href={`/pawn/list?status=disbursed&dueDateFrom=${minDateStr}&dueDateTo=${thresholdDateStr}`} />}
                    variant="ghost"
                    size="sm"
                    className="h-6 text-navy-medium hover:underline font-medium px-2"
                >
                    Lihat semua
                </Button>
            </CardFooter>
        </Card>
    );
}


interface MainTableProps {
    title: string;
    data: EnrichedPawn[];
    type: "due" | "processing" | "approved" | "waiting_approval";
    role: Role;
    loadTransaction: (id: number) => void;
}

export function MainTable({ title, data, type, role, loadTransaction }: MainTableProps) {
    const allFiltered = data.filter(pawn => {
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
    });

    const totalCount = allFiltered.length;
    const filteredData = allFiltered.slice(0, 5);
    const hasMore = totalCount > 5;

    const detailHref = type === "due" ? "/pawn/due_date_list" : `/pawn/list?status=${type}`;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="font-medium">{title}</h2>
                    {totalCount > 0 && (
                        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-gray-100 px-1.5 text-[10px] font-bold text-gray-600 h-5">
                            {totalCount}
                        </span>
                    )}
                </div>
                <Button
                    nativeButton={false}
                    render={<Link href={detailHref} />}
                    variant="secondary"
                    size="xs"
                    className="bg-btn-primary-bg hover:bg-yellow-500 text-black h-6 px-4 rounded-sm"
                >
                    Lihat Detail
                </Button>
            </div>
            <div className="w-full">
                <Table className="w-full">
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
                            filteredData.map((item) => {
                                const txDate = new Date(item.tanggalTransaksi);
                                const dateToShow = (type === "processing" || type === "waiting_approval")
                                    ? txDate
                                    : (item.dueDate ? new Date(item.dueDate) : new Date(txDate.getTime() + (item.tenor * 24 * 60 * 60 * 1000)));

                                return (
                                    <TableRow key={item.id} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                        <TableCell className="font-medium">{item.applicationNumber}</TableCell>
                                        <TableCell className="">{item.customerName}</TableCell>
                                        <TableCell className="">{formatRupiah(item.nilaiPinjaman)}</TableCell>
                                        <TableCell className="">
                                            {dateToShow.toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "2-digit",
                                                ...((type === "processing" || type === "waiting_approval") ? { hour: '2-digit', minute: '2-digit' } : {})
                                            }).replace(',', '')}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                nativeButton={false}
                                                render={<Link href={getLastStepUrl(item, role)} />}
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => loadTransaction(item.id)}
                                                aria-label={`Buka transaksi ${item.applicationNumber}`}
                                            >
                                                <FileText className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {hasMore && (
                <div className="flex items-center justify-between mt-2 px-1">
                    <p className="text-xs text-gray-600">
                        Menampilkan <span className="font-semibold text-gray-600">5</span> dari <span className="font-semibold text-gray-600">{totalCount}</span> data
                    </p>
                    <Link href={detailHref} className="text-xs text-navy-medium hover:underline font-medium">
                        Lihat {totalCount - 5} data lainnya →
                    </Link>
                </div>
            )}
        </div>
    );
}
