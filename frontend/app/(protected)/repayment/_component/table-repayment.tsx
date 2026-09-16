"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { useState } from "react";
import { PawnStatusNotification } from "../../_data/data-pawn";
import { DropDownStatus } from "../../pawn/due_date_list/_components/dropdown-due-date";
import { Card } from "@/components/ui/card";
import { getRepaymentAction } from "./_modal/repayment-action";
import { canChangeStatus, getRepaymentStatus, isPawnDone } from "../_lib/repayment-logic";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatRupiah } from "@/lib/currency";

interface todaysDataProps {
  data?: PawnSummary[];
}


export function RepaymentTable({ data }: todaysDataProps) {
    const [statusMap, setStatusMap] = useState<Record<string, PawnStatusNotification>>({});

    const handleStatusChange = (pawnId: string, status: PawnStatusNotification) => {
        setStatusMap((prev) => ({
        ...prev,
        [pawnId]: status,
        }));
    };
    return (
       <Card className="rounded-none p-4">
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Application Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Loan</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Repayment Status</TableHead>
                    </TableRow>
                </TableHeader>

                {!data ? (
                    <TableBody>
                    <TableRow>
                        <TableCell className="text-center bg-muted" colSpan={8}>
                        No Data
                        </TableCell>
                    </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                    {data.map((pawn) => {
                        const currentStatus = statusMap[pawn.id] ?? pawn.statusNotification;
                        const action = getRepaymentAction(pawn, currentStatus);
                        const repaymentStatus = getRepaymentStatus(pawn);

                        return (
                        <TableRow key={pawn.id}>
                            <TableCell>{pawn.applicationNumber}</TableCell>
                            <TableCell>{pawn.customer.name}</TableCell>
                            <TableCell>{formatRupiah(pawn.nilaiPinjaman)}</TableCell>
                            <TableCell>{pawn.tanggalTransaksi.toLocaleDateString("id-ID")}</TableCell>
                            <TableCell>{pawn.jatuhTempo?.toLocaleDateString("id-ID")}</TableCell>
                            <TableCell>
                                {isPawnDone(pawn) || !canChangeStatus(pawn) ? ("~") : (
                                    <DropDownStatus 
                                        value={currentStatus}
                                        onChange={(value) => handleStatusChange(String(pawn.id), value)}></DropDownStatus>
                                )}
                            </TableCell>
                            <TableCell>
                                {action === "view-docs" && (
                                    <Button type="button">View Docs</Button>
                                )}
                                {action === "upload-docs" && (
                                    <Button type="button">Upload Docs</Button>
                                )}
                                {action === "repayment-detail" && (
                                    <Button type="button">Action</Button>
                                )}
                                {action === "payment-method" && (
                                    <Button type="button">Pilih Pembayaran</Button>
                                )}
                                {action === "none" && "~"}
                            </TableCell>
                            <TableCell>{repaymentStatus}</TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                )}
            </Table>
       </Card>
    );
}

