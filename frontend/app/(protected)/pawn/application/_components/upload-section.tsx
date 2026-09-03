import InputImage from "@/components/shared/InputImage/InputImage";
import { FieldGroup } from "@/components/ui/field-application";

export function UploadSection() {
    return (
      <FieldGroup>
          <InputImage
            id="productPhoto"
            name="productPhoto"
            label="Product Photo"
            imageAlt="Product Thumbnail"
          />
          <InputImage
            id="invoicePhoto"
            name="invoicePhoto"
            label="Invoice Photo"
            imageAlt="Invoice Photo"
          />
        </FieldGroup>
    )
}