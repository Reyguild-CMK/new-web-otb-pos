"use client"
import { style_card } from "@/components/shared/Stepper/Stepper";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatRupiah } from "@/lib/currency";
import { Gem, ShoppingCartPlus } from "lucide-react";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import Image from "next/image";
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";

interface todaysDataProps {
  data?: PawnSummary[];
}


export function ItemListsTable({data}: todaysDataProps){
  return(
    <Table>
      <TableHeader>
          <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Application Number</TableHead>
              <TableHead>Item Code</TableHead>
              <TableHead>Item Type</TableHead>
              <TableHead>Carat</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Product Photo</TableHead>
          </TableRow>
      </TableHeader>

      {/* Body table */}
      {!data ? (
      <TableBody>
          <TableRow>
          <TableCell className="text-center bg-muted" colSpan={8}>No Data</TableCell>
          </TableRow>
      </TableBody>
      ) : (
      <TableBody>
          {data.map((pawn) =>
            pawn.pawnItems && pawn.pawnItems.length > 0 ? pawn.pawnItems.map((item, index) => (
              <TableRow key={item.pawn_item_code || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pawn.applicationNumber}</TableCell>
                <TableCell>{item.pawn_item_code || item.plu}</TableCell>
                <TableCell>{item.itemType?.text || item.item_name}</TableCell>
                <TableCell>{item.carat}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>
                  <PreviewImage src={item.photo || "/image/jewelry.jpg"} alt={item.item_name}/>
                </TableCell>
              </TableRow>
            )) : pawn.barang.map((barang, index) => (
              <TableRow key={barang.kode}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pawn.applicationNumber}</TableCell>
                <TableCell>{barang.kode}</TableCell>
                <TableCell>{barang.jenis}</TableCell>
                <TableCell>{barang.karat}</TableCell>
                <TableCell>{barang.berat}</TableCell>
                <TableCell>
                  <PreviewImage src={barang.foto} alt={barang.namabarang}/>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      )}
  </Table>
  )
}