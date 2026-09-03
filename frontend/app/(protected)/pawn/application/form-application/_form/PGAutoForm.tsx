// components
import { Button } from "@/components/ui/button";
import { ItemAutoTable } from "../_components/item-auto-table";

// components - label & field input
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, FieldSeparator, Field, FieldLabel } from "@/components/ui/field-application";
import { UploadSection } from "../../_components/upload-section";

// data
import { dataBarang } from "../_data/barang-data";

// icons
import { Calculator, Check } from "lucide-react";

export function PGModalAuto() {
  return (
    <>
      {/* Input item PLU & name */}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="itemPlu">PLU</FieldLabel>
          <div className="flex">
            <Input id="itemPlu" name="itemPlu" required></Input>
            <Button className="bg-btn-primary-bg text-btn-primary-text justify-end"><Check /></Button>
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="itemName">Item Name</FieldLabel>
          <Input id="itemName" name="itemName"></Input>
        </Field>
      </FieldGroup>

      <FieldSeparator className="my-2" />

      {/* Detail Item & Value */}
      <div className="md:flex gap-6">
        {/* Detail Item */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="itemWeight">Weight (*)</FieldLabel>
            <Input
              id="itemWeight"
              name="itemWeight"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="itemFineness">Fineness</FieldLabel>
            <Input
              id="itemFineness"
              name="itemFineness"
              type="number"
              placeholder="0"
              disabled
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="itemQty">Quantity</FieldLabel>
            <Input
              id="itemQty"
              name="itemQty"
              type="number"
              placeholder="1"
              disabled
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="pricePerGram">Price/Gram</FieldLabel>
            <Input
              id="pricePerGram"
              name="pricePerGram"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="calculate"></FieldLabel>
            <Button className="bg-btn-action-bg"><Calculator/>Calculate</Button>
          </Field>

        <FieldSeparator className="p-0!"/>

        {/* Value */}
          <Field>
            <FieldLabel htmlFor="appraisal">Appraisal</FieldLabel>
            <Input
              id="appraisal"
              name="appraisal"
              type="number"
              placeholder="0"
              disabled
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="maxLoan">Max Loan</FieldLabel>
            <Input
              id="maxLoan"
              name="maxLoan"
              type="number"
              placeholder="0"
              disabled
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="remark">Remark (*)</FieldLabel>
            <Textarea id="remark" name="remark" placeholder="Remark" className="lg:min-h-25 min-h-20.5" required></Textarea>
          </Field>
        </FieldGroup>

        <FieldSeparator />
        
        {/* Product & Invoice Photo */}
        <UploadSection/>
      </div>

      <FieldSeparator className="my-2" />

      {/* Tabel Informasi Produk*/}
      <div className="overflow-x max-w-[calc(95vw-16px)] w-full">
        <ItemAutoTable data={dataBarang} />
      </div>
    </>
  )
}