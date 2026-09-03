// components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Combobox, ComboboxInput, ComboboxEmpty, ComboboxList, ComboboxItem, ComboboxContent } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { ItemAutoTable } from "../_components/item-auto-table";

// components - label & field input
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, FieldSeparator, Field, FieldLabel } from "@/components/ui/field-application";
import { UploadSection } from "../../_components/upload-section";

// data dummy
import { conditionType } from "../_data/other-data";
import { dataBarang } from "../_data/barang-data";

// icons
import { Check } from "lucide-react";

export function DJModalAuto() {
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
            <FieldLabel htmlFor="condition">Condition</FieldLabel>
            <Combobox items={conditionType}>
              <ComboboxInput placeholder="Choose Condition">
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

          {/* Card Resell Value */}
          <Card className="relative p-4">
            <CardContent>
              <div>
                <Field orientation="responsive" className="grid-cols-[3fr]!">
                  <FieldLabel htmlFor="resellValue" className="wrap-break-word md:w-24">Resell Value/ASP (*)</FieldLabel>
                  <Input
                    id="resellValue"
                    name="resellValue"
                    type="number"
                    placeholder="0"
                    onWheel={(e) => e.currentTarget.blur()}
                    className="flex-1" required>
                  </Input>
                  <div className="flex gap-2">
                    <Checkbox id="toggle-checkbox" name="toggle-checkbox" />
                    <FieldLabel htmlFor="toggle-checkbox">Free tax area</FieldLabel>
                  </div>
                </Field>
                <p className="text-red-medium md:text-right mt-1">*Value must be less than or equal to 80</p>
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
            <Input
              id="estimatedValue"
              name="estimatedValue"
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