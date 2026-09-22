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
import { formatRupiah } from "@/lib/currency";
import { formatDateTime } from "@/lib/date";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import Image from "next/image";
import { Printer, Wallet, WalletCards } from "lucide-react";
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";
import { toast } from "@/components/ui/toast";

interface ModalDisbursementProps {
  data: PawnSummary;
  isDisbursed?: boolean;
  isReceiptMode?: boolean;
  buttonLabel?: string;
}

export function ModalDisbursement({ data, isDisbursed = false, isReceiptMode = false, buttonLabel = "Pencairan Dana" }: ModalDisbursementProps) {
  const [open, setOpen] = useState(false);
  const updateTransactionStatus = usePawnStore((state) => state.updateTransactionStatus);

  const handlePrint = () => {
    window.print();
  };

  const handleDisburse = () => {
    updateTransactionStatus(data.id, "disbursed");
    toast.add({ title: "Berhasil", description: "Dana berhasil dicairkan!", type: "success" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            variant={isReceiptMode ? "outline" : "default"}
            className={
              isReceiptMode 
                ? "" 
                : isDisbursed
                  ? "bg-slate-700 hover:bg-slate-800 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }
          >
            {isReceiptMode ? <WalletCards className="w-4 h-4 mr-2" /> : (isDisbursed ? <Printer className="w-4 h-4 mr-2" /> : <Wallet className="w-4 h-4 mr-2" />)}
            {buttonLabel || (isDisbursed ? "Cetak Nota Pencairan" : "Pencairan Dana")}
          </Button>
        }
      />
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="print:hidden">
          <DialogTitle>Nota Transaksi - Penerimaan Uang</DialogTitle>
        </DialogHeader>

        {/* --- PRINTABLE RECEIPT CONTENT --- */}
        <div className="bg-white text-gray-800 p-6 rounded-md border text-sm print:p-0 print:border-none printable-receipt">
          <div className="flex items-start mb-4">
            <div className="mr-4">
              <Image src="/image/cmk_logo.png" alt="Logo" width={80} height={80} className="object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-bold">PT. CENTRAL MEGA KENCANA</h2>
              <h3 className="font-semibold text-gray-600 mt-1">NOTA TRANSAKSI - Penerimaan Uang</h3>
            </div>
          </div>
          <hr className="border-t-2 border-dashed border-gray-400 mb-6" />

          <table className="w-full text-left mb-6">
            <tbody>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium">Tanggal</th>
                <td className="py-2 font-semibold">{formatDateTime(data.tanggalTransaksi)}</td>
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
                  {(data.nilaiPinjaman - data.biayaAdmin).toLocaleString("id-ID")}
                </td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium">Jatuh Tempo</th>
                <td className="py-2 font-semibold">{formatDateTime(data.jatuhTempo)}</td>
              </tr>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-gray-600 font-medium">Tanggal Lelang</th>
                <td className="py-2 font-semibold">
                  {data.lastSaleDate ? formatDateTime(data.lastSaleDate) : "-"}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-justify text-xs mb-4 leading-relaxed">
            Apabila sampai dengan tanggal jatuh tempo nasabah tidak melunasi atau memperpanjang, maka
            nasabah memberikan kuasa kepada PT CENTRAL MEGA KENCANA untuk menjual barang jaminan tersebut.
          </p>

          <p className="text-center font-bold text-xs mb-6 uppercase">
            NOTA TRANSAKSI INI MERUPAKAN SATU KESATUAN YANG TIDAK TERPISAHKAN DARI NO SBG DI ATAS
            <br />
            <br />
            Terima kasih atas kepercayaan Anda kepada PT. CENTRAL MEGA KENCANA
            <br />
            Keamanan barang Anda adalah prioritas kami
          </p>

          <div className="grid grid-cols-2 text-center text-sm font-semibold mt-8 pt-8">
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
          {!isDisbursed && !isReceiptMode && (
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleDisburse}>
              Konfirmasi & Cairkan Dana
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
