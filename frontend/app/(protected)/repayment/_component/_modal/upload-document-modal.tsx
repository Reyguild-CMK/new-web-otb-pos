"use client"

import { File } from "lucide-react"
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
    onDownloadDocument: () => void
    onUpload: (
        type: UploadDocumentType,
        file: File
    ) => void
}

export function UploadDocsModal({
    open, status, documents, onClose, onDownloadDocument, onUpload}: UploadDocsModalProps){
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
                        <DialogTitle>Document Form</DialogTitle>

                        <div className="flex items-center justify-between border-t pt-3">
                            <div className="flex items-center gap-2">
                                <File size={16} />
                                <h5>Informasi</h5>
                            </div>

                            <button
                                type="button"
                                onClick={onDownloadDocument}
                                className="text-sm text-primary underline underline-offset-4"
                            >
                                Download Dokumen Perpanjangan
                            </button>
                        </div>
                    </DialogHeader>
                    <div className="space-y-6">
                        {status === "gadai_ulang" ? (
                            <UploadDocumentItem
                                title="Document"
                                required
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