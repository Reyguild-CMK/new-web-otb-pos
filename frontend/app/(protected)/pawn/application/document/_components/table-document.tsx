// Component
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";

// Lib
import { formatRupiah } from "@/lib/currency";

// Interface data
import type { Barang } from "../../_data/barang-data";

// Data
import { dataBarang } from "../../_data/barang-data";

interface BarangTableProps {
  data: Barang[]
}

export function TableDocument({ data }: BarangTableProps){
  let totalNilai = 0;
  let totalMaksPinjaman = 0;

  data.forEach((item) => {
    totalNilai += item.nilai || 0;
    totalMaksPinjaman += item.makspinjaman || 0;
  });

  return(
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Product Photo</TableHead>
          <TableHead>Jenis Barang</TableHead>
          <TableHead>Karat</TableHead>
          <TableHead>Berat</TableHead>
          <TableHead>Catatan</TableHead>
          <TableHead className="text-right">Nilai</TableHead>
          <TableHead className="text-right">Maks Nilai Pinjaman</TableHead>
        </TableRow>
      </TableHeader>

      {/* Body table */}
      {dataBarang.map((item, index) => (
        <TableBody key={item.kode}>
          <TableRow>
            <TableCell>{index+1}</TableCell>
            <TableCell>
              <PreviewImage 
                src={item.foto}
                alt={item.namabarang}
              />
            </TableCell>
            <TableCell>{item.jenis}</TableCell>
            <TableCell>{item.karat}</TableCell>
            <TableCell>{item.berat}</TableCell>
            <TableCell>{item.catatan}</TableCell>
            <TableCell className="text-right">{formatRupiah(item.nilai)}</TableCell>
            <TableCell className="text-right">{formatRupiah(item.makspinjaman)}</TableCell>
          </TableRow>
      </TableBody>
      ))}

      {/* Footer total */}
      <TableFooter>
        <TableRow>
          <TableCell className="text-right" colSpan={6}>Total</TableCell>
          <TableCell className="text-right">{formatRupiah(totalNilai)}</TableCell>
          <TableCell className="text-right">{formatRupiah(totalMaksPinjaman)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}