"use client"

// Validation form
import { z } from "zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Global
import { useState } from "react";

// Components
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";

// Icon
import { Plus, AlertCircle } from "lucide-react";

// Data
import { item_type } from "@/app/(protected)/_data/item_type";
import { form_type } from "@/app/(protected)/_data/form_type";

// Lib
import { parseDecimal } from "@/lib/utils";

// Store
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";

// Components - label & field input
import { Field, FieldLabel, FieldSeparator, FieldContent } from "@/components/ui/field-application";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const store_brand = [
  {
    id: 1,
    name: "FRANK & CO",
  },
  {
    id: 2,
    name: "MONDIAL",
  },
  {
    id: 4,
    name: "THE PALACE",
  }
]



// =========== SKEMA VALIDASI (ZOD) ===========
// Form Utama
const baseSchema = z.object({
  itemType: z.string({ error: "Mohon pilih item type terlebih dahulu" }).min(1, { message: "Mohon pilih item type terlebih dahulu" }),
  brand: z.string({ error: "Mohon pilih brand terlebih dahulu" }).min(1, { message: "Mohon pilih brand terlebih dahulu" }),
  agreed: z.boolean().refine((value) => value === true, { message: "Anda belum menyetujui harga yang diajukan" }),
});

// DJ Auto
const djAutoSchema = z.object({
  itemPlu: z.string({ error: "Mohon isi PLU" }).min(1, { message: "Mohon isi PLU" }),
  itemName: z.string({ error: "Mohon isi nama item" }).optional(),
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
const pgAutoSchema = z.object({
  itemPlu: z.string({ error: "Mohon isi PLU" }).min(1, { message: "Mohon isi PLU" }),
  itemName: z.string({ error: "Mohon isi nama item" }).optional(),
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
const djManualSchema = z.object({
  manualGrossWeight: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi gross weight" })
    .refine((val) => val >= 0.001, { message: "Berat harus >= (lebih besar atau sama dengan) 0.001" })
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

// DJ Manual
const pgManualSchema = z.object({
  itemPlu: z.string({ error: "Mohon isi PLU" }).min(1, { message: "Mohon isi PLU" }),
  itemName: z.string({ error: "Mohon isi nama item" }).optional(),
  manualWeight: z.preprocess(parseDecimal, z.any()
    .refine((val) => typeof val === "number", { message: "Mohon isi weight" })
    .refine((val) => val >= 0.001, { message: "Berat harus >= (lebih besar atau sama dengan) 0.001" })
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
type FormAppValues = z.infer<typeof baseSchema> & Partial<z.infer<typeof djAutoSchema>> & Partial<z.infer<typeof pgAutoSchema>> & Partial<z.infer<typeof djManualSchema>> & Partial<z.infer<typeof pgManualSchema>>;

export function ModalLayout() {
  const form = useForm<FormAppValues>({
    resolver: (data, context, options) => {
      let currentSchema = baseSchema as any;

      // Deteksi form yang dipilih
      const selected = item_type.find(item => item.text === data.itemType);
      if (selected) {
        const isDJ = selected.type.includes("_dj");
        const isPG = selected.type.includes("_pg");
        const isAuto = !selected.type.includes("cmk_manual");

        // Merge schema berdasarkan jenis item dan mode input
        if (isDJ && isAuto) {
          currentSchema = baseSchema.extend(djAutoSchema.shape);
        } else if (isPG && isAuto) {
          currentSchema = baseSchema.extend(pgAutoSchema.shape);
        } else if (isDJ && !isAuto) {
          currentSchema = baseSchema.extend(djManualSchema.shape);
        } else if (isPG && !isAuto) {
          currentSchema = baseSchema.extend(pgManualSchema.shape);
        }
      }
      return zodResolver(currentSchema)(data, context, options);
    },
    defaultValues: {
      itemType: "",
      brand: "",
      agreed: false,
    },
  })

  // Global State
  const addPawnItem = usePawnStore((state) => state.addPawnItem);
  const pawnItems = usePawnStore((state) => state.pawnItems);

  // State
  const [open, setOpen] = useState(false);
  const [inputMode, setInputMode] = useState<"normal" | "manual">("normal");
  const selectedItemType = form.watch("itemType");

  // Filter item type
  const filteredItemType = item_type.filter((item) =>
    inputMode === "normal"
      ? !item.type.startsWith("cmk_manual")
      : item.type.startsWith("cmk_manual")
  );

  // Find selected item type
  const selectedItem = item_type.find(
    (item) => item.text === selectedItemType
  );

  // Find item category
  const itemCategory =
    selectedItem?.type.includes("_dj")
      ? "DJ"
      : selectedItem?.type.includes("_pg")
        ? "PG"
        : null;

  // Form component
  const FormComponent =
    itemCategory
      ? form_type[inputMode][itemCategory]
      : null;

  // On Submit
  const onSubmit = async (data: FormAppValues) => {
    try {
      // TODO: Backend - Ganti endpoint, ganti body dgn form data
      const response = await fetch('/api/pawn/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Mapping response
      const result = await response.json();

      if (response.ok) {
        // Deteksi jenis barang (DJ / PG)
        const isDJ = data.itemType.includes("Diamond");

        // Mock data
        // TODO: Backend -Hapus mock data
        const newItem: any = {
          id: Math.floor(Math.random() * 10000),
          pawn_id: 4,
          pawn_item_code: "MOCK-" + Math.floor(Math.random() * 10000),
          pawn_item_type_id: isDJ ? 9 : 8,
          item_name: data.itemName || "Item Baru",
          status: "stored",
          plu: data.itemPlu || "MOCK-PLU",
          weight: data.itemWeight || data.manualWeight || data.manualGrossWeight || 0,
          weight_current: data.itemWeight || 0,
          carat: data.itemFineness || 0,
          carat_current: data.itemFineness || 0,
          photo: data.productPhoto ? URL.createObjectURL(data.productPhoto as unknown as Blob) : "/image/jewelry.jpg",
          quantity: data.itemQty || 1,
          condition: data.condition || data.manualCondition || "Excellent",
          appraisal: data.appraisal || data.estimatedValue || data.manualAppraisal || 0,
          max_loan_price: data.maxLoan || 0,
          remark: data.remark || "",
          itemType: { id: isDJ ? 9 : 8, type: isDJ ? "dj" : "pg", text: data.itemType, status: 1 }
        };
        addPawnItem(newItem);
        toast.add({ title: "Sukses!", description: result.message + " Transaction ID: " + result.data.transactionId, type: "success" });
        form.reset();
        setOpen(false);
      } else {
        toast.add({ title: "Gagal!", description: "Error: " + result.message, type: "error" });
      }
    } catch (error) {
      toast.add({ title: "Gagal!", description: "An error occurred while submitting.", type: "error" });
    }
  };

  // Membatasi 1 item per application
  if (pawnItems.length >= 1) {
    return (
      <Button disabled className="bg-btn-primary-bg text-btn-primary-text flex">
        <Plus /><span className="text-xs">Add Item</span>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FormProvider {...form}>
        <DialogTrigger render={<Button className="bg-btn-primary-bg text-btn-primary-text flex" />}>
          <Plus /><span className="text-xs">Add Item</span>
        </DialogTrigger>

        {/* Isi Konten */}
        <DialogContent className="max-h-[85vh] overflow-y-auto fixed">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Form Item</DialogTitle>
            </DialogHeader>

            <Tabs
              value={inputMode}
              onValueChange={(value) => {
                // Ganti input mode
                setInputMode(value as "normal" | "manual");
                // Reset form
                form.setValue("itemType", "");
                form.clearErrors("itemType");
                form.clearErrors("brand");
                form.clearErrors("agreed");
              }}
            >
              <Field>
                <Label>Input Mode</Label>
                <TabsList>
                  <TabsTrigger value="normal">Normal</TabsTrigger>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>
              </Field>

              {/* Combobox Item Type */}
              <Field className="items-baseline">
                <FieldLabel>Item Type</FieldLabel>
                <Controller control={form.control} name="itemType" render={({ field, fieldState }) => (
                  <FieldContent>
                    <Combobox
                      items={filteredItemType}
                      value={field.value}
                      onValueChange={(val) => {
                        const currentBrand = form.getValues("brand");
                        form.reset({
                          itemType: val || "",
                          brand: currentBrand,
                          agreed: false,
                        });

                        if (val) {
                          form.trigger("itemType");
                        }
                      }}>
                      <ComboboxInput placeholder="Item Type" />
                      <ComboboxContent>
                        <ComboboxEmpty>
                          No items found.
                        </ComboboxEmpty>

                        <ComboboxList>
                          {(item: any) => (
                            <ComboboxItem key={item.id} value={item.text}>
                              {item.text}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                  </FieldContent>
                )} />
              </Field>

              {/* Combobox Brand */}
              <Field className="items-baseline">
                <FieldLabel>Brand</FieldLabel>
                <Controller control={form.control} name="brand" render={({ field, fieldState }) => (
                  <FieldContent>
                    <Combobox items={store_brand} value={field.value}
                      onValueChange={(val) => {
                        form.setValue("brand", val || "", { shouldValidate: !!val });
                        if (!val) {
                          form.clearErrors("brand");
                        }
                      }}>
                      <ComboboxInput placeholder="Select Brand" />
                      <ComboboxContent>
                        <ComboboxEmpty>
                          No brands found.
                        </ComboboxEmpty>

                        <ComboboxList>
                          {(item: any) => (
                            <ComboboxItem key={item.id} value={item.name}>
                              {item.name}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                  </FieldContent>
                )} />
              </Field>

              <FieldSeparator />

              {/* Menampilkan form sesuai pilihan */}
              {FormComponent && <FormComponent />}

            </Tabs>

            {/* Footer */}
            <DialogFooter className="flex-col justify-between sm:flex-row gap-4 items-center mt-6">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <Controller control={form.control} name="agreed" render={({ field }) => (
                    <>
                      <Checkbox
                        id="agreed-checkbox"
                        checked={field.value}
                        onCheckedChange={(val) => {
                          form.setValue("agreed", val, { shouldValidate: !!val });
                          if (!val) {
                            form.clearErrors("agreed");
                          }
                        }} />
                      <FieldLabel htmlFor="agreed-checkbox">Saya telah memastikan bahwa harga sudah sesuai!</FieldLabel>
                    </>
                  )}
                  />
                </div>
                {form.formState.errors.agreed && <p className="text-red-500 text-xs">{form.formState.errors.agreed.message}</p>}
              </div>
              <div className="flex flex-row gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger render={
                      <Button 
                        type="submit" 
                        disabled={form.formState.isSubmitting} 
                        className="bg-btn-primary-bg text-btn-primary-text"
                      >
                        {form.formState.isSubmitting ? "Adding..." : "Add"}
                      </Button>
                    } />
                    {/* Menampilkan tooltip jika ada form yang error */}
                    {Object.keys(form.formState.errors).length > 0 && (
                      <TooltipContent side="left">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          <p>Terdapat form yang belum lengkap/salah</p>
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
                <Button variant="outline" type="button" render={<DialogClose />}>Close</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  )
}