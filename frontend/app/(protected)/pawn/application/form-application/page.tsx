"use client"

// Style card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { BarangTable } from "./_components/barang-table";
import { ModalLayout } from "./_form/FormLayout";

// Store
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";

export default function FormApplication() {
  const pawnItems = usePawnStore((state) => state.pawnItems);

  return (
    <div className={`${style_card} w-full`}>
      {/* Judul & Button*/}
      <div className="md:flex justify-between align-middle">
        <h1 className="font-bold pb-2">Daftar Barang</h1>

        {/* Add Item */}
        <ModalLayout />
      </div>

      {/* Tabel Daftar Barang*/}
      {pawnItems.length > 0 && (
        <div className="bg-red-100 text-red-600 border border-red-200 p-4 rounded-md my-4 text-sm">
          * Untuk penginputan transaksi Gold Tunai hanya dapat dilakukan per 1 item. Apabila barang Gold Tunai ada lebih dari 1 maka silahkan menyelesaikan penginputan hingga tahap "Waiting Approval" lalu melakukan penginputan lagi
        </div>
      )}
      <BarangTable data={pawnItems} />
    </div>
  )
}
