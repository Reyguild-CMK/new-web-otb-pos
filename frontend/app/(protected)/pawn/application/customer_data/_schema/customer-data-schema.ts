import { z } from "zod";

export const customerDataSchema = z.object({
    name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
    birthDate: z.string().min(1, { message: "Tanggal Lahir tidak boleh kosong" }),
    address: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
    handphone: z.string().min(1, { message: "Nomor Handphone tidak boleh kosong" }),
    email: z.string().min(1, { message: "Email tidak boleh kosong" }).email({ message: "Format email tidak valid" }),
    occupation: z.string().optional(),
    ktpNumber: z.string().min(1, { message: "No KTP tidak boleh kosong" }),
});