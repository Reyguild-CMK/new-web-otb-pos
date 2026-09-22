"use client"

import { Info, File } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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
    
    const latestHistory = documents?.data.pawnHistory.slice().sort((a, b) => b.extend_number - a.extend_number)[0];
    const existingFormApplication = latestHistory?.form_application ?? null;
        return(
            <Dialog open={open} onOpenChange={(isOpen) => {
                if (!isOpen){
                    onClose()
                }
            }}>
                <DialogContent className="max-h-[90vh] sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Document Form</DialogTitle>

                        <div className="flex items-center justify-items-start border-t pt-3 gap-2">
                            <div className="flex items-center gap-1">
                                <Info size={16} />
                                <h3>Informasi</h3>
                            </div>
                            <span>|</span>
                            <div className="flex items-center gap-1">
                                <File size={16}></File>
                                <button
                                    type="button"
                                    onClick={onDownloadDocument}
                                    className="text-xs text-blue-medium"
                                >
                                    Download Dokumen Perpanjangan
                                </button>
                            </div>
                                
                        </div>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto pr-2">
                        {status === "gadai_ulang" ? (
                            <UploadDocumentItem
                                title="Document"
                                required
                                existingFile={existingFormApplication}
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