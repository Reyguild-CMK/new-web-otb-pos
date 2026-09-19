
// Component
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Data
import { Pawn } from "../../../_data/data-pawn";
import { pawnData } from "../../../_data/data-pawn-dummy";

// Icon
import { FileText } from "lucide-react";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";

// function dummy for last url
const getLastStepUrl = (status: string) => {
    switch (status) {
        case "created":
            return "/pawn/application/form-application"
        case "waiting_approval":
            return "/pawn/application/document"
        case "approved":
            return "/pawn/application/summary"
        case "done":
            return "/pawn/application/summary"
        case "disbursed":
            return "/pawn/list/detail"
        default:
            return "/pawn/application/loan"
    }
}

interface PawnTableProps {
    data: PawnSummary[];
}

import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";
import { Check } from "lucide-react";

export function PawnTable({ data }: PawnTableProps) {
    const loadTransaction = usePawnStore((state) => state.loadTransaction);
    const updateTransactionStatus = usePawnStore((state) => state.updateTransactionStatus);

    return (
        <Table>
            <TableHeader className="text-md">
                <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Application Number</TableHead>
                    <TableHead>Old Application</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Dibuat Oleh</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((list, index) =>(
                    <TableRow key={list.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{list.type}</TableCell>
                        <TableCell>{list.applicationNumber}</TableCell>
                        <TableCell>{list.oldApplication}</TableCell>
                        <TableCell>{list.customer?.name || "-"}</TableCell>
                        <TableCell>
                            {list.jatuhTempo instanceof Date && !isNaN(list.jatuhTempo.getTime())
                                ? list.jatuhTempo.toLocaleDateString("id-ID")
                                : list.jatuhTempo
                                  ? new Date(list.jatuhTempo).toLocaleDateString("id-ID")
                                  : "-"}
                        </TableCell>
                        <TableCell>{list.dibuatOleh}</TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                ${list.status === 'created' ? 'bg-gray-200 text-gray-800' : ''}
                                ${list.status === 'waiting_approval' ? 'bg-yellow-200 text-yellow-800' : ''}
                                ${list.status === 'approved' ? 'bg-blue-200 text-blue-800' : ''}
                                ${list.status === 'done' ? 'bg-indigo-200 text-indigo-800' : ''}
                                ${list.status === 'disbursed' ? 'bg-green-200 text-green-800' : ''}
                            `}>
                                {list.status}
                            </span>
                        </TableCell>
                        <TableCell className="flex gap-2">

                            <Link href={getLastStepUrl(list.status)}>
                                <Button variant="ghost" size="icon" onClick={() => loadTransaction(list.id)}>
                                    <FileText size={16} />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}