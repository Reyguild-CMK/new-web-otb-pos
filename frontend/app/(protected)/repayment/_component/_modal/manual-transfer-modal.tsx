" use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button" 
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ManualTransferPaymentModalProps{
    open: boolean
    onSubmit: (data: {
        amountGiven: number
        transferProof: File
    }) => void
    onClose: () => void
}

export function ManualTransferModal({
    open, onClose, onSubmit,}: ManualTransferPaymentModalProps){
        const [amounGiven, setAmountGiven] = useState("")
        const [transferProof, setTransferProof] = useState<File | null>(null)

        useEffect(() =>{
            if (!open) {
                setAmountGiven("")
                setTransferProof(null)
            }
        }, [open])

        const handleSubmit = () => {
            if (!amounGiven || !transferProof){
                return
            }
            onSubmit({
                amountGiven: Number(amounGiven),
                transferProof
            })
        }

        const isValid = Boolean(amounGiven && transferProof)

        return(
            <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Manual Transfer Payment Method
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-medium">
                                Amount Given
                            </Label>
                            <Input type="number" value={amounGiven} onChange={(e) => setAmountGiven(e.target.value)} placeholder="Enter Amount"></Input>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-medium">
                                Bukti Transfer
                            </Label>
                            <Input type="file" accept="image/*" onChange={(e) => setTransferProof(e.target.files?.[0] ?? null)}>
                            </Input>
                        </div>

                        {transferProof && (
                            <p className="text-xs text-muted-foreground">
                                File: {transferProof.name}
                            </p>
                        )}

                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button disabled={!isValid} onClick={handleSubmit}>Submit</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
}