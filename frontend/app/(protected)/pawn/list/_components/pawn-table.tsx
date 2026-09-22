
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
import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useAuthStore, Role } from "@/app/(protected)/_store/useAuthStore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// function dummy for last url
const getLastStepUrl = (pawn: PawnSummary, role: Role) => {
    switch (pawn.status) {
        case "created":
            if (role === "SM") return "/pawn/list/detail";
            
            // Deduce the last step for JR based on filled data:
            if (!pawn.pawnItems || pawn.pawnItems.length === 0) {
                return "/pawn/application/form-application"; // Step 1: Items
            }
            if (!pawn.draftData?.loanDetails?.isCalculated) {
                return "/pawn/application/loan"; // Step 2: Loan Calculation
            }
            if (!pawn.customer || pawn.customer.id === 0) {
                return "/pawn/application/customer_data"; // Step 3: Customer
            }
            if (!pawn.pawnDocs) {
                return "/pawn/application/document"; // Step 4: Document
            }
            return "/pawn/application/summary"; // Step 5: Summary

        case "waiting_approval":
            return role === "SM" ? "/pawn/list/detail" : "/pawn/application/document"
        case "approved":
            return "/pawn/application/summary"
        case "done":
        case "disbursed":
        case "ready_disburse":
            return "/pawn/list/detail"
        default:
            return "/pawn/application/form-application"
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
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    const [customerFilter, setCustomerFilter] = useState<string>("all");
    const [dibuatOlehFilter, setDibuatOlehFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "all");

    // Sync statusFilter with URL when it changes (e.g. clicking Sidebar link)
    useEffect(() => {
        setStatusFilter(searchParams.get("status") || "all");
    }, [searchParams]);

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

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [sortedData]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex flex-col gap-4">
        <Table className="min-w-225">
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
                                    {col.isFilterable && (() => {
                                        const isFilterActive = 
                                            (col.key === "customer" && customerFilter !== "all") ||
                                            (col.key === "dibuatOleh" && dibuatOlehFilter !== "all") ||
                                            (col.key === "status" && statusFilter !== "all");
                                        
                                        return (
                                        <Popover>
                                            <PopoverTrigger
                                                aria-label={`Filter ${col.label}`}
                                                title={`Filter ${col.label}`}
                                                className={`inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground ${isFilterActive ? 'bg-blue-50' : ''}`}
                                            >
                                                <Filter size={12} aria-hidden="true" className={isFilterActive ? "fill-blue-100 text-blue-700" : "text-gray-700"} />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-50 p-3" align="start">
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
                                                        if (col.key === "status") {
                                                            const val = e.target.value;
                                                            setStatusFilter(val);
                                                            const params = new URLSearchParams(searchParams.toString());
                                                            if (val === "all") {
                                                                params.delete("status");
                                                            } else {
                                                                params.set("status", val);
                                                            }
                                                            router.push(`${pathname}?${params.toString()}`);
                                                        }
                                                    }}
                                                >
                                                    <option value="all">Semua</option>
                                                    {(col.key === "customer" ? uniqueCustomers : col.key === "dibuatOleh" ? uniqueCreators : uniqueStatuses).map(opt => (
                                                        <option key={opt as string} value={opt as string}>{opt as string}</option>
                                                    ))}
                                                </select>
                                                
                                                {isFilterActive && (
                                                    <div className="mt-3 flex justify-end border-t border-gray-100 pt-2">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className="h-6 px-2 text-[10px] text-red-700 hover:bg-red-50 hover:text-red-900"
                                                            onClick={() => {
                                                                if (col.key === "customer") setCustomerFilter("all");
                                                                if (col.key === "dibuatOleh") setDibuatOlehFilter("all");
                                                                if (col.key === "status") {
                                                                    setStatusFilter("all");
                                                                    const params = new URLSearchParams(searchParams.toString());
                                                                    params.delete("status");
                                                                    router.push(`${pathname}?${params.toString()}`);
                                                                }
                                                            }}
                                                        >
                                                            Hapus Filter
                                                        </Button>
                                                    </div>
                                                )}
                                            </PopoverContent>
                                        </Popover>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <div className="pt-1">{col.label}</div>
                            )}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedData.map((list, index) =>(
                    <TableRow key={list.id}>
                        <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                        <TableCell>{list.type}</TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-0.5">
                                <span>{list.applicationNumber}</span>
                                {list.isTakeOver && (
                                    <span className="text-[11px] text-red-700 font-semibold">(Take Over)</span>
                                )}
                                {list.status === "created" && (
                                    <span className="text-[11px] text-red-700 font-semibold">(Draft)</span>
                                )}
                            </div>
                        </TableCell>
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
                        <TableCell>
                            <div className="flex flex-col">
                                <span>{list.customer?.name || "-"}</span>
                                {list.customer?.id !== 0 && (
                                    <div className="mt-0.5 flex flex-col text-[10px] leading-tight text-gray-700">
                                        <span>{list.customer?.handphone !== "-" ? list.customer?.handphone : ""}</span>
                                        <span>{list.customer?.email || ""}</span>
                                    </div>
                                )}
                            </div>
                        </TableCell>
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
                                ${list.status === 'created' ? 'bg-text-muted text-gray-dark' : ''}
                                ${list.status === 'waiting_approval' ? 'bg-yellow-medium text-yellow-800' : ''}
                                ${list.status === 'approved' ? 'bg-blue-soft text-blue-800' : ''}
                                ${list.status === 'disbursed' ? 'bg-green-soft text-green-800' : ''}
                                ${list.status === 'done' ? 'bg-green-800 text-white' : ''}
                            `}>
                                {list.status}
                            </span>
                        </TableCell>
                        <TableCell className="flex gap-2">

                            <Button
                                nativeButton={false}
                                render={<Link href={getLastStepUrl(list, currentRole)} />}
                                variant="ghost"
                                size="icon"
                                onClick={() => loadTransaction(list.id)}
                                aria-label={`Buka transaksi ${list.applicationNumber}`}
                            >
                                <FileText size={16} aria-hidden="true" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        
        {/* Pagination Controls */}
        <div className="flex items-center justify-center py-4">
            <nav role="navigation" aria-label="pagination" className="mx-auto flex w-full justify-center">
                <ul className="flex flex-row items-center -space-x-px">
                    <li>
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-l-md"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (totalPages > 7) {
                            if (page !== 1 && page !== totalPages && Math.abs(currentPage - page) > 1) {
                                if (page === currentPage - 2 || page === currentPage + 2) {
                                    return (
                                        <li key={page}>
                                            <span className="flex h-9 w-9 items-center justify-center border border-input bg-background">
                                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                            </span>
                                        </li>
                                    );
                                }
                                return null;
                            }
                        }
                        return (
                            <li key={page}>
                                <button
                                    onClick={() => setCurrentPage(page)}
                                    className={`inline-flex h-9 w-9 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input ${
                                        currentPage === page
                                            ? "bg-[#337ab7] text-white hover:bg-[#286090]"
                                            : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}

                    <li>
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-r-md"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
    )
}