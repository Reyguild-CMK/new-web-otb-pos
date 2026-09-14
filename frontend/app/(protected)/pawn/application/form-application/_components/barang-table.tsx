// Component
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";

// Library
import { formatRupiah } from "@/lib/currency";

// Icon
import { CircleX } from "lucide-react";

// Interface data Barang
import type { PawnItemSummary } from "@/app/(protected)/_data/data-summary";

interface BarangTableProps {
  data: PawnItemSummary[]
}

export function BarangTable({ data }: BarangTableProps) {
  let totalNilai = 0;
  let totalMaksPinjaman = 0;

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
            <TableCell className="text-center bg-muted" colSpan={6}>No Data</TableCell>
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
              <TableCell>{item.itemType?.text || "-"} <span className="font-bold">({item.plu})</span></TableCell>
              <TableCell>{item.carat}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.remark}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">{formatRupiah(item.appraisal)}</TableCell>
              <TableCell className="text-right">{formatRupiah(item.max_loan_price)}</TableCell>
              <TableCell className="p-2!">
                <Button className="bg-btn-delete-bg text-btn-delete-text size-7 p-0">
                  <CircleX />
                </Button>
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