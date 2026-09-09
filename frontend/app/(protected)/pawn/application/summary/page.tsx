"use client"

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { Summary } from "../summary/_components/summary"
import { BarangTable } from "../form-application/_components/barang-table";

// Function getPawnSummary
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";

export default function SummaryPage(){
    const summaryData = getPawnSummary("J2CE432608310004")

    if (!summaryData){
        return <p>Data Summary ga ada.</p>
    }

    return(
        <div className={`${style_card} w-full`}>
            {/* Judul */}
            <div className="md:flex justify-between align-middle">
                <h1 className="font-bold pb-2">Detail Pinjaman</h1>
            </div>
            {/* Table Barang */}
            <BarangTable data={summaryData.barang}></BarangTable>
            <Summary data={summaryData}></Summary>
        </div>
    )
}