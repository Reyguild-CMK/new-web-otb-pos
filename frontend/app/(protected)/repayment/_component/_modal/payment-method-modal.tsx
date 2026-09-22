"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"

export type PaymentMethod =
    | "bca"
    | "bni"
    | "bri"
    | "mandiri"
    | "permata"
    | "cash"
    | "manual-transfer"

interface PaymentMethodModalProps {
    open: boolean
    paymentDate: string
    onPaymentDateChange: (date: string) => void
    onClose: () => void
    onSelectMethod: (
        method: PaymentMethod) => void
}

// Kalau status nya akan lunas atau gadai ulang bakalan direct ke modal ini

export function PaymentMethodModal({ open, paymentDate, onPaymentDateChange, onClose, onSelectMethod, }: PaymentMethodModalProps){
    const today = new Date().toISOString().split("T")[0]
    const isPaymentDateToday = paymentDate === today
   
    return(
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Pilih Jenis dan tanggal Pembayaran
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="mx-auto max-w-xs">
                        <Input
                            type="date"
                            value={paymentDate}
                            onChange={(e) => onPaymentDateChange(e.target.value)}></Input>
                    </div>
                    <hr/>

                    <div className="flex flex-col items-center gap-2">
                        <Button className="bg-blue-medium" disabled={!isPaymentDateToday} onClick={() => onSelectMethod("bca")}>Transfer Virtual Account BCA</Button>
                        <Button className="bg-blue-medium" disabled={!isPaymentDateToday} onClick={() => onSelectMethod("bni")}>Transfer Virtual Account BNI</Button>
                        <Button className="bg-blue-medium" disabled={!isPaymentDateToday} onClick={() => onSelectMethod("bri")}>Transfer Virtual Account BRI</Button>
                        <Button className="bg-blue-medium" disabled={!isPaymentDateToday} onClick={() => onSelectMethod("mandiri")}>Transfer Virtual Account Mandiri</Button>
                        <Button className="bg-blue-medium" disabled={!isPaymentDateToday} onClick={() => onSelectMethod("permata")}>Transfer Virtual Account Permata atau Bank Lain</Button>
                    </div>
                    <div className="flex justify-center gap-2">
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}