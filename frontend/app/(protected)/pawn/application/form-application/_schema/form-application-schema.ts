import { z } from "zod";
import { parseDecimal } from "@/lib/utils";

// Form Utama
export const baseSchema = z.object({
  itemType: z.string({ error: "Mohon pilih item type terlebih dahulu" }).min(1, { message: "Mohon pilih item type terlebih dahulu" }),
  brand: z.string({ error: "Mohon pilih brand terlebih dahulu" }).min(1, { message: "Mohon pilih brand terlebih dahulu" }),
  agreed: z.boolean().refine((value) => value === true, { message: "Anda belum menyetujui harga yang diajukan" }),
});

// DJ Auto
export const djAutoSchema = z.object({
  itemPlu: z.string({ error: "Mohon isi PLU" }).min(1, { message: "Mohon isi PLU" }),
  itemName: z.string({ error: "Mohon isi nama item" }).min(1, { message: "Mohon isi nama item" }),
  itemWeight: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi berat item" })
    .refine((val) => val >= 0.001, { message: "Value must be greater than or equal to 0.001" })
  ),
  itemFineness: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  itemQty: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  condition: z.string().min(1, { message: "Mohon pilih kondisi item" }).default("Excellent"),
  resellValue: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi resell value" })
    .refine((val) => val <= 80, { message: "Value must be less than or equal to 80" })
    .refine((val) => val >= 0, { message: "Value must be at least 0" })
  ),
  isFreeTaxArea: z.boolean().optional(),
  estimatedValue: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  maxLoan: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  remark: z.string({ error: "Mohon isi remark" }).min(1, { message: "Mohon isi remark" }),
  productPhoto: z.any().refine((val) => val, { message: "Product photo wajib diisi" }),
  invoicePhoto: z.any().refine((val) => val, { message: "Invoice photo wajib diisi" }),
});

// PG Auto
export const pgAutoSchema = z.object({
  itemPlu: z.string({ error: "Mohon isi PLU" }).min(1, { message: "Mohon isi PLU" }),
  itemName: z.string({ error: "Mohon isi nama item" }).min(1, { message: "Mohon isi nama item" }),
  itemWeight: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi berat item" })
    .refine((val) => val >= 0.001, { message: "Value must be greater than or equal to 0.001" })
  ),
  itemFineness: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  itemQty: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  pricePerGram: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  appraisal: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  maxLoan: z.preprocess(parseDecimal, z.any()
    .refine((val) => val === undefined || typeof val === "number", { message: "Harus berupa angka" })
  ),
  remark: z.string({ error: "Mohon isi remark" }).min(1, { message: "Mohon isi remark" }),
  productPhoto: z.any().refine((val) => val, { message: "Product photo wajib diisi" }),
  invoicePhoto: z.any().refine((val) => val, { message: "Invoice photo wajib diisi" }),
});

// DJ Manual
export const djManualSchema = z.object({
  manualPlu: z.string({ error: "Mohon isi PLU" }).min(1, { message: "Mohon isi PLU" }),
  manualProductItem: z.string({ error: "Mohon pilih product item" }).min(1, { message: "Mohon pilih product item" }),
  manualProductCategory: z.string({ error: "Mohon pilih product category" }).min(1, { message: "Mohon pilih product category" }),
  manualProductLevel: z.string({ error: "Mohon pilih product level" }).min(1, { message: "Mohon pilih product level" }),
  manualStoneDist: z.string({ error: "Mohon pilih stone distribution" }).min(1, { message: "Mohon pilih stone distribution" }),
  manualFrameMaterial: z.string({ error: "Mohon pilih frame material" }).min(1, { message: "Mohon pilih frame material" }),
  manualFrameFinishing: z.string({ error: "Mohon pilih frame finishing" }).min(1, { message: "Mohon pilih frame finishing" }),
  manualFrameColor: z.string({ error: "Mohon pilih frame color" }).min(1, { message: "Mohon pilih frame color" }),
  manualConstructionProcess: z.string({ error: "Mohon pilih construction process" }).min(1, { message: "Mohon pilih construction process" }),
  manualProcessFinishing: z.array(z.string()).optional(),
  manualAddedStones: z.array(z.any()).min(1, { message: "Mohon tambahkan minimal 1 batu ke dalam tabel" }),
  manualGrossWeight: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi gross weight" })
    .refine((val) => val >= 0.001, { message: "Berat harus lebih besar atau sama dengan 0.001" })
  ),
  manualCondition: z.string({ error: "Mohon pilih kondisi item" }).min(1, { message: "Mohon pilih kondisi item" }),
  invoiceVal: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi invoice value" })
  ),
  appraisal: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi appraisal" })
  ),
  remark: z.string({ error: "Mohon isi remark" }).min(1, { message: "Mohon isi remark" }),
  productPhoto: z.any().refine((val) => val, { message: "Product photo wajib diisi" }),
  invoicePhoto: z.any().refine((val) => val, { message: "Invoice photo wajib diisi" }),
});

// PG Manual
export const pgManualSchema = z.object({
  itemPlu: z.string({ error: "Mohon isi PLU" }).min(1, { message: "Mohon isi PLU" }),
  itemName: z.string({ error: "Mohon isi nama item" }).min(1, { message: "Mohon isi nama item" }),
  manualProductLevel: z.string({ error: "Mohon pilih product level" }).min(1, { message: "Mohon pilih product level" }),
  manualProductItem: z.string({ error: "Mohon pilih product item" }).min(1, { message: "Mohon pilih product item" }),
  manualTargetAge: z.string({ error: "Mohon pilih target age" }).min(1, { message: "Mohon pilih target age" }),
  manualGoldModel: z.string({ error: "Mohon pilih gold model" }).min(1, { message: "Mohon pilih gold model" }),
  manualFrameColor: z.string({ error: "Mohon pilih frame color" }).min(1, { message: "Mohon pilih frame color" }),
  manualNoCertificate: z.string().optional(),
  manualFineness: z.string({ error: "Mohon pilih fineness/carat" }).min(1, { message: "Mohon pilih fineness/carat" }),
  manualWeight: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi weight" })
    .refine((val) => val >= 0.001, { message: "Berat harus >= 0.001" })
  ),
  manualCondition: z.string({ error: "Mohon pilih kondisi item" }).min(1, { message: "Mohon pilih kondisi item" }),
  manualinvoiceVal: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi invoice value" })
  ),
  manualAppraisal: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi appraisal" })
  ),
  remark: z.string({ error: "Mohon isi remark" }).min(1, { message: "Mohon isi remark" }),
  productPhoto: z.any().refine((val) => val, { message: "Product photo wajib diisi" }),
  invoicePhoto: z.any().refine((val) => val, { message: "Invoice photo wajib diisi" }),
});

// Type untuk form
export type FormAppValues = z.infer<typeof baseSchema> & Partial<z.infer<typeof djAutoSchema>> & Partial<z.infer<typeof pgAutoSchema>> & Partial<z.infer<typeof djManualSchema>> & Partial<z.infer<typeof pgManualSchema>>;
