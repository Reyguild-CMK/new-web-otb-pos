// Component
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

// Library
import { formatRupiah } from "@/lib/currency";

// Icon
import { CircleX } from "lucide-react";

// Interface data Barang
import type { PawnItemSummary } from "@/app/(protected)/_data/data-summary";

// Store
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";

interface BarangTableProps {
  data: PawnItemSummary[];
  isLocked?: boolean;
}

export function BarangTable({ data, isLocked = false }: BarangTableProps) {
  let totalNilai = 0;
  let totalMaksPinjaman = 0;

  const removePawnItem = usePawnStore((state) => state.removePawnItem);

  data.forEach((item) => {
    totalNilai += item.appraisal || 0;
    totalMaksPinjaman += item.max_loan_price || 0;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Kode</TableHead>
          <TableHead>Product Photo</TableHead>
          <TableHead>Jenis Barang</TableHead>
          <TableHead>Karat</TableHead>
          <TableHead>Berat</TableHead>
          <TableHead>Catatan</TableHead>
          <TableHead>QTY</TableHead>
          <TableHead className="text-right">Nilai</TableHead>
          <TableHead className="text-right">Maks Nilai Pinjaman</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      {/* Body table */}
      {data.length === 0 ? (
        <TableBody>
          <TableRow>
            <TableCell className="text-center bg-muted" colSpan={10}>No Data</TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.pawn_item_code || item.id}>
              <TableCell>{item.pawn_item_code}</TableCell>
              <TableCell>
                <PreviewImage
                  src={item.photo || ""}
                  alt={item.item_name}
                />
              </TableCell>
              <TableCell>
                <div>{item.itemType?.text || "-"}</div>
                <div className="font-semibold">({item.plu?.toUpperCase()})</div>
              </TableCell>
              <TableCell>{item.carat}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell className="max-w-xs whitespace-pre-wrap break-words">
                <div>{item.remark}</div>
                <div className="font-semibold">({item.condition})</div>
              </TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">{formatRupiah(item.appraisal)}</TableCell>
              <TableCell className="text-right">{formatRupiah(item.max_loan_price)}</TableCell>
              <TableCell className="p-2!">
                {!isLocked && (
                  <Dialog>
                    <DialogTrigger render={
                      <Button className="bg-btn-delete-bg hover:bg-btn-delete-bg/80 text-btn-delete-text size-7 p-0">
                        <CircleX />
                      </Button>
                    } />
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                          Apakah Anda yakin ingin menghapus barang <b>{item.pawn_item_code}</b> dari daftar pinjaman?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-end mt-4">
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <DialogClose render={
                          <Button
                            className="bg-btn-delete-bg hover:bg-btn-delete-bg/80 text-white"
                            onClick={() => removePawnItem(item.id)}
                          >
                            Ya, Hapus
                          </Button>
                        } />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}

      {/* Footer total */}
      <TableFooter>
        <TableRow>
          <TableCell className="text-right" colSpan={7}>Total</TableCell>
          <TableCell className="text-right">{formatRupiah(totalNilai)}</TableCell>
          <TableCell className="text-right">{formatRupiah(totalMaksPinjaman)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}