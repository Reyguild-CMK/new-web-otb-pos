"use client"

// Style card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { BarangTable } from "./_components/barang-table";
import { ModalLayout } from "./_form/FormLayout";

// Data
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";

export default function FormApplication() {
  const pawnSummary = getPawnSummary(4);
  const pawnItems = pawnSummary?.pawnItems || [];
  return (
    <div className={`${style_card} w-full`}>
      {/* Judul & Button*/}
      <div className="md:flex justify-between align-middle">
        <h1 className="font-bold pb-2">Daftar Barang</h1>

        {/* Add Item */}
        <ModalLayout />
      </div>

      {/* Tabel Daftar Barang*/}
      <BarangTable data={pawnItems} />
    </div>
  )
}
