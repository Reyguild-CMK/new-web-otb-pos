" use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RepaymentForm } from "../_form/repayment-form"
import { GadaiUlangRepaymentForm } from "../_form/gadai-ulang-form"
import { PawnStatusNotification } from "@/app/(protected)/_data/data-pawn"
import { PawnSummary } from "@/app/(protected)/_data/data-summary"
import { getRepawnFormType } from "../../_lib/repayment-action"
import { PaymentMethod } from "./payment-method-modal"
import { useState } from "react"

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
        const [transferNominal, setTransferNominal] = useState("")
        const [transferProof, setTransferProof] = useState<File | null>(null);

        if (!pawn) return null

        const formType = getRepawnFormType(status)
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
                            <RepaymentForm data={pawn}
                                transferNominal={transferNominal}
                                onTransferNominalChange={setTransferNominal}
                                onTransferProofChange={setTransferProof}
                                />
                        )}
                        {formType === "gadai-ulang" && (
                            <GadaiUlangRepaymentForm data={pawn}
                                transferNominal={transferNominal}
                                onTransferNominalChange={setTransferNominal}
                                onTransferProofChange={setTransferProof}/>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="button" onClick={()=>{onSubmit({
                            nominal: Number(transferNominal),
                            buktiTransaksi: transferProof,
                            });
                        }}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
}