// Components - label & field input
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { Combobox, ComboboxInput, ComboboxList, ComboboxItem, ComboboxContent } from "@/components/ui/combobox";

// Component
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "@/components/ui/toast";

// React Hook Form
import { Controller, useFormContext, useWatch } from "react-hook-form";

// Data
import { Bank } from "../../../../_data/data-bank"
import { dummyBankAccounts } from "@/app/(protected)/_data/data-bank-account";

// Interface berdasarkan tipe data Bank
interface BankProps {
    data: Bank[],
    isSubmitting?: boolean
}

export function CardBank({ data, isSubmitting = false }: BankProps) {
    const { control, register, getValues, setValue, formState: { errors }, trigger } = useFormContext();
    const [isLoading, setIsLoading] = useState(false);

    // untuk menentukan label nomor rekening
    const bankId = useWatch({ control, name: "bankId" });
    const selectedBank = data.find((b) => String(b.id) === String(bankId));
    const isEWallet = selectedBank ? ["gopay", "ovo", "dana", "linkaja", "shopeepay"].some(ew => selectedBank.name.toLowerCase().includes(ew)) : false;
    const labelRekening = isEWallet ? "Nomor E-Wallet" : "Nomor Rekening";

    const watchRekening = useWatch({ control, name: "nomorRekening" });
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setValue("isRekeningChecked", false);
    }, [watchRekening, bankId, setValue]);

    const handleCekRekening = async () => {
        const bankIdValue = getValues("bankId");
        if (!bankIdValue) {
            toast.add({ title: "Peringatan", description: "Pilih Bank/E-Wallet terlebih dahulu!", type: "warning" });
            return;
        }

        const isValid = await trigger(["bankId", "nomorRekening"]);
        if (!isValid) return;

        setIsLoading(true);
        await new Promise(r => setTimeout(r, 800));

        const accountNum = getValues("nomorRekening");
        const foundAccount = dummyBankAccounts.accounts.find(a => a.number === accountNum);
        const nameToSet = foundAccount ? foundAccount.name : dummyBankAccounts.getRandomVerifiedName();

        setValue("namaPemilikRekening", nameToSet, { shouldValidate: true, shouldDirty: true });
        setValue("isRekeningChecked", true, { shouldValidate: true });
        setIsLoading(false);
    };

    return (
        <FieldGroup className="md:flex h-fit gap-6 border border-grey/50 rounded-lg p-4">
            {/* 1. Kolom Bank/E-wallet */}
            <Field className="items-baseline">
                <FieldLabel htmlFor="bankId">Bank/E-Wallet <span className="text-red-500">*</span></FieldLabel>
                <div className="flex flex-col gap-1 w-full">
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
                    {errors.bankId && <span className="text-red-500 text-[10px]">{errors.bankId.message as string}</span>}
                </div>
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
                            disabled={isLoading || isSubmitting}
                            className="shrink-0 px-2 bg-btn-action-bg text-[11px]! w-32"
                            onClick={handleCekRekening}
                        >
                            {(isLoading || isSubmitting) ? <Loader2 className="animate-spin h-4 w-4" /> : `Cek ${isEWallet ? "Nomor" : "No Rekening"}`}
                        </Button>
                    </div>
                    {errors.nomorRekening && <span className="text-red-500 text-[10px]">{errors.nomorRekening.message as string}</span>}
                    {errors.isRekeningChecked && <span className="text-red-500 text-[10px]">{errors.isRekeningChecked.message as string}</span>}
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