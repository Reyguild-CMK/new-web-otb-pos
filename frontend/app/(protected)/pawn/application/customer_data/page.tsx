"use client"

// Style
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { Button } from "@/components/ui/button";

// Component - Input & Label
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";

// Icon
import { Search } from "lucide-react";

// Form
import { FieldIdentity } from "./_form/Indentity";
import { FieldKTP } from "./_form/KTP";

export default function CustomerApplication() {
    return (
        <>
        {/* Card */}
            <div className={`${style_card} w-full`}>
                {/* Judul */}
                <h1 className="font-bold">Data Pelanggan</h1>

                {/* Cari Pelanggan */}
                <FieldGroup className="gap-2">
                    <Field orientation="responsive">
                        <FieldLabel htmlFor="customerName">Cari Pelanggan</FieldLabel>
                        <div className="flex md:flex-row flex-col gap-2">
                            <Input id="" placeholder="No HP/Email/No KTP"/>
                            <Button className="bg-btn-primary-bg text-btn-primary-text"><Search/>Find</Button>
                        </div>
                    </Field>
                    <p className="text-alert-error-icon">* Masukan No HP, No KTP atau email customer yang pernah melakukan transaksi atau No HP customer Lakuemas</p>
                </FieldGroup>

                {/* Form Data Diri*/}
                <div className="md:flex gap-6">
                    <FieldIdentity/>
                    {/* Form KTP */}
                    <FieldKTP/>
                </div>
            </div>
        </>
    )
}
