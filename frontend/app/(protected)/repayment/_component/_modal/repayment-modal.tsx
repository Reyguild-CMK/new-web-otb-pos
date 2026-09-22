" use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button" 

interface RePaymentModalProps{
    open: boolean
    pawnId: string | null

    onClose: () => void
    onSubmit: () => void
}

export function CashPaymentModal({
    open, pawnId, onClose, onSubmit,}: RePaymentModalProps){
        return(
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Cash Payment Method
                        </DialogTitle>
                    </DialogHeader>
                    <div className="text-center">

                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button onClick={onSubmit}>Submit</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
}