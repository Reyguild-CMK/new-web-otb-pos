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

import { StepNavigation } from "@/components/shared/Stepper/StepNavigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomerApplication() {
  const router = useRouter();
  const [isWaitingApproval, setIsWaitingApproval] = useState(false);

  const handleNext = async () => {
    setIsWaitingApproval(true);
  };

  const handleBack = () => {
    router.push("/pawn/application/customer_data");
  };

  const pawnSummary = getPawnSummary(1)

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
          <TableDocument data={pawnSummary.pawnItems} />
        </div>

        {/* Form Informasi Pembayaran*/}
        <div className="flex flex-col gap-2">
          <h3>Detail Informasi Pinjaman</h3>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Tenor, Bank ,dll */}
            <FieldNominal data={pawnSummary} />
            {/* Informasi Dokumen */}
            <FieldDokumen data={pawnSummary} />
          </div>
        </div>

        <Separator />

        <div className="text-center">
          {/* Button Download Document */}
          <Button className="mb-6 bg-btn-primary-bg text-btn-primary-text"><Download className="mr-2 h-4 w-4" />Download Document</Button>

          {/* Section Input File */}
          <InputFile />

          {/* Loading untuk menunggu approval */}
          {isWaitingApproval && (
            <div className="mt-8 text-left">
              <WaitingApproval />
            </div>
          )}
        </div>

        <StepNavigation
          currentStep={4}
          totalSteps={5}
          onNext={handleNext}
          onBack={handleBack}
          nextLabel="Ajukan Approval"
          hideNext={isWaitingApproval}
        />
      </div>
    </>
  )
}
