// Global
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

// Data
import { manualConditionType } from "../../_data/other-data";

// Component
import { RequiredDot } from "@/components/ui/required-dot";

// Components - label & field input
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldContent } from "@/components/ui/field-application";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { UploadSection } from "../../../_components/upload-section";
import { Textarea } from "@/components/ui/textarea";

export function DJFinish() {
  const { control, formState: { errors }, register, watch, setValue } = useFormContext();

  const appraisalValue = watch("appraisal");
  const manualConditionValue = watch("manualCondition");

  useEffect(() => {
    const numericAppraisal = Number(appraisalValue) || 0;
    if (numericAppraisal > 0 && manualConditionValue) {
      const conditionObj = manualConditionType.find(c => c.value === manualConditionValue);
      const percentage = conditionObj?.percentage || 90; // Default to 90 if not found for some reason
      const calculatedMaxLoan = Math.ceil(numericAppraisal * (percentage / 100));
      setValue("maxLoan", calculatedMaxLoan.toString());
    } else {
      setValue("maxLoan", "0");
    }
  }, [appraisalValue, manualConditionValue, setValue]);

  return (
    <div className="flex flex-col gap-4">
      <div className="md:flex gap-6">
        <FieldGroup>
          <h2 className="text-lg font-semibold pt-2">Loan</h2>
          <Field className="items-baseline">
            <FieldLabel htmlFor="manualCondition">Condition<RequiredDot /></FieldLabel>
            <FieldContent>
              <Controller control={control} name="manualCondition" render={({ field }) => (
                <Combobox name="manualCondition" value={field.value || ""} onValueChange={field.onChange} items={manualConditionType}>
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
              )} />
              {errors.manualCondition && <p className="text-red-500 text-xs">{String(errors.manualCondition.message)}</p>}
            </FieldContent>
          </Field>
          <Field className="items-baseline">
            <FieldLabel htmlFor="invoiceVal">Invoice Value<RequiredDot /></FieldLabel>
            <FieldContent>
              <Controller control={control} name="invoiceVal" render={({ field }) => (
                <CurrencyInput
                  id="invoiceVal"
                  name="invoiceVal"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  placeholder="0"
                />
              )} />
              {errors.invoiceVal && <p className="text-red-500 text-xs">{String(errors.invoiceVal.message)}</p>}
            </FieldContent>
          </Field>
          <Field className="items-baseline">
            <FieldLabel htmlFor="appraisal">Appraisal<RequiredDot /></FieldLabel>
            <FieldContent>
              <Controller control={control} name="appraisal" render={({ field }) => (
                <CurrencyInput
                  id="appraisal"
                  name="appraisal"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  placeholder="0"
                />
              )} />
              {errors.appraisal && <p className="text-red-500 text-xs">{String(errors.appraisal.message)}</p>}
            </FieldContent>
          </Field>

          <FieldSeparator />

          {/* Value */}
          <Field className="items-baseline">
            <FieldLabel htmlFor="maxLoan">Max Loan</FieldLabel>
            <FieldContent>
              <Controller control={control} name="maxLoan" render={({ field }) => (
                <CurrencyInput
                  id="maxLoan"
                  name="maxLoan"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  disabled
                  placeholder="0"
                  className="bg-gray-100 text-gray-500 font-semibold"
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

        {/* Product & Invoice Photo */}
        <FieldGroup>
          <h2 className="text-lg font-semibold pt-2">Photos</h2>
          <UploadSection />
        </FieldGroup>
      </div>
    </div>
  );
}
