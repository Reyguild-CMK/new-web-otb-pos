"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PawnSummary } from "@/app/(protected)/_data/data-summary"
import DocumentPreview from "@/components/shared/DocumentPreview/DocumentPreview"

interface ViewDoc{
    data: PawnSummary
}

interface ViewDocModalProps{
    open: boolean
    documents?: ViewDoc | null
    formApplication?: File | null
    onClose: () => void
}

export function ViewDocsModal({
    open, documents, formApplication, onClose,}: ViewDocModalProps){
        const [uploadedFormUrl, setUploadedFormUrl] = useState<string | null>(null)

        useEffect(() => {
            if (!formApplication) {
                setUploadedFormUrl(null)
                return
            }

            const url = URL.createObjectURL(formApplication)
            setUploadedFormUrl(url)

            return () => URL.revokeObjectURL(url)
        }, [formApplication])

        if (!documents) return null

        const latestHistory = documents.data.pawnHistory.reduce(
            (latest, history) =>
                !latest || history.extend_number > latest.extend_number
                    ? history
                    : latest,
            undefined as (typeof documents.data.pawnHistory)[number] | undefined
        )
        const formApplicationUrl =
            uploadedFormUrl ?? latestHistory?.form_application ?? null

        return(
            <Dialog open={open} onOpenChange={(open) => {if (!open) onClose()}}>
                <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Uploaded Documents</DialogTitle>
                    </DialogHeader>
                    <div className="grid max-h-[75vh] grid-cols-1 gap-4 overflow-y-auto pr-2 md:grid-cols-3">
                        {documents.data.pawnDocs?.bukti_transaksi && (
                            <DocumentPreview
                                title="Bukti Transaksi"
                                src = {documents.data.pawnDocs.bukti_transaksi}>
                            </DocumentPreview>
                        )}
                        {documents.data.pawnDocs?.nota_pembayaran && (
                            <DocumentPreview
                                title="Nota Pembayaran"
                                src={documents.data.pawnDocs.nota_pembayaran}>
                            </DocumentPreview>
                        )}
                        {documents.data.pawnDocs?.nota_tanda_terima && (
                            <DocumentPreview
                                title="Nota Tanda Terima"
                                src={documents.data.pawnDocs.nota_tanda_terima }>
                            </DocumentPreview>
                        )}
                        {formApplicationUrl && (
                            <DocumentPreview
                                title="Form Gadai Ulang"
                                src={formApplicationUrl}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        )
    }