import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";

export function CardDetailLown(){
    return(
        <div className="flex flex-col h-fit gap-2 border border-grey/50 rounded-xl p-4">
            <FieldGroup>
                <Field>
                    <FieldLabel>Tanggal Jatuh Tempo</FieldLabel>
                    <Input id="tanggal-jatuh-tempo" />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel>Nilai Pinjaman</FieldLabel>
                    <Input id="nilai-pinjaman" />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel>Biaya Admin</FieldLabel>
                    <Input id="biaya-admin" />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel>Biaya Perawatan</FieldLabel>
                    <Input id="biaya-perawatan" />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel>Nominal Ditransfer</FieldLabel>
                    <Input id="total-nilai-pinjaman" />
                </Field>
            </FieldGroup>
        </div>
    )
}