import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PawnSummary } from "@/app/(protected)/_data/data-summary"; 
import { DropDownDueDate, statusOptions } from "./dropdown-due-date";
import { PawnStatusNotification } from "@/app/(protected)/_data/data-pawn";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileText } from "lucide-react";
import Link from "next/link";

interface dueDateListDataProps {
  data: PawnSummary[];
}


export function DueDateListsTable({data}: dueDateListDataProps){
    const [statusMap, setStatusMap] = useState<Record<string, PawnStatusNotification>>({})
    const handleStatusChange = (pawnId: string, status: PawnStatusNotification) => {
        setStatusMap((prev) => ({
            ...prev,
            [pawnId]: status,
        }))
    }

    const handleSaveStatus = async (pawnId: string) => { 
        const status = statusMap[pawnId]
        if (!status){
            return
        }
        console.log({
            pawnId: pawnId,
            status,
        })

        // lempar status_notification yang ke save lewat api
    }
    
    return(
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Loan</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>

        {/* Body table */}
        {!data ? (
        <TableBody>
            <TableRow>
            <TableCell className="text-center bg-muted" colSpan={7}>No Data</TableCell>
            </TableRow>
        </TableBody>
        ) : (
        <TableBody>
            {data?.map((pawn) => {
                const currentStatus = statusMap[pawn.id] ?? pawn.statusNotification ?? "tanpa_status";
                return (
                <TableRow key={pawn.id}>
                    <TableCell>
                        <Link href={"/pawn/list/detail"}>
                            <Button variant="ghost" size="icon">
                                <FileText size={8} />
                            </Button>
                        </Link>
                    </TableCell>
                    <TableCell>{pawn.storeId}</TableCell>
                    <TableCell>{pawn.customer.name}</TableCell>
                    <TableCell>{pawn.customer.handphone}</TableCell>
                    <TableCell>{pawn.nilaiPinjaman}</TableCell>
                    <TableCell>{pawn.jatuhTempo?.toLocaleDateString("id-ID")}</TableCell>
                    <TableCell className="flex justify-center gap-0.5">
                    <DropDownDueDate
                        value={currentStatus}
                        onChange={(value) => handleStatusChange(String(pawn.id), value)}
                    />
                    <Button onClick={() => handleSaveStatus(String(pawn.id))}>Save</Button>
                    </TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        )}
    </Table>
  )
}