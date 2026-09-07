"use client"

import { style_card } from "@/components/shared/Stepper/Stepper";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Textarea } from "@/components/ui/textarea";

import { dataBarang, type Barang } from "../form-application/_data/barang-data"
import { BarangTable } from "../form-application/_components/barang-table";
import { CardBank } from "./_components/card-bank";
import { dataBank } from "./_data/data-bank";
import { tenor } from "./_data/data-tenor";
import { CardDayLoan } from "./_components/card-loan"
import { CardDetailLown } from "./_components/card-detail-loan";

export default function FormLoanApplication() {
  return (
    <div className={`${style_card} w-full`}>
        {/* Judul */}
        <div className="md:flex justify-between align-middle">
            <h1 className="font-bold pb-2">Detail Pinjaman</h1>
        </div>
        {/* Table Barang */}
        <BarangTable data={dataBarang}></BarangTable>
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            {/* Content */}
            <div className="flex flex-col gap-4">
                <CardDayLoan data={tenor}></CardDayLoan>
                <CardBank data={dataBank}></CardBank>
            </div>
            <div className="flex flex-col gap-4">
                <div className="h-fit border border-grey/50 rounded-xl p-4">
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Catatan/ Keterangan</FieldLabel>
                            <Textarea id="catatan"/>
                        </Field>
                    </FieldGroup>
                </div>
                <CardDetailLown></CardDetailLown>
            </div>
        </div>
    </div>
  )
}
