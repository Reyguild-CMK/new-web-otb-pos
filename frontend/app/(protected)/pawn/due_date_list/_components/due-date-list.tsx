"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { PawnSummary } from "@/app/(protected)/_data/data-summary"
import { PawnStatusNotification } from "@/app/(protected)/_data/data-pawn"
import { DropDownStatus } from "./dropdown-due-date"

import { FileText } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

interface DueDateListDataProps {
  data: PawnSummary[]
}

type StatusMap = Record<string, PawnStatusNotification>

const actionLabels: Record<PawnStatusNotification, string> = {
    akan_lunas: "Akan Lunas",
    bayar_sebagian: "Bayar Sebagian",
    gadai_ulang: "Gadai Ulang",
    tanpa_status: "Tanpa Status",
    tidak_akan_lunas: "Tidak Akan Lunas",
};

function getDateKey(dateValue: Date | string) {
    const date = new Date(dateValue)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

function formatDateHeading(dateKey: string) {
    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(`${dateKey}T00:00:00`))
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value)
}

export function DueDateListsTable({ data }: DueDateListDataProps) {
    // Status yang sudah dianggap tersimpan
    const [savedStatusMap, setSavedStatusMap] = useState<StatusMap>({})

    // Status yang sedang dipilih dari dropdown
    const [draftStatusMap, setDraftStatusMap] = useState<StatusMap>({})

    useEffect(() => {
        const storedStatus = localStorage.getItem("pawn-status-notification")

        if (storedStatus) {
        setSavedStatusMap(JSON.parse(storedStatus))
        }
    }, [])

    const groupedPawns = useMemo(() => {
        return data.reduce<Record<string, PawnSummary[]>>((groups, pawn) => {
        if (!pawn.jatuhTempo) {
            return groups
        }

        const dateKey = getDateKey(pawn.jatuhTempo)

        if (!groups[dateKey]) {
            groups[dateKey] = []
        }

        groups[dateKey].push(pawn)

        return groups
        }, {})
    }, [data])

    const sortedGroupedPawns = useMemo(() => {
        return Object.entries(groupedPawns).sort(([dateA], [dateB]) =>
        dateA.localeCompare(dateB)
        )
    }, [groupedPawns])

    const handleStatusChange = (
        pawnId: string,
        status: PawnStatusNotification
    ) => {
        setDraftStatusMap((previous) => ({
        ...previous,
        [pawnId]: status,
        }))
    }

    const handleSaveStatus = async (pawnId: string) => {
        const selectedStatus = draftStatusMap[pawnId]

        if (!selectedStatus) {
        return
        }

        const updatedStatusMap = {
        ...savedStatusMap,
        [pawnId]: selectedStatus,
        }

        setSavedStatusMap(updatedStatusMap)

        localStorage.setItem(
        "pawn-status-notification",
        JSON.stringify(updatedStatusMap)
        )

        console.log({
        pawnId,
        statusNotification: selectedStatus,
        })
    }

    if (data.length === 0) {
        return (
        <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
            No item due date list
        </div>
        )
    }

    return (
        <div className="space-y-4">
        {sortedGroupedPawns.map(([date, pawns]) => (
            <section key={date} className="space-y-3">
            <div className="overflow-hidden rounded-md border p-4">
                <h5 className="text-md font-semibold mb-2">
                    {formatDateHeading(date)}
                </h5>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="text-center">#</TableHead>
                        <TableHead className="text-center">Store</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Contact</TableHead>
                        <TableHead className="text-center">Loan</TableHead>
                        <TableHead className="text-center">Due Date</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {pawns.map((pawn) => {
                            const pawnId = String(pawn.id)

                            const hasSavedStatus = Object.prototype.hasOwnProperty.call(
                                savedStatusMap,
                                pawnId
                            );
                            const savedStatus =
                                savedStatusMap[pawnId] ??
                                pawn.statusNotification ??
                                "tanpa_status";

                            const selectedStatus =
                                draftStatusMap[pawnId] ?? savedStatus;
                            
                            const actionLabel = actionLabels[savedStatus];

                            return (
                                <TableRow key={pawn.id}>
                                    <TableCell className="text-center">
                                        <Link
                                            href={`/pawn/list/detail?id=${pawn.id}`}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <FileText />
                                        </Link>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {pawn.storeId}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {pawn.customer.name}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div>{pawn.customer.handphone}</div>
                                        <div>{pawn.customer.email}</div>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {formatCurrency(pawn.nilaiPinjaman)}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {new Date(pawn.jatuhTempo!).toLocaleDateString("id-ID")}
                                    </TableCell>

                                    <TableCell>
                                        {hasSavedStatus ? (
                                            <span className="text-xs text-center">
                                                {actionLabel}
                                            </span>
                                        ) : (
                                            <div className="flex justify-center gap-2">
                                                <DropDownStatus
                                                    value={selectedStatus}
                                                    onChange={(value) =>
                                                        handleStatusChange(pawnId, value)
                                                    }
                                                />

                                                <Button
                                                    className="bg-green-medium"
                                                    size="sm"
                                                    onClick={() => handleSaveStatus(pawnId)}
                                                    disabled={!draftStatusMap[pawnId]}
                                                >
                                                    Save
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                            })}
                        </TableBody>
                </Table>
            </div>
            </section>
        ))}
        </div>
    )
}