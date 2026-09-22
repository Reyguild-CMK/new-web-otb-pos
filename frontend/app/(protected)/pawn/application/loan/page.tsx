"use client"

// Validation form
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Textarea } from "@/components/ui/textarea";

// Components
import { TableDocument } from "../_components/table-document";

// Form
import { CardBank } from "./_components/card-bank";
import { CardDayLoan } from "./_components/card-loan";
import { CardDetailLoan } from "./_components/card-detail-loan";

import React from "react";
// Data
import { dataBank } from "../../../_data/data-bank";
import { tenor } from "../../../_data/data-tenor";
import { calculateRefinancingDueDate, calculateRefinancingFees } from "@/lib/math-formulas";
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";
import { dummyBankAccounts } from "@/app/(protected)/_data/data-bank-account";
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";

import { StepNavigation } from "@/components/shared/Stepper/StepNavigation";
import { useRouter } from "next/navigation";

import { loanSchema, FormValues } from "./_schema/loan-schema";

export default function FormLoanApplication() {
    const router = useRouter();

    const pawnItems = usePawnStore((state) => state.pawnItems);
    const loanDetails = usePawnStore((state) => state.loanDetails);
    const setLoanDetails = usePawnStore((state) => state.setLoanDetails);

    const totalMaximumLoan = pawnItems.reduce((acc, item) => acc + item.max_loan_price, 0);

    // =========== INISIALISASI FORM (REACT-HOOK-FORM) ===========
    const form = useForm<FormValues>({
        resolver: zodResolver(loanSchema) as any,
        defaultValues: {
            tenor: loanDetails?.tenor || tenor.find(t => t.tenor === 120)?.id || "",
            maksNilaiPinjaman: loanDetails?.maksNilaiPinjaman ?? totalMaximumLoan,
            nilaiPinjaman: loanDetails?.nilaiPinjaman || 0,
            setMaksimalPinjaman: loanDetails?.setMaksimalPinjaman || false,
            persentaseBiayaPerawatan: loanDetails?.persentaseBiayaPerawatan || undefined,
            tanggalTransaksi: loanDetails?.tanggalTransaksi || new Date().toISOString().split('T')[0],
            bankId: loanDetails?.bankId || "",
            cabang: loanDetails?.cabang || "",
            nomorRekening: loanDetails?.nomorRekening || "",
            namaPemilikRekening: loanDetails?.namaPemilikRekening || dummyBankAccounts.defaultName,
            tanggalJatuhTempo: loanDetails?.tanggalJatuhTempo || "",
            biayaAdmin: loanDetails?.biayaAdmin || undefined,
            biayaPerawatan: loanDetails?.biayaPerawatan || undefined,
            totalNilaiPinjaman: loanDetails?.totalNilaiPinjaman || undefined,
            calculatedNilaiPinjaman: loanDetails?.calculatedNilaiPinjaman || undefined,
            catatan: loanDetails?.catatan || "",
            isCalculated: loanDetails?.isCalculated || false,
            isRekeningChecked: loanDetails?.isRekeningChecked || false,
        }
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        await new Promise(r => setTimeout(r, 800));

        // Auto-Calculate Loan
        let finalData = { ...data };
        const selectedTenorId = typeof finalData.tenor === 'object' && finalData.tenor !== null ? (finalData.tenor as any).id : finalData.tenor;
        const selectedTenor = tenor.find((t) => String(t.id) === String(selectedTenorId));

        if (selectedTenor && finalData.tanggalTransaksi) {
            finalData.tanggalJatuhTempo = calculateRefinancingDueDate(finalData.tanggalTransaksi, selectedTenor.tenor);
            finalData.persentaseBiayaPerawatan = selectedTenor.rate || 0;

            const np = Number(finalData.nilaiPinjaman) || 0;
            const ba = Number(finalData.biayaAdmin) || 0;
            const { biayaPerawatan, nominalDitransfer } = calculateRefinancingFees(np, selectedTenor.rate || 0, ba);

            finalData.biayaPerawatan = biayaPerawatan;
            finalData.biayaAdmin = ba;
            finalData.totalNilaiPinjaman = nominalDitransfer;
            finalData.calculatedNilaiPinjaman = np;
            finalData.isCalculated = true;
        }

        // Auto-Check Rekening
        const foundAccount = dummyBankAccounts.accounts.find(a => a.number === finalData.nomorRekening);
        const nameToSet = foundAccount ? foundAccount.name : dummyBankAccounts.getRandomVerifiedName();
        finalData.namaPemilikRekening = nameToSet;
        finalData.isRekeningChecked = true;

        setLoanDetails(finalData);

        toast.add({
            title: "Success",
            description: "Transaksi berhasil dihitung dan disimpan",
            type: "success"
        });
        router.push("/pawn/application/customer_data");
    };

    const onError = () => {
        toast.add({
            title: "Gagal",
            description: "Mohon lengkapi kolom",
            type: "error"
        });
    };

    const handleBack = () => {
        const currentValues = form.getValues();
        setLoanDetails(currentValues);
        router.push("/pawn/application/form-application");
    };

    const activeTransactionId = usePawnStore((state) => state.activeTransactionId);
    const transactionList = usePawnStore((state) => state.transactionList);
    const activeTx = transactionList.find(t => t.id === activeTransactionId);
    const isLocked = activeTx?.status === "waiting_approval" || activeTx?.status === "ready_disburse" || activeTx?.status === "disbursed";

    return (
        <div className={`${style_card} w-full`}>
            <div className="md:flex justify-between align-middle">
                <h1 className="font-bold pb-2">Detail Pinjaman</h1>
            </div>
            <TableDocument data={pawnItems}></TableDocument>

            <FormProvider {...form}>
                <form className="grid grid-cols-1 items-start gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit, onError)}>
                    <fieldset disabled={isLocked} className="contents">
                        {/* Kolom Kiri */}
                        <div className="flex flex-col gap-4">
                            <CardDayLoan data={tenor} isSubmitting={isSubmitting} />
                            <CardBank data={dataBank} isSubmitting={isSubmitting} />
                        </div>

                        {/* Kolom Kanan */}
                        <div className="flex flex-col gap-4">
                            {/* Catatan */}
                            <div className="h-fit border border-grey/50 rounded-xl p-4">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="catatan">Catatan/ Keterangan</FieldLabel>
                                        <Textarea id="catatan" {...form.register("catatan")} />
                                    </Field>
                                </FieldGroup>
                            </div>

                            {/* Hasil Perhitungan Loan */}
                            <CardDetailLoan />
                        </div>
                    </fieldset>

                    <div className="col-span-full">
                        {isLocked ? (
                            <StepNavigation
                                currentStep={2}
                                totalSteps={5}
                                onBack={handleBack}
                                nextButtonType="button"
                                onNext={() => router.push("/pawn/application/customer_data")}
                            />
                        ) : (
                            <StepNavigation
                                currentStep={2}
                                totalSteps={5}
                                onBack={handleBack}
                                nextButtonType="submit"
                                isLoading={isSubmitting}
                            />
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
