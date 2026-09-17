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

// Data
import { dataBank } from "../../../_data/data-bank";
import { tenor } from "../../../_data/data-tenor";
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
        defaultValues: loanDetails || {
            tenor: tenor.find(t => t.tenor === 120)?.id || "",
            maksNilaiPinjaman: totalMaximumLoan,
            nilaiPinjaman: 0,
            setMaksimalPinjaman: false,
            persentaseBiayaPerawatan: undefined,
            tanggalTransaksi: new Date().toISOString().split('T')[0],
            bankId: "",
            cabang: "",
            nomorRekening: "",
            namaPemilikRekening: dummyBankAccounts.defaultName,
            tanggalJatuhTempo: "",
            biayaAdmin: undefined,
            biayaPerawatan: undefined,
            totalNilaiPinjaman: undefined,
            calculatedNilaiPinjaman: undefined,
            catatan: "",
            isCalculated: false,
            isRekeningChecked: false,
        }
    });

    const onSubmit = async (data: FormValues) => {
        const payload = {
            loan_details: data,
            items: pawnItems,
            total_appraisal: pawnItems.reduce((acc, item) => acc + item.appraisal, 0),
            total_max_loan: totalMaximumLoan
        };

        console.log("POST /api/dummy/loan/process_ajax payload:", payload);

        setLoanDetails(data);
        await new Promise(r => setTimeout(r, 600));

        toast.add({
            title: "Success",
            description: "Transaksi berhasil disimpan",
            type: "success"
        });
        router.push("/pawn/application/customer_data");
    };

    const onError = () => {
        toast.add({
            title: "Gagal",
            description: "Mohon lengkapi atau perbaiki kolom yang berwarna merah",
            type: "error"
        });
    };

    const handleBack = () => {
        const currentValues = form.getValues();
        setLoanDetails(currentValues);
        router.push("/pawn/application/form-application");
    };

    return (
        <div className={`${style_card} w-full`}>
            <div className="md:flex justify-between align-middle">
                <h1 className="font-bold pb-2">Detail Pinjaman</h1>
            </div>
            <TableDocument data={pawnItems}></TableDocument>

            <FormProvider {...form}>
                <form className="grid grid-cols-1 items-start gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit, onError)}>

                    {/* Kolom Kiri */}
                    <div className="flex flex-col gap-4">
                        <CardDayLoan data={tenor} />
                        <CardBank data={dataBank} />
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

                    <div className="col-span-1 md:col-span-2">
                        <StepNavigation
                            currentStep={2}
                            totalSteps={5}
                            onBack={handleBack}
                            nextButtonType="submit"
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
