"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { PawnHistory } from "@/app/(protected)/_data/data-pawn-history"
import { PawnStatusNotification } from "@/app/(protected)/_data/data-pawn"
import { PawnSummary } from "@/app/(protected)/_data/data-summary"
import UploadDocumentItem from "@/components/shared/UploadDocument/UploadDocumentItem"

export type UploadDocumentType =
    | "bukti_transaksi"
    | "nota_pembayaran"
    | "nota_tanda_terima"
    | "form_application" // ini diambilnya dari pawn_history

interface UploadDocumentFiles{
    data: PawnSummary
}

interface UploadDocsModalProps{
    open: boolean
    status: PawnStatusNotification | null
    documents?: UploadDocumentFiles | null
    onClose: () => void
    onUpload: (
        type: UploadDocumentType,
        file: File
    ) => void
}

export function UploadDocsModal({
    open, status, documents, onClose, onUpload}: UploadDocsModalProps){
        const pendingHistory = documents?.data.pawnHistory
            .filter((history) => history.status === "not_complete")
            .sort((a, b) => b.extend_number - a.extend_number)[0];

        const latestFormApplication =
            pendingHistory?.form_application ?? null;
        return(
            <Dialog open={open} onOpenChange={(isOpen) => {
                if (!isOpen){
                    onClose()
                }
            }}>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>
                            Document Form
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        {status === "gadai_ulang" ? (
                            <UploadDocumentItem
                                title="Form Gadai Ulang"
                                required
                                existingFile={latestFormApplication}
                                onUpload={(file) => onUpload("form_application", file)}>
                            </UploadDocumentItem>
                        ) : null}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }