// Components - label & field input
import { Field } from "@/components/ui/field"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"

// Data
import { Status } from "../../../_data/status-take-over"

interface DropDownProps {
    data: Status[];
    value?: string;
    onChange?: (value: string) => void;
}

export function DropDown({ data, value, onChange }: DropDownProps) {
    return(
        <Field className="w-45 text-xs">
            <Select items={data} value={value} onValueChange={onChange}>
                <SelectTrigger className="border border-black/30">
                    <SelectValue>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {data.map((item) => (
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