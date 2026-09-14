"use client"

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Textarea } from "@/components/ui/textarea";

// Components
import { TableDocument } from "../_components/table-document";

// Form
import { CardBank } from "./_components/card-bank";
import { CardDayLoan } from "./_components/card-loan"
import { CardDetailLoan } from "./_components/card-detail-loan";

// Data
import { dataBank } from "../../../_data/data-bank";
import { tenor } from "../../../_data/data-tenor";
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";

export default function FormLoanApplication() {
    const pawnSummary = getPawnSummary(4);
    const pawnItems = pawnSummary?.pawnItems || [];
    return (
        <div className={`${style_card} w-full`}>
            {/* Judul */}
            <div className="md:flex justify-between align-middle">
                <h1 className="font-bold pb-2">Detail Pinjaman</h1>
            </div>
            {/* Table Barang */}
            <TableDocument data={pawnItems}></TableDocument>
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
                                <Textarea id="catatan" />
                            </Field>
                        </FieldGroup>
                    </div>
                    <CardDetailLoan></CardDetailLoan>
                </div>
            </div>
        </div>
    )
}
