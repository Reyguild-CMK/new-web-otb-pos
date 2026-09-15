// Components
import { Button } from "@/components/ui/button";
import { ItemAutoTable } from "../_components/item-auto-table";
import { RequiredDot } from "@/components/ui/required-dot";

// Components - label & field input
import { FieldGroup, FieldSeparator, Field, FieldLabel, FieldContent } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadSection } from "../../_components/upload-section";
import { CurrencyInput } from "@/components/ui/currency-input";

// Data dummy
import { dataBarang } from "../../../../_data/barang-data";

// Icons
import { Calculator, Check } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

export function PGModalAuto() {
  const { control, formState: { errors }, register } = useFormContext();

  return (
    <>
      {/* Input item PLU & name */}
      <FieldGroup>
        <Field className="items-baseline">
          <FieldLabel htmlFor="itemPlu">PLU<RequiredDot /></FieldLabel>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex">
              <Input id="itemPlu" {...register("itemPlu")}></Input>
              <Button type="button" className="bg-btn-primary-bg text-btn-primary-text justify-end"><Check /></Button>
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
          <Field>
            <FieldLabel htmlFor="calculate"></FieldLabel>
            <Button type="button" className="bg-btn-action-bg"><Calculator />Calculate</Button>
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
        <ItemAutoTable data={dataBarang} />
      </div>
    </>
  )
}