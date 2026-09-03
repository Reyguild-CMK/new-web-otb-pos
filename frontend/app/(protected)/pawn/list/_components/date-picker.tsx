import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import React from "react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { CalendarIcon } from "lucide-react"

interface DatePickerProps {

}

export function PawnDataPicker({}: DatePickerProps) {
    const [date, setDate] = React.useState<DateRange | undefined>({
            from: new Date(new Date().getFullYear(), 0, 20),
            to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    })

    return (
    <Field className="mx-auto w-50 text-xs">
        <Popover>
            <PopoverTrigger render={<Button variant="outline" id="date-picker-range" className="justify-start px-2.5 font-normal border border-black/30"><CalendarIcon data-icon="inline-start" />{date?.from ? (
                date.to ? (
                <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                </>
                ) : (
                format(date.from, "LLL dd, y")
                )
            ) : (
                <span>Pick a date</span>
            )}</Button>} />
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
            />
            </PopoverContent>
        </Popover>
    </Field>
    )
}