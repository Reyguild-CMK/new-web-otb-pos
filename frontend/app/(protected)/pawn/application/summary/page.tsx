"use client"

import { style_card } from "@/components/shared/Stepper/Stepper";
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";
import { useState, useEffect } from "react";
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
import { Spinner } from "@/components/ui/spinner";

export default function SummaryPage() {
    const router = useRouter();

    const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
    const [pin, setPin] = useState("");

    const [simulatedStatus, setSimulatedStatus] = useState<"processing" | "ready">("ready");
    const [storeBalance, setStoreBalance] = useState<number | null>(null);
    const [isFetchingBalance, setIsFetchingBalance] = useState(true);
    const [isRetrying, setIsRetrying] = useState(false);

    const loanDetails = usePawnStore((state) => state.loanDetails);
    const pawnItems = usePawnStore((state) => state.pawnItems);
    const syncActiveTransaction = usePawnStore((state) => state.syncActiveTransaction);

    useEffect(() => {
        const fetchBalance = async () => {
            setIsFetchingBalance(true);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulasi loading 1.5 detik
            setStoreBalance(15000000); // Simulasi dapat balance 15jt
            setIsFetchingBalance(false);
        };
        fetchBalance();
    }, []);

    const handleRetry = async () => {
        setIsRetrying(true);
        toast.add({ title: "Mencoba...", description: "Menghubungi server Iris...", type: "info" });
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsRetrying(false);
        setSimulatedStatus("ready");
        toast.add({ title: "Berhasil", description: "Pencairan berhasil di-retry, status siap ditransfer.", type: "success" });
    };

    const handleBack = () => {
        router.push("/pawn/application/document");
    };

    const handleTransferDana = () => {
        setIsPinDialogOpen(true);
    };

    const handleSubmitPin = () => {
        if (pin === "111111") {
            const pinjaman = loanDetails?.nilaiPinjaman || 0;
            if (pinjaman > 20000000) {
                syncActiveTransaction('ready_disburse');
                toast.add({ title: "Berhasil", description: "Pengajuan Anda berhasil terkirim kepada finance !", type: "success" });
            } else {
                syncActiveTransaction('disbursed');
                toast.add({ title: "Berhasil", description: "Pengajuan Anda berhasil, Dana telah ditransfer !", type: "success" });
            }
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

    const nominalDitransfer = summaryData.totalNilaiPinjaman || summaryData.nominalDitransfer || 0;
    const isBalanceInsufficient = storeBalance !== null && nominalDitransfer > storeBalance;

    return (
        <div className={`${style_card} w-full`}>
            {/* Judul */}
            <div className="md:flex justify-between align-middle pb-2">
                <h1 className="font-bold">Detail Pinjaman</h1>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSimulatedStatus(prev => prev === "processing" ? "ready" : "processing")}
                >
                    Simulate Status: {simulatedStatus}
                </Button>
            </div>

            {/* Table Barang */}
            <TableDocument data={pawnItems}></TableDocument>
            <Summary data={summaryData}></Summary>

            {/* Alerts */}
            <div className="mt-4 flex flex-col gap-2">
                {isFetchingBalance ? (
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
                        <span className="animate-pulse flex"><Spinner />Mengecek saldo Iris cabang...</span>
                    </div>
                ) : isBalanceInsufficient ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                        Pencairan Dana Terkendala! Saldo cabang (Iris) tidak mencukupi (Sisa: Rp{storeBalance?.toLocaleString('id-ID')}). Harap hubungi Finance J2C!
                    </div>
                ) : null}

                {simulatedStatus === "processing" && (
                    <div className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-3 rounded-lg text-sm font-medium text-center">
                        <b>Pencairan sedang diproses.</b> Jika terlalu lama, klik tombol di bawah untuk cek dan retry.
                    </div>
                )}
            </div>

            {simulatedStatus === "processing" ? (
                <div className="mt-4 flex justify-end">
                    <Button
                        className="bg-red-600 text-white hover:bg-red-700 w-full md:w-auto"
                        onClick={handleRetry}
                        disabled={isRetrying}
                    >
                        {isRetrying ? "Mencoba ulang..." : "Retry Pencairan"}
                    </Button>
                </div>
            ) : (
                <StepNavigation
                    currentStep={5}
                    totalSteps={5}
                    isLastStep
                    nextLabel="Transfer Dana"
                    onNext={handleTransferDana}
                    onBack={handleBack}
                    nextDisabled={isFetchingBalance || isBalanceInsufficient}
                />
            )}

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