// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";

// Interface data
import { PawnSummary } from "@/app/(protected)/_data/data-summary";

interface FieldDokumenProps{
  data: PawnSummary;
}

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

export function FieldDokumen({ data }: FieldDokumenProps){  
  return(
    <FieldGroup className={`${style_card}`}>
      <Field>
        <FieldLabel>No Dokumen</FieldLabel>
        <Input value={data.applicationNumber} disabled/>
      </Field>
      <Field>
        <FieldLabel>Tanggal Jatuh Tempo</FieldLabel>
        <Input value={data.jatuhTempo instanceof Date
              ? data.jatuhTempo.toISOString().slice(0, 10)
              : data.jatuhTempo
          }
        disabled type="date"/>
      </Field>
      <Field>
        <FieldLabel>Tanggal Penjualan</FieldLabel>
        <Input
          value={data.jatuhTempo instanceof Date
              ? data.jatuhTempo.toISOString().slice(0, 10)
              : data.jatuhTempo
          }
          disabled
          type="date"
        />
      </Field>
      <Field>
        <FieldLabel>Nilai Pinjaman</FieldLabel>
        <CurrencyInput
          id="nilaiPinjaman"
          name="nilaiPinjaman"
          value={String(data.nilaiPinjaman)}
          onValueChange={()=> {}}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Admin Fee</FieldLabel>
        <CurrencyInput
          id="adminFee"
          name="adminFee"
          value="0"
          onValueChange={()=>{}}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Biaya Perawatan</FieldLabel>
        <CurrencyInput
          id="biayaPerawatan"
          name="biayaPerawatan"
          value={String(data.biayaPerawatan)}
          onValueChange={() => {}}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Nominal Ditransfer</FieldLabel>
        <CurrencyInput
          id="nominalDitransfer"
          name="nominalDitransfer"
          value={String(data.nominalDitransfer)}
          onValueChange={()=> {}}
          disabled
        />
      </Field>
    </FieldGroup>
  )
}