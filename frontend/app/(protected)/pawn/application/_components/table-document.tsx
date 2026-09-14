// Component
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";

// Library
import { formatRupiah } from "@/lib/currency";

// Interface data Barang
import type { PawnItemSummary } from "@/app/(protected)/_data/data-summary";


interface BarangTableProps {
  data: PawnItemSummary[]
}

export function TableDocument({ data }: BarangTableProps) {
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
          <TableHead>No</TableHead>
          <TableHead>Product Photo</TableHead>
          <TableHead>Jenis Barang</TableHead>
          <TableHead>Karat</TableHead>
          <TableHead>Berat</TableHead>
          <TableHead>Catatan</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead className="text-right">Nilai</TableHead>
          <TableHead className="text-right">Maks Nilai Pinjaman</TableHead>
        </TableRow>
      </TableHeader>

      {/* Body table */}
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.pawn_item_code || index}>
            <TableCell>{index + 1}</TableCell>
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
            <TableCell>{item.quantity}</TableCell>
            <TableCell className="text-right">{formatRupiah(item.appraisal)}</TableCell>
            <TableCell className="text-right">{formatRupiah(item.max_loan_price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>

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