" use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RepaymentForm } from "../_form/repayment-form"
import { GadaiUlangRepaymentForm } from "../_form/gadai-ulang-form"
import { PawnStatusNotification } from "@/app/(protected)/_data/data-pawn"
import { PawnSummary } from "@/app/(protected)/_data/data-summary"
import { getRepawnFormType } from "../../_lib/repayment-action"
import { PaymentMethod } from "./payment-method-modal"
import type { RepaymentFormValues } from "../../_lib/repayment-schema"

export interface RepaymentSubmitData{
    nominal:number;
    buktiTransaksi: File | null;
}

interface RepawnModalProps{
    open: boolean
    pawn: PawnSummary | null
    status: PawnStatusNotification
    paymentMethod: PaymentMethod | null
    onClose: () => void
    onSubmit: (data: RepaymentSubmitData) => void;
}

export function RepawnModal({
    open, pawn, status, onClose, onSubmit}: RepawnModalProps){
        if (!pawn) return null

        const formType = getRepawnFormType(status)
        const formId = "repayment-form"
        const handleFormSubmit = (values: RepaymentFormValues) => {
            onSubmit({
                nominal: Number(values.nominal),
                buktiTransaksi: values.buktiTransaksi,
            })
        }
        return(
            <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Detail Transaksi
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        {formType === "repayment" && (
                            <RepaymentForm data={pawn} formId={formId} onSubmit={handleFormSubmit} />
                        )}
                        {formType === "gadai-ulang" && (
                            <GadaiUlangRepaymentForm data={pawn} formId={formId} onSubmit={handleFormSubmit} />
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" form={formId}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
}