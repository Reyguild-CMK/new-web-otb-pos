import { Tenor } from "../_data/data-tenor"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface LoanProps{
    data:Tenor[]
}

export function CardDayLoan({data}:LoanProps){
    const [open, setOpen] = React.useState(false)
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
                    <FieldLabel htmlFor="cabang">Cabang (opsional)</FieldLabel>
                    <Input
                        id="cabang"
                        name="cabang"
                        type="text"
                        onWheel={(e) => e.currentTarget.blur()}
                        >
                    </Input>
                </Field>
                <Field>
                    <FieldLabel htmlFor="nomorRekening">Nomor Rekening</FieldLabel>
                    <Input
                        id="nomorRekening"
                        name="nomorRekening"
                        type="number">
                    </Input>
                </Field>
                <Field>
                    <FieldLabel htmlFor="cek-no-rekening"></FieldLabel>
                </Field>
                <Field>
                    <FieldLabel htmlFor="maksNilaiPinjaman">Maks Nilai Pinjaman</FieldLabel>
                    <Input
                        id="maksNilaiPinjaman"
                        name="maksNilaiPinjaman"
                        type="number"
                        disabled>
                    </Input>
                </Field>
                <Field>
                    <FieldLabel htmlFor="nilaiPinjaman">Nilai Pinjaman</FieldLabel>
                    <Input
                        id="nilaiPinjaman"
                        name="nilaiPinjaman"
                        type="number"
                        disabled>
                    </Input>
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