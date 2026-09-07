// Global
import { useState } from "react";

// components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";

export function CardDetailLown(){
    const [nilaiPinjaman, setNilaiPinjaman] = useState("");
    const [biayaAdmin, setBiayaAdmin] = useState("");
    const [biayaPerawatan, setBiayaPerawatan] = useState("");
    const [totalNilaiPinjaman, setTotalNilaiPinjaman] = useState("");

    return(
        <div className="flex flex-col h-fit gap-2 border border-grey/50 rounded-xl p-4">
            <FieldGroup>
                <Field>
                    <FieldLabel>Tanggal Jatuh Tempo</FieldLabel>
                    <Input id="tanggal-jatuh-tempo" type="date" disabled/>
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel>Nilai Pinjaman</FieldLabel>
                    <CurrencyInput
                        id="nilai-pinjaman"
                        name="nilaiPinjaman"
                        value={nilaiPinjaman}
                        onValueChange={setNilaiPinjaman}
                        disabled
                        placeholder="0"
                    />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel>Biaya Admin</FieldLabel>
                    <CurrencyInput
                        id="biaya-admin"
                        name="biayaAdmin"
                        value={biayaAdmin}
                        onValueChange={setBiayaAdmin}
                        disabled
                        placeholder="0"
                    />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel>Biaya Perawatan</FieldLabel>
                    <CurrencyInput
                        id="biaya-perawatan"
                        name="biayaPerawatan"
                        value={biayaPerawatan}
                        onValueChange={setBiayaPerawatan}
                        disabled
                        placeholder="0"
                    />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel>Nominal Ditransfer</FieldLabel>
                    <CurrencyInput
                        id="total-nilai-pinjaman"
                        name="totalNilaiPinjaman"
                        value={totalNilaiPinjaman}
                        onValueChange={setTotalNilaiPinjaman}
                        disabled
                        placeholder="0"
                    />
                </Field>
            </FieldGroup>
        </div>
    )
}