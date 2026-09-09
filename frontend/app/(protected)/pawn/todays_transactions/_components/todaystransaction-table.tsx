"use client";

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatRupiah } from "@/lib/currency";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";

interface TodaysDataProps {
  data: PawnSummary[];
}

export function TodaysTransactionsTable({ data }: TodaysDataProps) {

  const totalPinjaman = data.reduce(
    (total, item) => total + item.nilaiPinjaman,
    0
  );

  const totalNominalDitransfer = data.reduce(
    (total, item) => total + item.nominalDitransfer,
    0
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Application Number</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Storage Insurance Fee</TableHead>
          <TableHead className="text-right">Admin Fee</TableHead>
          <TableHead className="text-right">Total Loan (Rp)</TableHead>
          <TableHead className="text-right">Disbursed (Rp)</TableHead>
        </TableRow>
      </TableHeader>

      {data.length === 0 ? (
        <TableBody>
          <TableRow>
            <TableCell className="text-center bg-muted" colSpan={8}>
              No Data
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.applicationNumber}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.applicationNumber}</TableCell>
                <TableCell>{item.customer.nama}</TableCell>
                <TableCell>{item.jatuhTempo.toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="text-right">
                  {formatRupiah(item.biayaPerawatan)}
                </TableCell>
                <TableCell className="text-right">
                  {formatRupiah(item.biayaAdmin)}
                </TableCell>
                <TableCell className="text-right">
                  {formatRupiah(item.nilaiPinjaman)}
                </TableCell>
                <TableCell className="text-right">
                  {formatRupiah(item.nominalDitransfer)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell className="text-right font-semibold" colSpan={6}>
                Total
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatRupiah(totalPinjaman)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatRupiah(totalNominalDitransfer)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </>
      )}
    </Table>
  );
}