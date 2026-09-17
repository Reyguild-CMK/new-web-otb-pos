// Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemAutoTable } from "../_components/item-auto-table";
import { RequiredDot } from "@/components/ui/required-dot";
import { toast } from "@/components/ui/toast";
import { DummyCMKProduct } from "@/app/(protected)/_data/data-cmkproduct";
import { calculateDJAutoEstimatedValue, calculateDJAutoMaxLoan } from "@/lib/math-formulas";

// Components - label & field input
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, FieldSeparator, Field, FieldLabel, FieldContent } from "@/components/ui/field-application";
import { UploadSection } from "../../_components/upload-section";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Combobox, ComboboxInput, ComboboxList, ComboboxItem, ComboboxContent } from "@/components/ui/combobox";

// Data dummy
import { conditionType } from "../_data/other-data";

// Icons
import { useState, useEffect } from "react";
import { Calculator, Check, Loader2 } from "lucide-react";

// React hook form
import { Controller, useFormContext } from "react-hook-form";

export function DJModalAuto() {
  const { control, formState: { errors }, register, getValues, setValue, watch } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [autoTableData, setAutoTableData] = useState<any[]>([]);
  const [baseData, setBaseData] = useState<{ netSales: number; ppnPembagi: number; originalWeight: number } | null>(null);
  const [fetchedPlu, setFetchedPlu] = useState<string>("");

  // Watch current PLU
  const currentPlu = watch("itemPlu");

  // Reset form jika PLU diubah setelah berhasil di-fetch
  useEffect(() => {
    if (fetchedPlu && currentPlu !== fetchedPlu) {
      setAutoTableData([]);
      setValue("itemName", "", { shouldValidate: true });
      setFetchedPlu(""); // Reset state
    }
  }, [currentPlu, fetchedPlu, setValue]);

  const resellValue = watch("resellValue");
  const isFreeTaxArea = watch("isFreeTaxArea");
  const watchWeight = watch("itemWeight");

  useEffect(() => {
    if (baseData) {
      const rvPercent = parseFloat(resellValue) || 0;
      const currentWeight = parseFloat(watchWeight) || 0;

      const estFinal = calculateDJAutoEstimatedValue(
        baseData.netSales,
        baseData.ppnPembagi,
        baseData.originalWeight,
        currentWeight,
        rvPercent,
        isFreeTaxArea
      );

      setValue("estimatedValue", estFinal.toString(), { shouldValidate: true });
      setValue("maxLoan", calculateDJAutoMaxLoan(estFinal).toString(), { shouldValidate: true });
    }
  }, [baseData, resellValue, isFreeTaxArea, watchWeight, setValue]);

  const handleCheckPlu = async () => {
    const plu = getValues("itemPlu");
    if (!plu) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const pluInput = plu.toUpperCase();
      const mockData = DummyCMKProduct.find(
        (item) => item.item_category === "DJ" && item.plu.toUpperCase() === pluInput
      );

      const result = {
        statusCode: mockData ? 200 : 404,
        data: mockData || null
      };

      if (result.statusCode === 200 && result.data) {
        const item = result.data;
        setFetchedPlu(plu); // Simpan PLU yang berhasil diverifikasi
        setValue("itemName", item.namaitem, { shouldValidate: true });
        setValue("itemWeight", item.beratnet.toString(), { shouldValidate: true });
        setValue("itemFineness", item.kadar.replace('K', ''), { shouldValidate: true });
        setValue("itemQty", "1", { shouldValidate: true });

        // Untuk perhitungan estimasi nilai
        setBaseData({ netSales: item.netsales, ppnPembagi: item.PPNPembagi, originalWeight: item.beratnet });

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
        setValue("resellValue", "65", { shouldValidate: true });
      } else {
        toast.add({ title: "Gagal!", description: "PLU tidak ditemukan!", type: "error" });
      }
    } catch (error) {
      toast.add({ title: "Gagal!", description: "Terjadi kesalahan saat mengecek PLU.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Input item PLU & name */}
      <FieldGroup>
        <Field className="items-baseline">
          <FieldLabel htmlFor="itemPlu">PLU<RequiredDot /></FieldLabel>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex">
              <Input id="itemPlu" {...register("itemPlu")}></Input>
              <Button type="button" onClick={handleCheckPlu} disabled={isLoading} className="bg-btn-primary-bg text-btn-primary-text justify-end">
                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Check />}
              </Button>
            </div>
            {errors.itemPlu && <p className="text-red-500 text-xs">{String(errors.itemPlu.message)}</p>}
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="itemName">Item Name</FieldLabel>
          <FieldContent>
            <Input id="itemName" {...register("itemName")}></Input>
            {errors.itemName && <p className="text-red-500 text-xs mt-1">{String(errors.itemName.message)}</p>}
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
          <Field>
            <FieldLabel htmlFor="itemFineness">Fineness</FieldLabel>
            <Input
              id="itemFineness"
              placeholder="0"
              disabled
              {...register("itemFineness")}
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="itemQty">Quantity</FieldLabel>
            <Input
              id="itemQty"
              placeholder="1"
              disabled
              {...register("itemQty")}
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="condition">Condition</FieldLabel>
            <FieldContent>
              <Controller
                control={control}
                name="condition"
                render={({ field }) => (
                  <Combobox value={field.value || "Excellent"} onValueChange={(val) => field.onChange(val || "Excellent")} items={conditionType}>
                    <ComboboxInput placeholder="Choose Condition" />
                    <ComboboxContent>
                      <ComboboxList>
                        {(item: any) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )}
              />
              {errors.condition && <p className="text-red-500 text-xs">{String(errors.condition.message)}</p>}
            </FieldContent>
          </Field>

          {/* Card Resell Value */}
          <Card className="relative p-4">
            <CardContent>
              <div>
                <Field orientation="vertical" className="">
                  <div className="flex gap-2 justify-between">
                    <FieldLabel htmlFor="resellValue" className="">Resell Value/ASP<RequiredDot /></FieldLabel>
                    <div className="flex gap-2">
                      <Controller control={control} name="isFreeTaxArea" render={({ field }) => (
                        <Checkbox id="toggle-checkbox" checked={field.value || false} onCheckedChange={field.onChange} />
                      )} />
                      <FieldLabel htmlFor="toggle-checkbox">Free tax area</FieldLabel>
                    </div>
                  </div>
                  <Input
                    type="number"
                    id="resellValue"
                    placeholder="0"
                    {...register("resellValue")}
                    onWheel={(e) => e.currentTarget.blur()}
                    className="flex-1">
                  </Input>
                  {errors.resellValue && <p className="text-red-500 text-xs">{String(errors.resellValue.message)}</p>}

                </Field>
              </div>
              <CardFooter className="py-4">
                <div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl/none">&bull;</span>
                    <p>Silahkan diisi dan pastikan asp/resell value sesuai dengan ketentuan asp/resell yang berlaku</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl/none">&bull;</span>
                    <p>Free tax area dicentang hanya untuk barang non ppn yang berlaku di daerah Batam</p>
                  </div>
                </div>
              </CardFooter>
            </CardContent>
          </Card>

          {/* Value */}
          <Field>
            <FieldLabel htmlFor="estimatedValue">Estimated Value</FieldLabel>
            <Controller
              control={control}
              name="estimatedValue"
              render={({ field }) => (
                <CurrencyInput
                  id="estimatedValue"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  disabled
                  placeholder="0"
                />
              )}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="maxLoan">Max Loan</FieldLabel>
            <Controller
              control={control}
              name="maxLoan"
              render={({ field }) => (
                <CurrencyInput
                  id="maxLoan"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  disabled
                  placeholder="0"
                />
              )}
            />
          </Field>
          <Field className="items-baseline">
            <div className="flex">
              <FieldLabel htmlFor="remark">Remark<RequiredDot /></FieldLabel>
            </div>
            <FieldContent>
              <Textarea id="remark" placeholder="Remark" className="lg:min-h-20 min-h-10" {...register("remark")}></Textarea>
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