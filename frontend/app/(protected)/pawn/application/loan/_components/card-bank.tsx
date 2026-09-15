// Components - label & field input
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { Combobox, ComboboxInput, ComboboxList, ComboboxItem, ComboboxContent } from "@/components/ui/combobox";

// Component
import { Button } from "@/components/ui/button";

// React Hook Form
import { Controller, useFormContext, useWatch } from "react-hook-form";

// Data
import { Bank } from "../../../../_data/data-bank"

// Interface berdasarkan tipe data Bank
interface BankProps {
    data: Bank[]
}

export function CardBank({ data }: BankProps) {
    const { control, register, formState: { errors }, trigger } = useFormContext();

    // untuk menentukan label nomor rekening
    const bankId = useWatch({ control, name: "bankId" });
    const selectedBank = data.find((b) => String(b.id) === String(bankId));
    const isEWallet = selectedBank ? ["gopay", "ovo", "dana", "linkaja", "shopeepay"].some(ew => selectedBank.name.toLowerCase().includes(ew)) : false;
    const labelRekening = isEWallet ? "Nomor E-Wallet" : "Nomor Rekening";

    return (
        <FieldGroup className="md:flex h-fit gap-6 border border-grey/50 rounded-lg p-4">
            {/* 1. Kolom Bank/E-wallet */}
            <Field>
                <FieldLabel htmlFor="bankId">Bank/E-Wallet</FieldLabel>
                <Controller control={control} name="bankId"
                    render={({ field }) => (
                        <Combobox
                            items={data}
                            value={typeof field.value === 'string' ? (data.find(b => String(b.id) === String(field.value)) ?? null) : (field.value ?? null)}
                            onValueChange={(val: any) => field.onChange(val ? String(val.id) : "")}
                            itemToStringLabel={(item) => item.name}
                            itemToStringValue={(item) => String(item.id)}
                        >
                            <ComboboxInput id="bankId" placeholder="Choose Bank">
                                <ComboboxContent>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item.id} value={item}>
                                                {item.name}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </ComboboxInput>
                        </Combobox>
                    )}
                />
            </Field>
            {/* 2. Kolom Cabang */}
            <Field>
                <FieldLabel htmlFor="cabang">Cabang (opsional)</FieldLabel>
                <Input
                    id="cabang"
                    type="text"
                    placeholder="Cabang"
                    {...register("cabang")}
                    onWheel={(e) => e.currentTarget.blur()}
                />
            </Field>
            {/* 3. Kolom Nomor Rekening */}
            <Field className="items-baseline">
                <FieldLabel htmlFor="nomorRekening">{labelRekening}</FieldLabel>
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex flex-col gap-2 lg:flex-row">
                        <Input
                            id="nomorRekening"
                            type="text"
                            placeholder="Account Number"
                            {...register("nomorRekening")}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                            }}
                        />
                        <Button
                            type="button"
                            className="shrink-0 px-2 bg-btn-action-bg text-[11px]!"
                            onClick={() => trigger(["bankId", "nomorRekening"])}
                        >Cek {isEWallet ? "Nomor" : "No Rekening"}</Button>
                    </div>
                    {errors.nomorRekening && <span className="text-red-500 text-[10px]">{errors.nomorRekening.message as string}</span>}
                </div>
            </Field>
            {/* 4. Kolom Nama Pemilik Rekening */}
            <Field>
                <FieldLabel htmlFor="namaPemilikRekening">Nama Pemilik Rekening</FieldLabel>
                <Input
                    id="namaPemilikRekening"
                    type="text"
                    {...register("namaPemilikRekening")}
                    disabled
                />
            </Field>
        </FieldGroup>
    )
}