// Components - label & field input
import { Field } from "@/components/ui/field"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"

// icon
import { Pencil } from "lucide-react";

// Data
import type { PawnStatusNotification  } from "@/app/(protected)/_data/data-pawn";

export const statusOptions: Array<{value: PawnStatusNotification; label: string}> = [
    { value: "akan_lunas", label: "Akan Lunas"},
    { value: "bayar_sebagian", label: "Bayar Sebagian"},
    { value: "gadai_ulang", label: "Gadai Ulang"},
    { value: "tanpa_status", label: "Tanpa Status"},
    { value: "tidak_akan_lunas", label: "Tidak Akan Lunas"}
]

type DropdownDueDateProps = {
    value: PawnStatusNotification 
    onChange: (value: PawnStatusNotification) => void;
}

export function DropDownStatus({
    value,
    onChange,
}: DropdownDueDateProps) {
    return(
        <Field className="w-30 text-xs">
            <Select 
                value={value} 
                onValueChange={(val) => onChange(val as PawnStatusNotification)}>
                <SelectTrigger className="w-45 justify-center gap-1 border border-black/30">
                    <Pencil className="h-3 w-3"></Pencil>
                    <SelectValue placeholder="Pilih Status"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {statusOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    )
}