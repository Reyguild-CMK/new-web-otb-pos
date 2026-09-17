// Global
import React, { useState, useEffect, useRef } from "react";

// Data
import { Tenor } from "../../../../_data/data-tenor"
import { calculateRefinancingDueDate, calculateRefinancingFees } from "@/lib/math-formulas";

// Components - label & field input
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CurrencyInput } from "@/components/ui/currency-input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox"

// Component
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// React Hook Form
import { Controller, useFormContext, useWatch } from "react-hook-form";

// Interface berdasarkan tipe data Tenor
interface LoanProps {
    data: Tenor[]
}

export function CardDayLoan({ data }: LoanProps) {
    const { control, register, getValues, setValue, trigger, formState: { errors } } = useFormContext();
    const [isLoading, setIsLoading] = useState(false);

    // Watchers to reset calculated status when inputs change
    const watchNilai = useWatch({ control, name: "nilaiPinjaman" });
    const watchTenor = useWatch({ control, name: "tenor" });
    const watchTanggal = useWatch({ control, name: "tanggalTransaksi" });
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setValue("isCalculated", false);
    }, [watchNilai, watchTenor, watchTanggal, setValue]);

    // Fungsi kalkulasi
    const handleCalculate = async () => {
        // cek jika sudah terisi
        const isValid = await trigger(["tenor", "nilaiPinjaman", "tanggalTransaksi"]);
        if (!isValid) return;

        setIsLoading(true);
        await new Promise(r => setTimeout(r, 800));

        // mengambil data yang sudah di input
        const values = getValues();
        const { tenor: tenorId, nilaiPinjaman, tanggalTransaksi, biayaAdmin = 0 } = values;

        // mencari objek tenor lengkap berdasarkan ID
        const selectedTenorId = typeof tenorId === 'object' && tenorId !== null ? (tenorId as any).id : tenorId;
        const selectedTenor = data.find((t) => String(t.id) === String(selectedTenorId));

        // kalkulasi tanggal jatuh tempo
        if (selectedTenor && tanggalTransaksi) {
            const jatuhTempo = calculateRefinancingDueDate(tanggalTransaksi, selectedTenor.tenor);
            setValue("tanggalJatuhTempo", jatuhTempo, { shouldValidate: true, shouldDirty: true });
        }

        // set persentase biaya perawatan
        const rate = selectedTenor ? (selectedTenor.rate || 0) : 0;
        setValue("persentaseBiayaPerawatan", rate, { shouldValidate: true });

        // kalkulasi biaya perawatan dan admin
        const np = Number(nilaiPinjaman) || 0;
        const ba = Number(biayaAdmin) || 0;
        const { biayaPerawatan, nominalDitransfer } = calculateRefinancingFees(np, rate, ba);

        // update value hasil kalkulasi ke dalam form
        setValue("biayaPerawatan", biayaPerawatan, { shouldValidate: true, shouldDirty: true });
        setValue("biayaAdmin", ba, { shouldValidate: true, shouldDirty: true });
        setValue("totalNilaiPinjaman", nominalDitransfer, { shouldValidate: true, shouldDirty: true });
        setValue("calculatedNilaiPinjaman", np, { shouldValidate: true, shouldDirty: true });
        setValue("isCalculated", true, { shouldValidate: true });

        setIsLoading(false);
    };

    return (
        <FieldGroup className="md:flex h-fit gap-6 border border-grey/50 rounded-lg p-4">
            {/* 1. Kolom Tenor */}
            <Field>
                <FieldLabel htmlFor="tenor">Tenor</FieldLabel>
                <div className="flex flex-col gap-1 w-full">
                    <Controller control={control} name="tenor"
                        render={({ field }) => (
                            <Combobox
                                items={data}
                                value={typeof field.value === 'string' ? (data.find(t => String(t.id) === String(field.value)) ?? null) : (field.value ?? null)}
                                onValueChange={(val: any) => field.onChange(val ? val.id : "")}
                                itemToStringLabel={(item) => item.label}
                                itemToStringValue={(item) => item.id}
                            >
                                <ComboboxInput id="tenor" placeholder="Select Tenor">
                                    <ComboboxContent>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item.id} value={item}>
                                                    {item.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </ComboboxInput>
                            </Combobox>
                        )}
                    />
                    {errors.tenor && <span className="text-red-500 text-[10px]">{errors.tenor.message as string}</span>}
                </div>
            </Field>

            {/* 2. Kolom Maks Nilai Pinjaman */}
            <Field>
                <FieldLabel htmlFor="maksNilaiPinjaman">Maks Nilai Pinjaman</FieldLabel>
                <Controller control={control} name="maksNilaiPinjaman"
                    render={({ field }) => (
                        <CurrencyInput
                            id="maksNilaiPinjaman"
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                            disabled
                        />
                    )}
                />
            </Field>

            {/* 3. Kolom Nilai Pinjaman */}
            <Field className="items-baseline">
                <FieldLabel htmlFor="nilaiPinjaman">Nilai Pinjaman</FieldLabel>
                <div className="flex flex-col gap-1 w-full">
                    <Controller control={control} name="nilaiPinjaman"
                        render={({ field }) => (
                            <CurrencyInput
                                id="nilaiPinjaman"
                                value={field.value ?? ""}
                                onValueChange={(val) => {
                                    field.onChange(val);
                                    if (val !== getValues("maksNilaiPinjaman")) {
                                        setValue("setMaksimalPinjaman", false);
                                    }
                                }}
                            />
                        )}
                    />
                    {errors.nilaiPinjaman && <span className="text-red-500 text-[10px]">{errors.nilaiPinjaman.message as string}</span>}

                    <div className="flex gap-2 items-center">
                        <Controller control={control} name="setMaksimalPinjaman"
                            render={({ field }) => (
                                <Checkbox
                                    id="setMaksimalPinjaman"
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                        field.onChange(checked);
                                        if (checked) {
                                            const maks = getValues("maksNilaiPinjaman");
                                            setValue("nilaiPinjaman", maks, { shouldValidate: true, shouldDirty: true });
                                        }
                                    }}
                                />
                            )}
                        />
                        <Label htmlFor="setMaksimalPinjaman">Set Maksimal Pinjaman</Label>

                    </div>

                </div>
            </Field>

            {/* 4. Kolom Persentase Biaya Perawatan */}
            <Field>
                <FieldLabel htmlFor="persentaseBiayaPerawatan">Persentase Biaya Perawatan</FieldLabel>
                <Input
                    id="persentaseBiayaPerawatan"
                    type="number"
                    {...register("persentaseBiayaPerawatan")}
                    disabled
                />
            </Field>

            {/* 5. Kolom Tanggal Transaksi */}
            <Field>
                <FieldLabel htmlFor="tanggalTransaksi">Tanggal Transaksi</FieldLabel>
                <div className="flex flex-col gap-1 w-full">
                    <Input
                        id="tanggalTransaksi"
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        {...register("tanggalTransaksi")}
                    />
                    {errors.tanggalTransaksi && <span className="text-red-500 text-[10px]">{errors.tanggalTransaksi.message as string}</span>}
                </div>
            </Field>

            {/* 6. Tombol Calculate */}
            <Field>
                <div></div>
                <div className="flex flex-col gap-1 w-full items-start">
                    <Button
                        type="button"
                        disabled={isLoading}
                        onClick={handleCalculate}
                        className="shrink-0 px-2 bg-btn-action-bg text-[11px]! w-24">
                        {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Calculate"}
                    </Button>
                    {errors.isCalculated && <span className="text-red-500 text-[10px] mt-1">{errors.isCalculated.message as string}</span>}
                </div>
            </Field>
        </FieldGroup>
    )
}