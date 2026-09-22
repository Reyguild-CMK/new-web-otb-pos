import { z } from "zod";
import { dataBank } from "@/app/(protected)/_data/data-bank";

export const loanSchema = z.object({
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

    isCalculated: z.boolean().optional(),
    isRekeningChecked: z.boolean().optional(),
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

export type FormValues = z.infer<typeof loanSchema>;
