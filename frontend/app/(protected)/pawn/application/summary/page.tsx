"use client"

import { style_card } from "@/components/shared/Stepper/Stepper";

import { Summary } from "../summary/_components/summary"
import { dataCustomer } from "./_data/data-customer";
import { BarangTable } from "../form-application/_components/barang-table";
import { dataBarang } from "../_data/barang-data";

export default function SummaryPage(){
    return(
        <div className={`${style_card} w-full`}>
            {/* Judul */}
            <div className="md:flex justify-between align-middle">
                <h1 className="font-bold pb-2">Detail Pinjaman</h1>
            </div>
            {/* Table Barang */}
            <BarangTable data={dataBarang}></BarangTable>
            <Summary data={dataCustomer}></Summary>
        </div>
    )
}