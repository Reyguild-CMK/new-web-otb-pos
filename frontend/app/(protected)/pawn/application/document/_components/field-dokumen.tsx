// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";

// Styling
import { style_card } from "@/components/shared/Stepper/Stepper";

export function FieldDokumen(){
  return(
    <FieldGroup className={`${style_card}`}>
      <Field>
        <FieldLabel>No Dokumen</FieldLabel>
        <Input disabled/>
      </Field>
      <Field>
        <FieldLabel>Tanggal Jatuh Tempo</FieldLabel>
        <Input disabled type="date"/>
      </Field>
      <Field>
        <FieldLabel>Tanggal Penjualan</FieldLabel>
        <Input disabled type="date"/>
      </Field>
      <Field>
        <FieldLabel>Nilai Pinjaman</FieldLabel>
        <Input disabled/>
      </Field>
      <Field>
        <FieldLabel>Admin Fee</FieldLabel>
        <Input disabled/>
      </Field>
      <Field>
        <FieldLabel>Biaya Perawatan</FieldLabel>
        <Input disabled type="text"/>
      </Field>
      <Field>
        <FieldLabel>Nominal Ditransfer</FieldLabel>
        <Input disabled/>
      </Field>
    </FieldGroup>
  )
}