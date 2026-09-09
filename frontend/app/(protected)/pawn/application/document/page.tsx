"use client"

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Component - label & field input
import { InputFile } from "./_components/input-file";

// Components - label & field input
import { TableDocument } from "../_components/table-document";
import { FieldNominal } from "./_components/field-nominal";
import { WaitingApproval } from "./_components/waiting-approval";
import { FieldDokumen } from "./_components/field-dokumen";

// Icon
import { Download } from 'lucide-react';

// Function getPawnSummary
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";

export default function CustomerApplication() {
  const pawnSummary = getPawnSummary("J2CE432608310004")

  if (!pawnSummary) {
    return <p>Data pinjaman tidak ditemukan.</p>;
  }

    return (
      <>
      {/* Card */}
      <div className={`${style_card} w-full`}>
        {/* Judul */}
        <h1 className="font-bold">Dokumen</h1>
        

        {/* Tabel Dokumen*/}
        <div className="flex flex-col gap-2">
          <h3>Daftar Barang</h3>
          <TableDocument data={pawnSummary.barang}/>
        </div>
        
        {/* Form Informasi Pembayaran*/}
        <div className="flex flex-col gap-2">
          <h3>Detail Informasi Pinjaman</h3>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Tenor, Bank ,dll */}
            <FieldNominal data={pawnSummary}/>
            {/* Informasi Dokumen */}
            <FieldDokumen data={pawnSummary}/>
          </div>
        </div>
        
        <Separator/>

        {/* Loading untuk menunggu approval */}
        <WaitingApproval/>

        <div className="text-center">
          {/* Button Download Document */}
          <Button className="mb-8 bg-btn-primary-bg text-btn-primary-text"><Download/>Download Document</Button>

          {/* Section Input File */}
          <InputFile/>
        </div>
      </div> 
    </>
  )
}
