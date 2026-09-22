// Global
import React from "react"

// Components
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

// Component - label & field input
import { Field } from "@/components/ui/field"

// Library
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

// Icon
import { CalendarIcon } from "lucide-react"

interface PawnDataPickerProps {
    date?: DateRange;
    setDate?: (date: DateRange | undefined) => void;
}

export function PawnDataPicker({ date, setDate }: PawnDataPickerProps) {

    return (
    <Field className="w-full text-xs">
        <Popover>
            <PopoverTrigger render={<Button variant="outline" id="date-picker-range" aria-label="Pilih tanggal transaksi" className="h-9 w-full justify-start border border-gray-400 px-2.5 font-normal">
                <CalendarIcon data-icon="inline-start" aria-hidden="true" />
                {date?.from ? (
                date.to ? (
                <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                </>
                ) : (
                format(date.from, "LLL dd, y")
                )
            ) : (
                <span>Tanggal Transaksi</span>
            )}</Button>} />
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
            />
            {date?.from && (
                <div className="p-2 border-t flex justify-end">
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-700" onClick={() => setDate && setDate(undefined)}>
                        Clear Filter
                    </Button>
                </div>
            )}
            </PopoverContent>
        </Popover>
    </Field>
    )
}