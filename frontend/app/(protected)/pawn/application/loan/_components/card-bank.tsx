// Components - label & field input
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { Combobox, ComboboxInput, ComboboxList, ComboboxItem, ComboboxContent} from "@/components/ui/combobox";

// Component
import { Button } from "@/components/ui/button";

// Data
import { Bank } from "../../../../_data/data-bank"

interface BankProps{
    data: Bank[]
}

export function CardBank({data}:BankProps){
    return(
        <div className="md:flex h-fit gap-6 border border-grey/50 rounded-lg p-4">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="dataBank">Bank</FieldLabel>
                    <Combobox items={data} defaultValue={data[0]} itemToStringLabel={(item) => item.name}  itemToStringValue={(item) => item.id}>
                        <ComboboxInput placeholder="Choose Bank">
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
                    <div className="flex gap-2">
                        <Input
                            id="nomorRekening"
                            name="nomorRekening"
                            type="number">
                        </Input>
                        <Button className="shrink-0 px-2 bg-btn-action-bg text-[11px]!">Cek Nomor Rekening</Button>
                    </div>
                </Field>
                <Field>
                    <FieldLabel htmlFor="namaPemilikRekening">Nama Pemilik Rekening</FieldLabel>
                    <Input
                        id="namaPemilikRekening"
                        name="namaPemilikRekening"
                        type="text"
                        placeholder="External Account Inquiry Simulator"
                        disabled>
                    </Input>
                </Field>
           </FieldGroup>
        </div>
    )
}