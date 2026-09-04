// component
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import Image from 'next/image';

// lib
import { formatRupiah } from "@/lib/currency";

// icon & 
import { CircleX } from "lucide-react";

// interface data
import type { Barang } from "../_data/barang-data"

interface BarangTableProps {
  data: Barang[]
}

import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";

export function BarangTable({ data }: BarangTableProps) {
  let totalNilai = 0;
  let totalMaksPinjaman = 0;

  data.forEach((item) => {
    totalNilai += item.nilai || 0;
    totalMaksPinjaman += item.makspinjaman || 0;
  });

  return (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Kode</TableHead>
        <TableHead>Foto</TableHead>
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
    {data.map((item) => (
      <TableBody key={item.kode}>
        <TableRow>
          <TableCell>{item.kode}</TableCell>
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
          <TableCell className="text-center">{item.qty}</TableCell>
          <TableCell className="text-right">{formatRupiah(item.nilai)}</TableCell>
          <TableCell className="text-right">{formatRupiah(item.makspinjaman)}</TableCell>
          <TableCell className="p-2!">
            <Button className="bg-btn-delete-bg text-btn-delete-text size-7 p-0">
              <CircleX/>
            </Button>
          </TableCell>
        </TableRow>
    </TableBody>
    ))}

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