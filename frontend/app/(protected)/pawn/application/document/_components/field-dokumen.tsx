// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";

interface FieldDokumenProps {
  data: any;
  pawnCode?: string;
}

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

export function FieldDokumen({ data, pawnCode }: FieldDokumenProps) {
  const txDate = data?.tanggalTransaksi ? new Date(data.tanggalTransaksi) : new Date();
  const yy = String(txDate.getFullYear()).slice(-2);
  const mm = String(txDate.getMonth() + 1).padStart(2, '0');
  const dd = String(txDate.getDate()).padStart(2, '0');
  const defaultAppNumber = `J2CE34${yy}${mm}${dd}0001`;
  const appNumber = data?.applicationNumber || defaultAppNumber;

  return (
    <FieldGroup className={`${style_card}`}>
      <Field>
        <FieldLabel>No Dokumen</FieldLabel>
        <Input value={appNumber} disabled />
      </Field>
      <Field>
        <FieldLabel>Tanggal Jatuh Tempo</FieldLabel>
        <Input
          value={data?.tanggalJatuhTempo || ""}
          disabled
          type="date"
        />
      </Field>
      <Field>
        <FieldLabel>Tanggal Penjualan</FieldLabel>
        <Input
          value={data?.tanggalTransaksi || ""}
          disabled
          type="date"
        />
      </Field>
      <Field>
        <FieldLabel>Nilai Pinjaman</FieldLabel>
        <CurrencyInput
          id="nilaiPinjaman"
          name="nilaiPinjaman"
          value={String(data?.nilaiPinjaman || 0)}
          onValueChange={() => { }}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Admin Fee</FieldLabel>
        <CurrencyInput
          id="adminFee"
          name="adminFee"
          value={String(data?.biayaAdmin || 0)}
          onValueChange={() => { }}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Biaya Perawatan</FieldLabel>
        <CurrencyInput
          id="biayaPerawatan"
          name="biayaPerawatan"
          value={String(data?.biayaPerawatan || 0)}
          onValueChange={() => { }}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Nominal Ditransfer</FieldLabel>
        <CurrencyInput
          id="nominalDitransfer"
          name="nominalDitransfer"
          value={String(data?.totalNilaiPinjaman || 0)}
          onValueChange={() => { }}
          disabled
        />
      </Field>
    </FieldGroup>
  )
}