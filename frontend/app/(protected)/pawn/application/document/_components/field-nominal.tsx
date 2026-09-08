// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";

// Styling
import { style_card } from "@/components/shared/Stepper/Stepper";

// Interface untuk pawn summary
interface FieldNominalProps{
  data: PawnSummary;
}

export function FieldNominal({data}: FieldNominalProps){
  return(
    <FieldGroup className={`${style_card}`}>
      <Field>
        <FieldLabel>Tenor</FieldLabel>
        <Input  value={data.tenor} disabled/>
      </Field>
      <Field>
        <FieldLabel>Persentase Biaya Perawatan (%)</FieldLabel>
        <Input value={data.persentaseBiayaPerawatan} disabled/>
      </Field>
      <Field>
        <FieldLabel>Metode Pencairan</FieldLabel>
        <Input value={data.metodePencairan} disabled/>
      </Field>
      <Field>
        <FieldLabel>Bank</FieldLabel>
        <Input value={data.bankName} disabled/>
      </Field>
      <Field>
        <FieldLabel>No Rekening</FieldLabel>
        <Input value={data.nomorRekening} disabled/>
      </Field>
      <Field>
        <FieldLabel>Nama Pemilik Rekening</FieldLabel>
        <Input value={data.namaPemilikRekening} disabled type="text"/>
      </Field>
      <Field>
        <FieldLabel>Tanggal Transaksi</FieldLabel>
        <Input value={data.tanggalTransaksi.toISOString().split("T")[0]} disabled type="date"/>
      </Field>
      <Field>
        <FieldLabel>Catatan / Keterangan</FieldLabel>
        <Textarea disabled/>
      </Field>
    </FieldGroup>
  )
}