// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Data
import { dataBank } from "@/app/(protected)/_data/data-bank";

import { tenor } from "@/app/(protected)/_data/data-tenor";

interface FieldNominalProps {
  data: any;
}

export function FieldNominal({ data }: FieldNominalProps) {
  const bankName = dataBank.find(b => String(b.id) === data?.bankId)?.name || "-";
  const tenorValue = tenor.find(t => String(t.id) === String(data?.tenor))?.tenor || data?.tenor || 0;

  return (
    <FieldGroup className={`${style_card}`}>
      <Field>
        <FieldLabel>Tenor</FieldLabel>
        <Input value={`${tenorValue} Days`} disabled />
      </Field>
      <Field>
        <FieldLabel>Persentase Biaya Perawatan (%)</FieldLabel>
        <Input value={`${(Number(data?.persentaseBiayaPerawatan) || 0).toFixed(2)}%`} disabled />
      </Field>
      <Field>
        <FieldLabel>Metode Pencairan</FieldLabel>
        <Input value={data?.bankId ? "Transfer" : "-"} disabled />
      </Field>
      <Field>
        <FieldLabel>Bank</FieldLabel>
        <Input value={bankName} disabled />
      </Field>
      <Field>
        <FieldLabel>No Rekening</FieldLabel>
        <Input value={data?.nomorRekening || "-"} disabled />
      </Field>
      <Field>
        <FieldLabel>Nama Pemilik Rekening</FieldLabel>
        <Input value={data?.namaPemilikRekening || "-"} disabled type="text" />
      </Field>
      <Field>
        <FieldLabel>Tanggal Transaksi</FieldLabel>
        <Input value={data?.tanggalTransaksi || ""} disabled type="date" />
      </Field>
      <Field>
        <FieldLabel>Catatan / Keterangan</FieldLabel>
        <Textarea disabled value={data?.catatan || ""} />
      </Field>
    </FieldGroup>
  )
}