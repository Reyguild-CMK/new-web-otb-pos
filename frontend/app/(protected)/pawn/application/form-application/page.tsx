"use client"

// Style card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { BarangTable } from "./_components/barang-table";
import { ModalLayout } from "./_form/form-layout";

// Data
import { dataBarang } from "./_data/barang-data";

export default function FormApplication() {
  return (
    <div className={`${style_card} w-full`}>
      {/* Judul & Button*/}
      <div className="md:flex justify-between align-middle">
        <h1 className="font-bold pb-2">Daftar Barang</h1>

        {/* Add Item */}
        <ModalLayout />
      </div>

      {/* Tabel Daftar Barang*/}
      <BarangTable data={dataBarang} />
    </div>
  )
}
