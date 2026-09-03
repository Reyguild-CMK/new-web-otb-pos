"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import * as React from "react"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Calendar} from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { type DateRange } from "react-day-picker"

import { CalendarIcon } from "lucide-react"
import { FileText, List, Search } from 'lucide-react';

import { SearchBar } from "./_components/search-bar"
import { pawnData } from "./_data/pawn-data"

import Link from "next/link"
import { PawnDataPicker } from "./_components/date-picker"
import { PawnTable } from "./_components/pawn-table"
import { selectData } from "./_data/status-take-over"
import { DropDown } from "./_components/dropdown"

// Data Dummy for Select


export default function PawnList(){
    
    const [searchQuery, setSearchQuery] = React.useState("")
    const filteredApplications = pawnData.filter((application) => application.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    return(
        <div>
            <div className="mt-6">
                <div className="mb-4 flex justify-left">
                    <List className="inline-block mr-2" size={12} />
                    <h3>Application List</h3>
                </div>
                <div className="mb-2 flex justify-between">
                    <SearchBar onSearch={setSearchQuery} />
                    <div className="flex gap-2">
                        <DropDown data={selectData}></DropDown>
                        <PawnDataPicker></PawnDataPicker>
                    </div>
                </div>
                <PawnTable data={filteredApplications}></PawnTable>
            </div>
        </div>
    )
}