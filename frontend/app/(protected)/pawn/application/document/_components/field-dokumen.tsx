// Global
import { useState } from "react";

// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";

// Styling
import { style_card } from "@/components/shared/Stepper/Stepper";

export function FieldDokumen(){
  const [nilaiPinjaman, setNilaiPinjaman] = useState("");
  const [adminFee, setAdminFee] = useState("");
  const [biayaPerawatan, setBiayaPerawatan] = useState("");
  const [nominalDitransfer, setNominalDitransfer] = useState("");
  
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
        <CurrencyInput
          id="nilaiPinjaman"
          name="nilaiPinjaman"
          value={nilaiPinjaman}
          onValueChange={setNilaiPinjaman}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Admin Fee</FieldLabel>
        <CurrencyInput
          id="adminFee"
          name="adminFee"
          value={adminFee}
          onValueChange={setAdminFee}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Biaya Perawatan</FieldLabel>
        <CurrencyInput
          id="biayaPerawatan"
          name="biayaPerawatan"
          value={biayaPerawatan}
          onValueChange={setBiayaPerawatan}
          disabled
        />
      </Field>
      <Field>
        <FieldLabel>Nominal Ditransfer</FieldLabel>
        <CurrencyInput
          id="nominalDitransfer"
          name="nominalDitransfer"
          value={nominalDitransfer}
          onValueChange={setNominalDitransfer}
          disabled
        />
      </Field>
    </FieldGroup>
  )
}