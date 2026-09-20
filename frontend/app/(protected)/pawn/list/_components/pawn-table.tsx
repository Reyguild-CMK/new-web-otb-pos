
// Component
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Data
import { Pawn } from "../../../_data/data-pawn";
import { pawnData } from "../../../_data/data-pawn-dummy";

// Icon
import { FileText, ChevronsUpDown, ChevronUp, ChevronDown, Filter } from "lucide-react";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { useState, useMemo } from "react";
import { useAuthStore, Role } from "@/app/(protected)/_store/useAuthStore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";

// function dummy for last url
const getLastStepUrl = (status: string, role: Role) => {
    switch (status) {
        case "created":
            return role === "SM" ? "/pawn/list/detail" : "/pawn/application/form-application"
        case "waiting_approval":
            return role === "SM" ? "/pawn/list/detail" : "/pawn/application/document"
        case "approved":
            return "/pawn/application/summary"
        case "done":
            return "/pawn/list/detail"
        case "disbursed":
            return "/pawn/list/detail"
        case "ready_disburse":
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

const columns: { label: string; key: SortKey | null; isFilterable?: boolean }[] = [
    { label: "No", key: null },
    { label: "Type", key: "type" },
    { label: "Application Number", key: "applicationNumber" },
    { label: "Old Application", key: "oldApplication" },
    { label: "Customer", key: "customer", isFilterable: true },
    { label: "Jatuh Tempo", key: "jatuhTempo" },
    { label: "Dibuat Oleh", key: "dibuatOleh", isFilterable: true },
    { label: "Status", key: "status", isFilterable: true },
    { label: "Aksi", key: null },
];

export function PawnTable({ data }: PawnTableProps) {
    const loadTransaction = usePawnStore((state) => state.loadTransaction);
    const transactionList = usePawnStore((state) => state.transactionList);
    const { currentRole } = useAuthStore();
    const router = useRouter();

    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    const [customerFilter, setCustomerFilter] = useState<string>("all");
    const [dibuatOlehFilter, setDibuatOlehFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const uniqueCustomers = useMemo(() => Array.from(new Set(data.map(d => d.customer?.name || "-"))).filter(Boolean), [data]);
    const uniqueCreators = useMemo(() => Array.from(new Set(data.map(d => d.dibuatOleh))).filter(Boolean), [data]);
    const uniqueStatuses = useMemo(() => Array.from(new Set(data.map(d => d.status))).filter(Boolean), [data]);

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

    const filteredData = useMemo(() => {
        return data.filter(d => {
            const matchCustomer = customerFilter === "all" || (d.customer?.name || "-") === customerFilter;
            const matchCreator = dibuatOlehFilter === "all" || d.dibuatOleh === dibuatOlehFilter;
            const matchStatus = statusFilter === "all" || d.status === statusFilter;
            return matchCustomer && matchCreator && matchStatus;
        });
    }, [data, customerFilter, dibuatOlehFilter, statusFilter]);

    const sortedData = useMemo(() => {
        if (!sortKey || !sortDirection) return filteredData;
        
        return [...filteredData].sort((a, b) => {
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
    }, [filteredData, sortKey, sortDirection]);

    return (
        <Table>
            <TableHeader className="text-md">
                <TableRow>
                    {columns.map((col) => (
                        <TableHead key={col.label} className="pt-3">
                            {col.key ? (
                                <div className="flex items-center gap-1">
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => handleSort(col.key!)} 
                                        className="flex items-center justify-start gap-1 hover:bg-transparent px-0 font-semibold h-6"
                                    >
                                        {col.label}
                                        {sortKey === col.key ? (
                                            sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                        ) : (
                                            <ChevronsUpDown size={14} className="text-gray-400" />
                                        )}
                                    </Button>
                                    {col.isFilterable && (
                                        <Popover>
                                            <PopoverTrigger className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                                                <Filter size={12} className="text-gray-500" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-3" align="start">
                                                <p className="text-xs font-semibold mb-2">Filter {col.label}</p>
                                                <select 
                                                    className="text-xs border border-gray-200 rounded p-1.5 bg-white w-full focus:outline-none focus:ring-1 focus:ring-primary"
                                                    value={
                                                        col.key === "customer" ? customerFilter : 
                                                        col.key === "dibuatOleh" ? dibuatOlehFilter : 
                                                        statusFilter
                                                    }
                                                    onChange={(e) => {
                                                        if (col.key === "customer") setCustomerFilter(e.target.value);
                                                        if (col.key === "dibuatOleh") setDibuatOlehFilter(e.target.value);
                                                        if (col.key === "status") setStatusFilter(e.target.value);
                                                    }}
                                                >
                                                    <option value="all">Semua</option>
                                                    {(col.key === "customer" ? uniqueCustomers : col.key === "dibuatOleh" ? uniqueCreators : uniqueStatuses).map(opt => (
                                                        <option key={opt as string} value={opt as string}>{opt as string}</option>
                                                    ))}
                                                </select>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                </div>
                            ) : (
                                <div className="pt-1">{col.label}</div>
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
                        <TableCell>
                            {(() => {
                                if (list.oldApplication === "-") return list.oldApplication;
                                const oldTx = transactionList.find(t => t.applicationNumber === list.oldApplication);
                                if (oldTx) {
                                    return (
                                        <button 
                                            className="text-blue-600 hover:underline hover:text-blue-800 font-medium cursor-pointer"
                                            onClick={() => {
                                                loadTransaction(oldTx.id);
                                                router.push("/pawn/list/detail");
                                            }}
                                        >
                                            {list.oldApplication}
                                        </button>
                                    );
                                }
                                return list.oldApplication;
                            })()}
                        </TableCell>
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

                            <Link href={getLastStepUrl(list.status, currentRole)}>
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