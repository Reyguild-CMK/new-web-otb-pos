import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { style_card } from "@/components/shared/Stepper/Stepper";
import { Textarea } from "@/components/ui/textarea";

export function FieldNominal(){
  return(
    <FieldGroup className={`${style_card}`}>
      <Field>
        <FieldLabel>Tenor</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Persentase Biaya Perawatan</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Metode Pencairan</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Bank</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>No Rekening</FieldLabel>
        <Input 
          placeholder=""
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Nama Pemilik Rekening</FieldLabel>
        <Input 
          placeholder=""
          type="text"
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Tanggal Transaksi</FieldLabel>
        <Input 
          placeholder=""
          type="date"
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Catatan / Keterangan</FieldLabel>
        <Textarea 
          placeholder=""
          disabled
        />
      </Field>
    </FieldGroup>
  )
}