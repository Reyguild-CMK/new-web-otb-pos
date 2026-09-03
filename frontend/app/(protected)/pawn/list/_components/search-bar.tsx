import { Search } from "lucide-react";

// components
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

// interface data
import type { Pawn } from "../_data/pawn-data"
import React from "react";


interface SearchBarProps {
    onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const [search, setSearch] = React.useState("")
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(search)
    }
    return(
        <form onSubmit={handleSearch}>
            <Field orientation="horizontal" className="mb-4 text-xs">
                <Input 
                    type="search" 
                    placeholder="Search Application Number" 
                    value={search}
                    className="text-xs h-8 w-65 border border-black/30" 
                    onChange={(e) => setSearch(e.target.value)} />
                <Button className="bg-gold text-navy-dark" onClick={handleSearch}>
                    <Search size={12} />
                </Button>
            </Field>
        </form>
    )
}