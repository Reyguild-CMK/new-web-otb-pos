// components
import { Combobox, ComboboxInput, ComboboxEmpty, ComboboxList, ComboboxItem, ComboboxContent } from "@/components/ui/combobox";

// components - label & field input
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, FieldSeparator, Field, FieldLabel } from "@/components/ui/field-application";
import { UploadSection } from "../../_components/upload-section";

// data dummy
import { manualConditionType, manualFineness } from "../_data/other-data";

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

          {/* Value */}
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

        <FieldSeparator />

        {/* Product & Invoice Photo */}
        <UploadSection/>
      </div>
    </>
  )
}