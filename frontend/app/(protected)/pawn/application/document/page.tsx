"use client"

// Style
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Component - Input & Label
import { InputFile } from "./_components/input-file";

// Component - Form & Section
import { TableDocument } from "./_components/table-document";
import { FieldNominal } from "./_components/field-nominal";
import { WaitingApproval } from "./_components/waiting-approval";
import { FieldDokumen } from "./_components/field-dokumen";

// Interface Data
import { dataBarang } from "../_data/barang-data";

// Icon
import { Download } from 'lucide-react';

export default function CustomerApplication() {
    return (
      <>
      {/* Card */}
      <div className={`${style_card} w-full`}>
        {/* Judul */}
        <h1 className="font-bold">Dokumen</h1>

        {/* Tabel */}
        <TableDocument data={dataBarang}/>
        
        {/* Form Pembayaran*/}
        <h1>Detail Informasi Pinjaman</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Field Nominal, Bank ,dll */}
          <FieldNominal/>
          {/* Field Informasi Dokumen */}
          <FieldDokumen/>
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
