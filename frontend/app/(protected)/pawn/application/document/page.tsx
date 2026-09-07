"use client"

// Style
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Component - Input & Label
import { FieldGroup } from "@/components/ui/field-application";
import InputImage from "@/components/shared/InputImage/InputImage";

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
          <Button className="mb-8 bg-btn-primary-bg text-btn-primary-text"><Download/>Download Document</Button>
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <InputImage
              id="formPerjanjian"
              name="formPerjanjian"
              label="Form Perjanjian"
              imageAlt="Form Perjanjian"
            />
            <InputImage
              id="suratKepemilikanBarang"
              name="suratKepemilikanBarang"
              label="Surat Kepemilikan Barang"
              imageAlt="Surat Kepemilikan Barang"
            />
            <InputImage
              id="suratSegelBarang"
              name="suratSegelBarang"
              label="Surat Segel Barang"
              imageAlt="Surat Segel Barang"
            />
            <InputImage
              id="sertifikatInHouse"
              name="sertifikatInHouse"
              label="Sertifikat in House"
              imageAlt="Sertifikat in House"
            />
            <InputImage
              id="sertifikatGIA"
              name="sertifikatGIA"
              label="Sertifikat GIA/Setara"
              imageAlt="Sertifikat GIA/Setara"
            />
            <InputImage
              id="buyingPrice"
              name="buyingPrice"
              label="Buying Price"
              imageAlt="Buying Price"
            />
            <InputImage
              id="lainnya"
              name="lainnya"
              label="Lainnya"
              imageAlt="Lainnya"
            />
          </FieldGroup>
        </div>
      </div> 
    </>
  )
}
