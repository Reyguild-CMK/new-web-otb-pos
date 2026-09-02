// components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Combobox, ComboboxInput, ComboboxEmpty, ComboboxList, ComboboxItem, ComboboxContent } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

// components - label & field input
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, FieldSeparator, Field, FieldLabel } from "@/components/ui/field-application";
import InputImage from "@/components/shared/InputImage/InputImage";

// data dummy
import { manualConditionType, manualFineness } from "../_data/other-data";
import { BarangTable } from "../_components/barang-table";

// icons
import { Check } from "lucide-react";
import { ItemAutoTable } from "../_components/item-auto-table";



export function DJModalManual() {
  return (
    <>
      {/* Input item PLU & name */}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="itemPlu">PLU Code</FieldLabel>
          <Input id="itemPlu" name="itemPlu" required></Input>
        </Field>
        <Field>
          <FieldLabel htmlFor="itemName">Item Name</FieldLabel>
          <Input id="itemName" name="itemName"></Input>
        </Field>
      </FieldGroup>

      <FieldSeparator className="my-2" />

      {/* Isi lainnya */}
      <div className="md:flex gap-6">
        {/* Item Detail */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="itemWeight">Weight</FieldLabel>
            <Input
              id="itemWeight"
              name="itemWeight"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="itemFineness">Fineness (%)</FieldLabel>
            <Combobox items={manualFineness} defaultValue={manualFineness[0]}>
              <ComboboxInput placeholder="Choose Fineness">
                <ComboboxContent>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </ComboboxInput>
            </Combobox>
          </Field>
          <Field>
            <FieldLabel htmlFor="invoiceVal">Invoice Value</FieldLabel>
            <Input
              id="invoiceVal"
              name="invoiceVal"
              type="number"
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="appraisal">Appraisal</FieldLabel>
            <Input
              id="appraisal"
              name="appraisal"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="itemType">Condition</FieldLabel>
            <Combobox items={manualConditionType}>
              <ComboboxInput placeholder="Choose Condition">
                <ComboboxContent>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item.id} value={item.value}>
                        {item.value}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </ComboboxInput>
            </Combobox>
          </Field>
          <FieldSeparator/>
          <Field>
            <FieldLabel htmlFor="maxLoan">Max Loan</FieldLabel>
            <Input
              id="maxLoan"
              name="maxLoan"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}
              disabled>
            </Input>
          </Field>
          <Field>
            <FieldLabel htmlFor="remark">Remark (*)</FieldLabel>
            <Textarea id="remark" name="remark" placeholder="Remark" className="lg:min-h-25 min-h-20.5" required></Textarea>
          </Field>
        </FieldGroup>

        {/* Product & Invoice Photo */}
        <FieldSeparator />
        <FieldGroup>
          <InputImage
            id="productPhoto"
            name="productPhoto"
            label="Product Photo"
            imageSrc="/image/image_placeholder.png"
            imageAlt="Product Thumbnail"
          />
          <InputImage
            id="invoicePhoto"
            name="invoicePhoto"
            label="Invoice Photo"
            imageSrc="/image/image_placeholder.png"
            imageAlt="Invoice Photo"
          />
        </FieldGroup>
      </div>
    </>
  )
}