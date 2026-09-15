// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";

// React Hook Form
import { Controller, useFormContext } from "react-hook-form";

export function CardDetailLoan() {
    const { control, register } = useFormContext();

    return (
        <div className="flex flex-col h-fit gap-2 border border-grey/50 rounded-xl p-4">
            {/* 1. Kolom Jatuh Tempo */}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="tanggal-jatuh-tempo">Tanggal Jatuh Tempo</FieldLabel>
                    <Input
                        id="tanggal-jatuh-tempo"
                        type="date"
                        {...register("tanggalJatuhTempo")}
                        disabled
                    />
                </Field>
            </FieldGroup>

            {/* 2. Kolom Nilai Pinjaman */}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="nilai-pinjaman">Nilai Pinjaman</FieldLabel>
                    <Controller control={control} name="calculatedNilaiPinjaman"
                        render={({ field }) => (
                            <CurrencyInput
                                id="nilai-pinjaman"
                                value={field.value ?? ""}
                                onValueChange={field.onChange}
                                disabled
                                placeholder="0"
                            />
                        )}
                    />
                </Field>
            </FieldGroup>

            {/* 3. Kolom Biaya Admin */}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="biaya-admin">Biaya Admin</FieldLabel>
                    <Controller control={control} name="biayaAdmin"
                        render={({ field }) => (
                            <CurrencyInput
                                id="biaya-admin"
                                value={field.value ?? ""}
                                onValueChange={field.onChange}
                                disabled
                                placeholder="0"
                            />
                        )}
                    />
                </Field>
            </FieldGroup>

            {/* 4. Kolom Biaya Perawatan */}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="biaya-perawatan">Biaya Perawatan</FieldLabel>
                    <Controller control={control} name="biayaPerawatan"
                        render={({ field }) => (
                            <CurrencyInput
                                id="biaya-perawatan"
                                value={field.value ?? ""}
                                onValueChange={field.onChange}
                                disabled
                                placeholder="0"
                            />
                        )}
                    />
                </Field>
            </FieldGroup>

            {/* 5. Kolom Nominal Ditransfer */}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="total-nilai-pinjaman">Nominal Ditransfer</FieldLabel>
                    <Controller control={control} name="totalNilaiPinjaman"
                        render={({ field }) => (
                            <CurrencyInput
                                id="total-nilai-pinjaman"
                                value={field.value ?? ""}
                                onValueChange={field.onChange}
                                disabled
                                placeholder="0"
                            />
                        )}
                    />
                </Field>
            </FieldGroup>
        </div>
    )
}