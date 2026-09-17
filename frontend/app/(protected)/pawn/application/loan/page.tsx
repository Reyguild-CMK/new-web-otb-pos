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

// =========== SKEMA VALIDASI (ZOD) ===========
const loanSchema = z.object({
    // Card Day Loan
    tenor: z.string({ error: "Pilih tenor pinjaman" }).min(1, { message: "Pilih tenor pinjaman" }),
    maksNilaiPinjaman: z.coerce.number().optional(),
    nilaiPinjaman: z.coerce.number().min(1, { message: "Nilai pinjaman wajib diisi (minimal 1)" }),
    setMaksimalPinjaman: z.boolean().default(false),
    persentaseBiayaPerawatan: z.coerce.number().min(0, { message: "Persentase biaya perawatan tidak boleh kurang dari 0" }).optional(),
    tanggalTransaksi: z.string({ error: "Tanggal transaksi wajib diisi" })
        .min(1, { message: "Tanggal transaksi wajib diisi" })
        .refine((val) => {
            const today = new Date().toISOString().split('T')[0];
            return val <= today;
        }, { message: "Tanggal transaksi tidak boleh melebihi hari ini" }),

    // Card Bank
    bankId: z.string({ error: "Bank tujuan harus dipilih" }).min(1, { message: "Bank tujuan harus dipilih" }),
    cabang: z.string().optional(),
    nomorRekening: z.string({ error: "Nomor rekening wajib diisi" })
        .regex(/^[0-9]+$/)
        .min(10, { message: "Minimal 10 digit" })
        .max(16, { message: "Maksimal 16 digit" }),
    namaPemilikRekening: z.string().optional(),

    // Card Detail Loan (Calculated Fields)
    tanggalJatuhTempo: z.string().optional(),
    biayaAdmin: z.coerce.number().optional(),
    biayaPerawatan: z.coerce.number().optional(),
    totalNilaiPinjaman: z.coerce.number().optional(),
    calculatedNilaiPinjaman: z.coerce.number().optional(),

    // Catatan
    catatan: z.string().optional(),
}).superRefine((data, ctx) => {
    // Validasi nilai pinjaman
    if (data.maksNilaiPinjaman !== undefined && data.nilaiPinjaman > data.maksNilaiPinjaman) {
        ctx.addIssue({
            code: "custom",
            message: `Nilai pinjaman tidak boleh melebihi maksimal pinjaman`,
            path: ["nilaiPinjaman"]
        });
    }

    // Validasi rekening
    if (data.bankId) {
        const selectedBank = dataBank.find(b => String(b.id) === data.bankId);
        if (selectedBank) {
            // Cek jika e-wallet
            const isEWallet = ["gopay", "ovo", "dana", "linkaja", "shopeepay"].some(ew => selectedBank.name.toLowerCase().includes(ew));
            if (isEWallet) {
                if (!data.nomorRekening.startsWith("08") && !data.nomorRekening.startsWith("628")) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Wajib diawali dengan 08 atau 628",
                        path: ["nomorRekening"]
                    });
                }
            }
        }
    }
});

type FormValues = z.infer<typeof loanSchema>;

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
        }
    });

    const onSubmit = async (data: FormValues) => {
        // Construct Payload for dummy API
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
            description: "Transaksi berhasil disimpan dengan status Waiting Approval",
            type: "success"
        });
        router.push("/pawn/application/customer_data");
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
                <form className="grid grid-cols-1 items-start gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>

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
