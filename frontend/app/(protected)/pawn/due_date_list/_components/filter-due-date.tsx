"use client"

import * as React from "react";

// Components - label & field input
import { Field } from "@/components/ui/field"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"

type DropDownFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export const filterOptions = [
    { value: "all", label: "Semua"},
    { value: "h-7", label: "H-7 Jatuh Tempo"},
    { value: "h-14", label: "H-14 Jatuh Tempo"},
    { value: "h-30", label: "H-30 Jatuh Tempo"},
    { value: "overdue", label: "Lewat Batas Waktu"}
]

export function DropDownFilter({ value, onChange}: DropDownFilterProps) {
    return(
        <Field className="w-45 text-xs">
            <Select value={value} onValueChange={(nextValue) => onChange(nextValue ?? "all")}>
                <SelectTrigger className="border border-black/30">
                    <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {filterOptions.map((item) => (
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