
// Component
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Data
import { Pawn, pawnData } from "../../../_data/data-pawn";

// Icon
import { FileText } from "lucide-react";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";

// function dummy for last url
const getLastStepUrl = (status: string) => {
    switch (status) {
        case "open":
            return "/pawn/application/form-application"
        case "waiting_approval":
            return "/pawn/application/document"
        case "approved":
            return "/pawn/application/document"
        case "disbursed":
            return "/pawn/list/detail"
        default:
            return "/pawn/application/form-application"
    }
}

interface PawnTableProps {
    data: PawnSummary[];
}

export function PawnTable({ data }: PawnTableProps) {
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
                    <TableHead>Detail</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((list) =>(
                    <TableRow key={list.id}>
                        <TableCell>{list.id}</TableCell>
                        <TableCell>{list.type}</TableCell>
                        <TableCell>{list.applicationNumber}</TableCell>
                        <TableCell>{list.oldApplication}</TableCell>
                        <TableCell>{list.customer.name}</TableCell>
                        <TableCell>
                            {list.jatuhTempo instanceof Date && !isNaN(list.jatuhTempo.getTime())
                                ? list.jatuhTempo.toLocaleDateString("id-ID")
                                : list.jatuhTempo
                                  ? new Date(list.jatuhTempo).toLocaleDateString("id-ID")
                                  : "-"}
                        </TableCell>
                        <TableCell>{list.dibuatOleh}</TableCell>
                        <TableCell>{list.status}</TableCell>
                        <TableCell>
                            <Link href={getLastStepUrl(list.status)}>
                                <Button variant="ghost" size="icon">
                                    <FileText size={8} />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}