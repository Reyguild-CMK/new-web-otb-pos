
// Component
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Data
import { Pawn } from "../../../_data/data-pawn";
import { pawnData } from "../../../_data/data-pawn-dummy";

// Icon
import { FileText, ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { useState, useMemo } from "react";

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
            return "/pawn/list/detail"
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
type SortKey = "type" | "applicationNumber" | "oldApplication" | "customer" | "jatuhTempo" | "dibuatOleh" | "status";
type SortDirection = "asc" | "desc" | null;

const columns: { label: string; key: SortKey | null }[] = [
    { label: "No", key: null },
    { label: "Type", key: "type" },
    { label: "Application Number", key: "applicationNumber" },
    { label: "Old Application", key: "oldApplication" },
    { label: "Customer", key: "customer" },
    { label: "Jatuh Tempo", key: "jatuhTempo" },
    { label: "Dibuat Oleh", key: "dibuatOleh" },
    { label: "Status", key: "status" },
    { label: "Aksi", key: null },
];

export function PawnTable({ data }: PawnTableProps) {
    const loadTransaction = usePawnStore((state) => state.loadTransaction);

    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    const handleSort = (key: SortKey) => {
        let direction: SortDirection = "asc";
        if (sortKey === key && sortDirection === "asc") {
            direction = "desc";
        } else if (sortKey === key && sortDirection === "desc") {
            direction = null;
            setSortKey(null);
            setSortDirection(null);
            return;
        }
        setSortKey(key);
        setSortDirection(direction);
    };

    const sortedData = useMemo(() => {
        if (!sortKey || !sortDirection) return data;
        
        return [...data].sort((a, b) => {
            let valA: any = a[sortKey as keyof PawnSummary];
            let valB: any = b[sortKey as keyof PawnSummary];

            if (sortKey === "customer") {
                valA = a.customer?.name || "";
                valB = b.customer?.name || "";
            }
            
            if (sortKey === "jatuhTempo") {
                valA = a.jatuhTempo ? new Date(a.jatuhTempo).getTime() : 0;
                valB = b.jatuhTempo ? new Date(b.jatuhTempo).getTime() : 0;
            }

            if (valA < valB) return sortDirection === "asc" ? -1 : 1;
            if (valA > valB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortKey, sortDirection]);

    return (
        <Table>
            <TableHeader className="text-md">
                <TableRow>
                    {columns.map((col) => (
                        <TableHead key={col.label}>
                            {col.key ? (
                                <Button 
                                    variant="ghost" 
                                    onClick={() => handleSort(col.key!)} 
                                    className="flex items-center gap-1 hover:bg-transparent px-0 font-semibold h-8"
                                >
                                    {col.label}
                                    {sortKey === col.key ? (
                                        sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                    ) : (
                                        <ChevronsUpDown size={14} className="text-gray-400" />
                                    )}
                                </Button>
                            ) : (
                                col.label
                            )}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedData.map((list, index) =>(
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