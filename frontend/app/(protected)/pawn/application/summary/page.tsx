"use client"

import { style_card } from "@/components/shared/Stepper/Stepper";
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Store
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";

// Components
import { Summary } from "./_components/summary";
import { TableDocument } from "../_components/table-document";
import { StepNavigation } from "@/components/shared/Stepper/StepNavigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { Key } from "lucide-react";

import { useEffect } from "react";

export default function SummaryPage() {
    const router = useRouter();

    const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
    const [pin, setPin] = useState("");

    const loanDetails = usePawnStore((state) => state.loanDetails);
    const pawnItems = usePawnStore((state) => state.pawnItems);
    const syncActiveTransaction = usePawnStore((state) => state.syncActiveTransaction);

    useEffect(() => {
        // When summary is reached, update status to done (if it was approved)
        syncActiveTransaction('done');
    }, [syncActiveTransaction]);

    const handleBack = () => {
        router.push("/pawn/application/document");
    };

    const handleTransferDana = () => {
        setIsPinDialogOpen(true);
    };

    const handleSubmitPin = () => {
        if (pin === "111111") {
            syncActiveTransaction('disbursed');
            toast.add({ title: "Berhasil", description: "Dana berhasil ditransfer.", type: "success" });
            setIsPinDialogOpen(false);
            router.push("/pawn/list");
        } else {
            toast.add({ title: "Gagal", description: "PIN salah, silakan coba lagi.", type: "error" });
        }
    };

    if (!loanDetails) {
        return <p>Data pinjaman tidak ditemukan.</p>
    }

    const summaryData = {
        ...loanDetails,
        pawnItems: pawnItems
    };

    return (
        <div className={`${style_card} w-full`}>
            {/* Judul */}
            <div className="md:flex justify-between align-middle">
                <h1 className="font-bold pb-2">Detail Pinjaman</h1>
            </div>

            {/* Table Barang */}
            <TableDocument data={pawnItems}></TableDocument>
            <Summary data={summaryData}></Summary>

            <StepNavigation
                currentStep={5}
                totalSteps={5}
                isLastStep
                nextLabel="Transfer Dana"
                onNext={handleTransferDana}
                onBack={handleBack}
            />

            {/* PIN Dialog */}
            <Dialog open={isPinDialogOpen} onOpenChange={setIsPinDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Key className="w-5 h-5" />
                            Input Your PIN
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-4">
                        <Input
                            type="password"
                            placeholder="Masukan 6 Digit PIN"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            maxLength={6}
                            className="w-full"
                        />
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={() => setIsPinDialogOpen(false)}>
                            Close
                        </Button>
                        <Button type="button" onClick={handleSubmitPin} className="bg-btn-primary-bg text-btn-primary-text">
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}