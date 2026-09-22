// Components
import { Button } from "@/components/ui/button";
import { ItemAutoTable } from "../_components/item-auto-table";
import { RequiredDot } from "@/components/ui/required-dot";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { DummyCMKProduct } from "@/app/(protected)/_data/data-cmkproduct";
import { calculatePGAutoAppraisal, calculatePGAutoMaxLoan } from "@/lib/math-formulas";

// Components - label & field input
import { FieldGroup, FieldSeparator, Field, FieldLabel, FieldContent } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadSection } from "../../_components/upload-section";
import { CurrencyInput } from "@/components/ui/currency-input";

// Icons
import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";

// React hook form
import { Controller, useFormContext } from "react-hook-form";

export function PGModalAuto() {
  // Mengambil data dari react hook form
  const { control, formState: { errors }, register, getValues, setValue, watch } = useFormContext();

  // State untuk loading, data auto table, dan base data
  const [isLoading, setIsLoading] = useState(false);
  const [autoTableData, setAutoTableData] = useState<any[]>([]);
  const [baseData, setBaseData] = useState<{ maxLoanRatio: number } | null>(null);
  const [fetchedPlu, setFetchedPlu] = useState<string>("");

  const currentPlu = watch("itemPlu");

  // Reset form jika PLU diubah setelah berhasil di-fetch
  useEffect(() => {
    if (fetchedPlu && currentPlu !== fetchedPlu) {
      setAutoTableData([]);
      setValue("itemName", "", { shouldValidate: true });
      setFetchedPlu(""); // Reset state
    }
  }, [currentPlu, fetchedPlu, setValue]);

  // Handle check plu
  const handleCheckPlu = async () => {
    const plu = getValues("itemPlu");
    if (!plu) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const pluInput = plu.toUpperCase();
      const mockData = DummyCMKProduct.find(
        (item) => item.item_category === "PG" && item.plu.toUpperCase() === pluInput
      );

      const result = {
        statusCode: mockData ? 200 : 404,
        data: mockData || null
      };

      if (result.statusCode === 200 && result.data) {
        const item = result.data;
        setFetchedPlu(plu);
        setValue("itemName", item.namaitem, { shouldValidate: true });
        setValue("itemWeight", item.beratnet.toString(), { shouldValidate: true });
        setValue("itemFineness", item.kadar.replace('K', ''), { shouldValidate: true });
        setValue("itemQty", "1", { shouldValidate: true });
        setValue("pricePerGram", item.acuan_resell_per_gram.toString(), { shouldValidate: true });

        // Perhitungan
        const appraisal = calculatePGAutoAppraisal(item.beratnet, 1, item.acuan_resell_per_gram);
        const maxLoanRatio = item.acuanresell ? (item.max_loan / item.acuanresell) : 0.95;

        setBaseData({ maxLoanRatio });
        setValue("appraisal", appraisal.toString(), { shouldValidate: true });
        setValue("maxLoan", item.max_loan.toString(), { shouldValidate: true });

        // Memasukan datastone ke tabel barang
        if (item.datastone && item.datastone !== "-") {
          const parts = item.datastone.split(" ");
          if (parts.length >= 5) {
            setAutoTableData([{
              kode: "stone-1",
              qty: parseInt(parts[0]) || 1,
              shape: parts[1] || "-",
              fineness: parts[2] || item.kadar,
              color: [parts[3] || "-"],
              clarity: parts[4] || "-",
              brand: "-",
              foto: "", jenis: "", namabarang: "", karat: "", berat: 0, catatan: "", nilai: 0, makspinjaman: 0
            }]);
          } else {
            setAutoTableData([{
              kode: "stone-1",
              qty: 1,
              shape: "-",
              fineness: item.kadar,
              color: ["-"],
              clarity: "-",
              brand: "-",
              foto: "", jenis: "", namabarang: "", karat: "", berat: 0, catatan: "", nilai: 0, makspinjaman: 0
            }]);
          }
        } else {
          setAutoTableData([]);
        }
      } else {
        toast.add({ title: "Gagal!", description: "PLU tidak ditemukan!", type: "error" });
      }
    } catch (error) {
      toast.add({ title: "Gagal!", description: "Terjadi kesalahan saat mengecek PLU.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Watch input fields untuk auto-calculation
  const watchWeight = watch("itemWeight");
  const watchQty = watch("itemQty");
  const watchPricePerGram = watch("pricePerGram");

  useEffect(() => {
    const weight = parseFloat(watchWeight || "0");
    const qty = parseFloat(watchQty || "1");
    const pricePerGram = parseFloat(watchPricePerGram || "0");

    const appraisal = calculatePGAutoAppraisal(weight, qty, pricePerGram);
    const maxLoan = calculatePGAutoMaxLoan(appraisal, baseData?.maxLoanRatio || 0.95);

    setValue("appraisal", appraisal.toString(), { shouldValidate: true });
    setValue("maxLoan", maxLoan.toString(), { shouldValidate: true });
  }, [watchWeight, watchQty, watchPricePerGram, baseData?.maxLoanRatio, setValue]);

  return (
    <>
      {/* Input item PLU & name */}
      <FieldGroup>
        <Field className="items-baseline">
          <FieldLabel htmlFor="itemPlu">PLU<RequiredDot /></FieldLabel>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex">
              <Input id="itemPlu" {...register("itemPlu")} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCheckPlu();
                }
              }}></Input>
              <Button type="button" onClick={handleCheckPlu} disabled={isLoading} className="bg-btn-primary-bg text-btn-primary-text justify-end">
                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Check />}
              </Button>
            </div>
            {errors.itemPlu && <p className="text-red-500 text-xs">{String(errors.itemPlu.message)}</p>}
          </div>
        </Field>
        <Field className="items-baseline">
          <FieldLabel htmlFor="itemName">Item Name</FieldLabel>
          <FieldContent>
            <Input id="itemName" {...register("itemName")}></Input>
            {errors.itemName && <p className="text-red-500 text-xs">{String(errors.itemName.message)}</p>}
          </FieldContent>
        </Field>
      </FieldGroup>

      <FieldSeparator className="my-2" />

      {/* Detail Item & Value */}
      <div className="md:flex gap-6">
        {/* Detail Item */}
        <FieldGroup>
          <Field className="items-baseline">
            <FieldLabel htmlFor="itemWeight">Weight<RequiredDot /></FieldLabel>
            <FieldContent>
              <Input
                id="itemWeight"
                placeholder="0"
                {...register("itemWeight")}
                onWheel={(e) => e.currentTarget.blur()}>
              </Input>
              {errors.itemWeight && <p className="text-red-500 text-xs">{String(errors.itemWeight.message)}</p>}
            </FieldContent>
          </Field>
          <Field className="items-baseline">
            <FieldLabel htmlFor="itemFineness">Fineness</FieldLabel>
            <FieldContent>
              <Input
                id="itemFineness"
                placeholder="0"
                disabled
                {...register("itemFineness")}
                onWheel={(e) => e.currentTarget.blur()}>
              </Input>
              {errors.itemFineness && <p className="text-red-500 text-xs">{String(errors.itemFineness.message)}</p>}
            </FieldContent>
          </Field>
          <Field className="items-baseline">
            <FieldLabel htmlFor="itemQty">Quantity</FieldLabel>
            <FieldContent>
              <Input
                id="itemQty"
                placeholder="1"
                disabled
                {...register("itemQty")}
                onWheel={(e) => e.currentTarget.blur()}>
              </Input>
              {errors.itemQty && <p className="text-red-500 text-xs">{String(errors.itemQty.message)}</p>}
            </FieldContent>
          </Field>
          <Field className="items-baseline">
            <FieldLabel htmlFor="pricePerGram">Price/Gram</FieldLabel>
            <FieldContent>
              <Controller control={control} name="pricePerGram" render={({ field }) => (
                <CurrencyInput
                  id="pricePerGram"
                  name="pricePerGram"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  placeholder="0"
                  disabled
                />
              )} />
              {errors.pricePerGram && <p className="text-red-500 text-xs">{String(errors.pricePerGram.message)}</p>}
            </FieldContent>
          </Field>

          <FieldSeparator className="p-0!" />

          {/* Value */}
          <Field className="items-baseline">
            <FieldLabel htmlFor="appraisal">Appraisal</FieldLabel>
            <FieldContent>
              <Controller control={control} name="appraisal" render={({ field }) => (
                <CurrencyInput
                  id="appraisal"
                  name="appraisal"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  placeholder="0"
                  disabled
                />
              )} />
              {errors.appraisal && <p className="text-red-500 text-xs">{String(errors.appraisal.message)}</p>}
            </FieldContent>
          </Field>
          <Field className="items-baseline">
            <FieldLabel htmlFor="maxLoan">Max Loan</FieldLabel>
            <FieldContent>
              <Controller control={control} name="maxLoan" render={({ field }) => (
                <CurrencyInput
                  id="maxLoan"
                  name="maxLoan"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  placeholder="0"
                  disabled
                />
              )} />
              {errors.maxLoan && <p className="text-red-500 text-xs">{String(errors.maxLoan.message)}</p>}
            </FieldContent>
          </Field>
          <Field className="items-baseline">
            <FieldLabel htmlFor="remark">Remark<RequiredDot /></FieldLabel>
            <FieldContent>
              <Textarea id="remark" placeholder="Remark" className="lg:min-h-25 min-h-20.5" {...register("remark")}></Textarea>
              {errors.remark && <p className="text-red-500 text-xs">{String(errors.remark.message)}</p>}
            </FieldContent>
          </Field>
        </FieldGroup>

        <FieldSeparator />

        {/* Product & Invoice Photo */}
        <UploadSection />
      </div>

      <FieldSeparator className="my-2" />

      {/* Tabel Informasi Produk*/}
      <div className="overflow-x max-w-[calc(95vw-16px)] w-full">
        <Card className="p-4 mt-6">
          <ItemAutoTable data={autoTableData} />
        </Card>
      </div>
    </>
  )
}