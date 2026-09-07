// Components - Input & Label
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";

// Styling
import { style_card } from "@/components/shared/Stepper/Stepper";

export function FieldDokumen(){
  return(
    <FieldGroup className={`${style_card}`}>
      <Field>
        <FieldLabel>No Dokumen</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Tanggal Jatuh Tempo</FieldLabel>
        <Input 
          placeholder=""
          type="date"
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Tanggal Penjualan</FieldLabel>
        <Input 
          placeholder=""
          type="date"
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Nilai Pinjaman</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Admin Fee</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Biaya Perawatan</FieldLabel>
        <Input 
          placeholder=""
          type="text"
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Nominal Ditransfer</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
    </FieldGroup>
  )
}