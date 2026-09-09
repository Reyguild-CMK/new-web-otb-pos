// Components - label & field input
import FileInput from "@/components/shared/FileInput/FileInput";
import { FieldGroup } from "@/components/ui/field-application";

export function UploadSection() {
    return (
      <FieldGroup>
          <FileInput
            id="productPhoto"
            name="productPhoto"
            label="Product Photo"
            imageAlt="Product Thumbnail"
          />
          <FileInput
            id="invoicePhoto"
            name="invoicePhoto"
            label="Invoice Photo"
            imageAlt="Invoice Photo"
          />
        </FieldGroup>
    )
}