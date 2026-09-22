import { z } from "zod";

export const createRepaymentSchema = (expectedAmount: number) =>
    z.object({
        nominal: z.coerce
            .number({ message: "Nominal wajib diisi" })
            .positive("Nominal harus lebih besar dari 0"),
        buktiTransaksi: z
            .instanceof(File, { message: "Bukti transaksi wajib diunggah" })
            .nullable()
            .refine((file) => file !== null, "Bukti transaksi wajib diunggah"),
    }).superRefine((values, context) => {
        if (values.nominal !== expectedAmount) {
            context.addIssue({
                code: "custom",
                path: ["nominal"],
                message: `Nominal harus sesuai ${expectedAmount.toLocaleString("id-ID")}`,
            });
        }
    });

export type RepaymentFormValues = {
    nominal: string;
    buktiTransaksi: File | null;
};
