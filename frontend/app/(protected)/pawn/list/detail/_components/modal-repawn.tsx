"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/date";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import Image from "next/image";
import { Printer, CalendarClock } from "lucide-react";
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";
import { toast } from "@/components/ui/toast";

import { PawnHistory } from "@/app/(protected)/_data/data-pawn-history";

interface ModalRepawnProps {
  data: PawnSummary;
  isReceiptMode?: boolean;
  historyData?: PawnHistory;
  buttonLabel?: string;
}

export function ModalRepawn({ data, isReceiptMode = false, historyData, buttonLabel = "Perpanjangan" }: ModalRepawnProps) {
  const [open, setOpen] = useState(false);
  const updateTransactionStatus = usePawnStore((state) => state.updateTransactionStatus);

  const handlePrint = () => {
    window.print();
  };

  const handleRepawn = () => {
    toast.add({ title: "Berhasil", description: "Perpanjangan berhasil diproses!", type: "success" });
    setOpen(false);
  };

  const isLate = false;
  const penalty = isLate ? Math.floor(data.nilaiPinjaman * 0.02) : 0;

  const bungaNominal = Math.floor((data.nilaiPinjaman * 0.75 / 100 / 15) * (data.tenordata?.tenor || data.tenor));
  const newDueDate = new Date(data.jatuhTempo);
  newDueDate.setDate(newDueDate.getDate() + (data.tenordata?.tenor || data.tenor));

  const newLastSaleDate = new Date(newDueDate);
  newLastSaleDate.setDate(newLastSaleDate.getDate() + 20);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            variant={isReceiptMode ? "outline" : "default"}
            className={isReceiptMode ? "" : "bg-orange-600 hover:bg-orange-700 text-white"}
          >
            {isReceiptMode ? <Printer className="w-4 h-4 mr-2" /> : <CalendarClock className="w-4 h-4 mr-2" />}
            {buttonLabel}
          </Button>
        }
      />
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="print:hidden">
          <DialogTitle>Nota Transaksi - Perpanjang</DialogTitle>
        </DialogHeader>

        {/* --- PRINTABLE RECEIPT CONTENT --- */}
        <div className="bg-white text-gray-800 p-6 rounded-md border text-sm print:p-0 print:border-none printable-receipt">
          <div className="flex items-start mb-4">
            <div className="mr-4">
              <Image src="/image/cmk_logo.png" alt="Logo" width={80} height={80} className="object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-bold">PT. CENTRAL MEGA KENCANA</h2>
              <h3 className="font-semibold text-gray-600 mt-1">NOTA TRANSAKSI - Perpanjang</h3>
            </div>
          </div>
          <hr className="border-t-2 border-dashed border-gray-400 mb-6" />

          <table className="w-full text-left mb-6">
            <tbody>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium">Tanggal</th>
                <td className="py-2 font-semibold">{formatDateTime(new Date())}</td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium">No Dokumen</th>
                <td className="py-2 font-semibold">{data.applicationNumber}</td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 align-top text-gray-600 font-medium">Barang</th>
                <td className="py-2">
                  {data.pawnItems?.length > 0 ? (
                    data.pawnItems.map((item, index) => (
                      <div key={index} className="mb-1 text-sm font-semibold">
                        ({index + 1}). {item.item_name} - CODE PLU: {item.plu || "-"}
                      </div>
                    ))
                  ) : (
                    data.barang?.map((brg, index) => (
                      <div key={index} className="mb-1 text-sm font-semibold">
                        ({index + 1}). {brg.namabarang} - CODE PLU: {brg.kode}
                      </div>
                    ))
                  )}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium">Nilai Pinjaman</th>
                <td className="py-2 font-semibold text-right">
                  <div className="float-left">Rp.</div>
                  {data.nilaiPinjaman.toLocaleString("id-ID")}
                </td>
              </tr>
              {penalty > 0 && (
                <tr className="border-b">
                  <th className="py-2 w-1/3 text-gray-600 font-medium align-top">Penalty</th>
                  <td className="py-2 font-semibold text-right">
                    <div className="float-left">Rp.</div>
                    {penalty.toLocaleString("id-ID")}
                  </td>
                </tr>
              )}
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium align-top">
                  Bunga ({data.tenordata?.rate || 0}%)
                </th>
                <td className="py-2 font-semibold text-right">
                  <div className="float-left">Rp.</div>
                  {bungaNominal.toLocaleString("id-ID")}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium align-top">Biaya Admin</th>
                <td className="py-2 font-semibold text-right">
                  <div className="float-left">Rp.</div>
                  {data.biayaAdmin.toLocaleString("id-ID")}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-bold">Total</th>
                <td className="py-2 font-bold text-right text-lg">
                  <div className="float-left">Rp.</div>
                  {(bungaNominal + data.biayaAdmin + penalty).toLocaleString("id-ID")}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium">Jatuh Tempo</th>
                <td className="py-2 font-semibold">{formatDateTime(newDueDate)}</td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium">Tanggal Lelang</th>
                <td className="py-2 font-semibold">{formatDateTime(newLastSaleDate)}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-center font-bold text-xs mb-6 uppercase pt-4">
            Keamanan barang Anda adalah prioritas kami
          </p>

          <div className="grid grid-cols-2 text-center text-sm font-semibold mt-8 pt-8 border-t">
            <div>
              <p>Petugas</p>
              <div className="h-16"></div>
              <p>{data.createdBy}</p>
            </div>
            <div>
              <p>Nasabah</p>
              <div className="h-16"></div>
              <p>{data.customer?.name}</p>
            </div>
          </div>
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex justify-end gap-2 mt-4 print:hidden">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Tutup
          </Button>
          <Button variant="secondary" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print Nota
          </Button>
          {!isReceiptMode && (
            <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleRepawn}>
              Konfirmasi Perpanjangan
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
