// Components - label & field input
import FileInput from "@/components/shared/FileInput/FileInput";
import { FieldGroup } from "@/components/ui/field-application";
import { useFormContext } from "react-hook-form";

export function UploadSection() {
  const { setValue, clearErrors, formState: { errors } } = useFormContext();

  const handleFile = (name: string, file: File | null) => {
    setValue(name, file, { shouldValidate: !!file });
    if (file) clearErrors(name);
  }

  return (
    <FieldGroup>
      <FileInput
        id="productPhoto"
        name="productPhoto"
        label="Product Photo"
        imageAlt="Product Thumbnail"
        onFileChange={(f) => handleFile("productPhoto", f)}
        error={errors.productPhoto?.message as string}
      />
      <FileInput
        id="invoicePhoto"
        name="invoicePhoto"
        label="Invoice Photo"
        imageAlt="Invoice Photo"
        onFileChange={(f) => handleFile("invoicePhoto", f)}
        error={errors.invoicePhoto?.message as string}
      />
    </FieldGroup>
  )
}