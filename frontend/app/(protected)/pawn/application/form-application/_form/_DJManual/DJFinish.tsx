// Global
import { useState } from "react";

// Data
import { manualConditionType } from "../../_data/other-data";

// Component
import { RequiredDot } from "@/components/ui/required-dot";

// Components - label & field input
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field-application";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { UploadSection } from "../../../_components/upload-section";
import { Textarea } from "@/components/ui/textarea";

export function DJFinish() {
    const [invoiceVal, setInvoiceVal] = useState("");
    const [appraisal, setAppraisal] = useState("");
    const [maxLoan, setMaxLoan] = useState("");
    const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
        <div className="md:flex gap-6">
        <FieldGroup>
          <h2 className="pt-2">Loan</h2>
          <Field>
            <FieldLabel htmlFor="itemType">Condition</FieldLabel>
            <Combobox name="manualCondition" value={selectedCondition} onValueChange={setSelectedCondition} items={manualConditionType}>
              <ComboboxInput placeholder="Choose Condition" />
              <ComboboxContent>
                <ComboboxList>
                  {(item: any) => (
                    <ComboboxItem key={item.id} value={item.value}>
                      {item.value}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
        <Field>
            <FieldLabel htmlFor="invoiceVal">Invoice Value</FieldLabel>
            <CurrencyInput
              id="invoiceVal"
              name="invoiceVal"
              value={invoiceVal}
              onValueChange={setInvoiceVal}
              placeholder="0"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="appraisal">Appraisal</FieldLabel>
            <CurrencyInput
              id="appraisal"
              name="appraisal"
              value={appraisal}
              onValueChange={setAppraisal}
              placeholder="0"
            />
          </Field>

          <FieldSeparator/>

          {/* Value */}
          <Field>
            <FieldLabel htmlFor="maxLoan">Max Loan</FieldLabel>
            <CurrencyInput
              id="maxLoan"
              name="maxLoan"
              value={maxLoan}
              onValueChange={setMaxLoan}
              disabled
              placeholder="0"
            />
          </Field>
          <Field className="items-baseline">
            <FieldLabel htmlFor="remark">Remark<RequiredDot/></FieldLabel>
            <Textarea id="remark" name="remark" placeholder="Remark" className="lg:min-h-25 min-h-20.5" required></Textarea>
          </Field>
        </FieldGroup>

        {/* Product & Invoice Photo */}
        <FieldGroup>
          <h2 className="pt-2">Photos</h2>
          <UploadSection/>
        </FieldGroup>
        </div>
    </div>
  );
}
