"use client"

// Style
import { style_card } from "@/components/shared/Stepper/Stepper";

// UI Component
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { StepNavigation } from "@/components/shared/Stepper/StepNavigation";

// Component - label & field input
import { InputFile } from "./_components/input-file";
import { TableDocument } from "../_components/table-document";
import { FieldNominal } from "./_components/field-nominal";
import { WaitingApproval } from "./_components/waiting-approval";
import { FieldDokumen } from "./_components/field-dokumen";
import { SuratPerjanjian } from "./_components/surat-perjanjian";

// Icon
import { Download } from 'lucide-react';

// Utility
import { useRouter } from "next/navigation";
import { useState } from "react";

// Store
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";

export default function CustomerApplication() {
  const router = useRouter();
  const [isWaitingApproval, setIsWaitingApproval] = useState(false);
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const loanDetails = usePawnStore((state) => state.loanDetails);
  const pawnItems = usePawnStore((state) => state.pawnItems);
  const customerData = usePawnStore((state) => state.customerData);

  const handleFileChange = (id: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [id]: file }));
  };

  const handleNext = async () => {
    const requiredFiles = [
      'formPerjanjian',
      'suratKepemilikanBarang',
      'suratSegelBarang',
      'sertifikatInHouse',
      'sertifikatGIA',
      'buyingPrice'
    ];

    const isAllRequiredFilled = requiredFiles.every((key) => files[key] !== undefined && files[key] !== null);

    if (!isAllRequiredFilled) {
      toast.add({
        title: "Validasi Gagal",
        description: "Mohon lengkapi semua dokumen yang wajib diunggah.",
        type: "error"
      });
      return;
    }

    setIsWaitingApproval(true);

    try {
      const transactionId = "TRX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      console.log(`[SUBMIT] Memulai unggah dokumen untuk Transaksi ID: ${transactionId}`);

      for (const [key, file] of Object.entries(files)) {
        if (!file) continue;

        let payloadFile: Blob = file;

        const formData = new FormData();
        formData.append("transaction_id", transactionId);
        formData.append("document_type", key);
        formData.append("file", payloadFile, file.name);


        console.log(`[PAYLOAD READY] Menyiapkan request unggah untuk field: ${key}`);
        for (let pair of formData.entries()) {
          console.log(`   FormData => ${pair[0]}: ${pair[1] instanceof Blob ? `[Blob object] (Size: ${(pair[1].size / 1024).toFixed(2)}KB)` : pair[1]}`);
        }
      }

      // Penentuan Role Approval berdasarkan Nilai Pinjaman
      const nilaiPinjaman = loanDetails?.nilaiPinjaman || 0;

      if (nilaiPinjaman >= 20000000) {
        console.log("[ROUTING] Approval dialihkan ke Role: QC (Karena nominal >= 20 Juta)");
      } else {
        console.log("[ROUTING] Approval dialihkan ke Role: SM (Karena nominal < 20 Juta)");
      }

      toast.add({ title: "Berhasil", description: "Dokumen berhasil diajukan untuk approval.", type: "success" });

    } catch (error) {
      console.error(error);
      toast.add({ title: "Gagal", description: "Terjadi kesalahan saat memproses gambar.", type: "error" });
    } finally {
      setIsWaitingApproval(false);
    }
  };

  const handleBack = () => {
    router.push("/pawn/application/customer_data");
  };

  const handlePrint = () => {
    window.print();
  };

  if (!loanDetails) {
    return <p>Data pinjaman tidak ditemukan.</p>;
  }

  return (
    <>
      <div className="hidden print:block absolute top-0 left-0 w-full min-h-screen bg-white z-[9999] m-0 p-0 text-black">
        <SuratPerjanjian 
          loanDetails={loanDetails} 
          pawnItems={pawnItems} 
          customerData={customerData} 
        />
      </div>

      <div className="print:hidden">
        {/* Card */}
        <div className={`${style_card} w-full`}>
          {/* Judul */}
          <h1 className="font-bold">Dokumen</h1>


          {/* Tabel Dokumen*/}
          <div className="flex flex-col gap-2">
            <h3>Daftar Barang</h3>
            <TableDocument data={pawnItems} />
          </div>

          {/* Form Informasi Pembayaran*/}
          <div className="flex flex-col gap-2">
            <h3>Detail Informasi Pinjaman</h3>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Tenor, Bank ,dll */}
              <FieldNominal data={loanDetails} />
              {/* Informasi Dokumen */}
              <FieldDokumen data={loanDetails} pawnCode={pawnItems?.[0]?.pawn_item_code} />
            </div>
          </div>

          <Separator />

          <div className="text-center">
            {/* Button Download Document */}
            <Button onClick={handlePrint} className="mb-6 bg-btn-primary-bg text-btn-primary-text cursor-pointer hover:bg-btn-primary-bg/90">
              <Download className="mr-2 h-4 w-4" />
              Download Document
            </Button>

            {/* Section Input File */}
            <InputFile files={files} onFileChange={handleFileChange} />

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
      </div>
    </>
  )
}
