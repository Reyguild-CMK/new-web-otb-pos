// Global
import React from "react";

// Icon
import { Search } from "lucide-react";

// Components
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

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
        <form onSubmit={handleSearch} className="w-full lg:max-w-md">
            {/* Search Bar Field */}
            <Field orientation="horizontal" className="mb-0 w-full text-xs">
                <Input 
                    type="search" 
                    placeholder="Search Application Number" 
                    value={search}
                    className="h-9 min-w-0 flex-1 border border-gray-400 text-xs"
                    onChange={(e) => {
                        const val = e.target.value;
                        setSearch(val);
                        if (val === "") {
                            onSearch("");
                        }
                    }} 
                />
                <Button type="submit" aria-label="Cari nomor aplikasi" className="h-9 bg-gold text-navy-dark hover:bg-yellow-medium">
                    <Search size={12} aria-hidden="true" />
                </Button>
            </Field>
        </form>
    )
}