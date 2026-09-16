" use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button" 
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface CashPaymentModalProps{
    open: boolean
    amountPayment: number
    paymentDate: string
    onClose: () => void
    onSubmit: (data: {
        amountPayment: number
        amountGiven: number
        paymentDate: string
    }) => void
}

export function CashPaymentModal({
    open, amountPayment, paymentDate, onClose, onSubmit,}: CashPaymentModalProps){
        const [amountGiven, setAmountGiven] = useState("")
        const given = Number(amountGiven) || 0
        const returned = given - amountPayment
        const isValidPayment = returned >= 0

        useEffect(() => {
            if (!open) {
                setAmountGiven("")
            }
        }, [open])

        const handleSubmit = () => {
            if (!isValidPayment) return

            onSubmit({
                amountPayment,
                amountGiven: given,
                paymentDate
            })
        }
        
        return(
            <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Cash Payment Method
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-medium">Amount Payment</Label>
                            <Input value={amountPayment.toLocaleString("id-ID")} readOnly></Input>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-medium">Amount Given</Label>
                            <Input type="number" value={amountGiven} onChange={(e) => setAmountGiven(e.target.value)} placeholder="Enter amount."></Input>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-medium">Amount Returned</Label>
                            <Input value={returned >= 0 ? returned.toLocaleString("id-ID") : "0" } readOnly></Input>
                        </div>
                        {!isValidPayment && amountGiven !== "" && (
                            <p className="text-xs text-destructive">
                                Dana yang dibayarkan kurang dari jumlah pembayaran.
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button disabled={!isValidPayment} onClick={handleSubmit}>Submit</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
}