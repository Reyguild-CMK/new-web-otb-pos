// Global
import { useState } from "react";

// Data
import { Tenor } from "../../../../_data/data-tenor"

// Components - label & field input
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CurrencyInput } from "@/components/ui/currency-input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox"

interface LoanProps{
    data:Tenor[]
}

export function CardDayLoan({data}:LoanProps){
    const [maksNilaiPinjaman, setMaksNilaiPinjaman] = useState("");
    const [nilaiPinjaman, setNilaiPinjaman] = useState("");

    return(
        <div className="md:flex h-fit gap-6 border border-grey/50 rounded-lg p-4">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="tenor">Tenor</FieldLabel>
                    <Combobox items={data} defaultValue={data[0]} itemToStringLabel={(item) => item.tenor}  itemToStringValue={(item) => item.id}>
                        <ComboboxInput placeholder="Select Tenor">
                            <ComboboxContent>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.id} value={item}>
                                            {item.tenor}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </ComboboxInput> 
                    </Combobox>
                </Field>
                <Field>
                    <FieldLabel htmlFor="cek-no-rekening"></FieldLabel>
                </Field>
                <Field>
                    <FieldLabel htmlFor="maksNilaiPinjaman">Maks Nilai Pinjaman</FieldLabel>
                    <CurrencyInput
                        id="maksNilaiPinjaman"
                        name="maksNilaiPinjaman"
                        value={maksNilaiPinjaman}
                        onValueChange={setMaksNilaiPinjaman}
                        disabled
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="nilaiPinjaman">Nilai Pinjaman</FieldLabel>
                    <CurrencyInput
                        id="nilaiPinjaman"
                        name="nilaiPinjaman"
                        value={nilaiPinjaman}
                        onValueChange={setNilaiPinjaman}
                    />
                </Field>    
                <Field>
                    <FieldLabel></FieldLabel>
                    <div className="flex items-center gap-2">
                        <Checkbox id="toggle-checkbox" name="toggle-checkbox"></Checkbox>
                        <Label htmlFor="toogle-checkbox">Set Maksimal Pinjaman</Label>
                    </div>
                </Field>
                <Field>
                    <FieldLabel htmlFor="persentaaseBiayaPerawatan">Persentase Biaya Perawatan</FieldLabel>
                    <Input
                        id="persentaseBiayaPerawatan"
                        name="persentaseBiayaPerawatan"
                        type="number"
                        disabled>
                    </Input>
                </Field>
                <Field>
                    <FieldLabel htmlFor="tanggalTransaksi">Tanggal Transaksi</FieldLabel>
                    <Input
                        id="tanggalTransaksi"
                        name="tanggalTransaksi"
                        type="date"
                        >
                    </Input>
                </Field>           
            </FieldGroup>
        </div>
    )
}