// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Styling
import { style_card } from "@/components/shared/Stepper/Stepper";

export function FieldNominal(){
  return(
    <FieldGroup className={`${style_card}`}>
      <Field>
        <FieldLabel>Tenor</FieldLabel>
        <Input disabled/>
      </Field>
      <Field>
        <FieldLabel>Persentase Biaya Perawatan</FieldLabel>
        <Input disabled/>
      </Field>
      <Field>
        <FieldLabel>Metode Pencairan</FieldLabel>
        <Input disabled/>
      </Field>
      <Field>
        <FieldLabel>Bank</FieldLabel>
        <Input disabled/>
      </Field>
      <Field>
        <FieldLabel>No Rekening</FieldLabel>
        <Input disabled/>
      </Field>
      <Field>
        <FieldLabel>Nama Pemilik Rekening</FieldLabel>
        <Input disabled type="text"/>
      </Field>
      <Field>
        <FieldLabel>Tanggal Transaksi</FieldLabel>
        <Input disabled type="date"/>
      </Field>
      <Field>
        <FieldLabel>Catatan / Keterangan</FieldLabel>
        <Textarea disabled/>
      </Field>
    </FieldGroup>
  )
}