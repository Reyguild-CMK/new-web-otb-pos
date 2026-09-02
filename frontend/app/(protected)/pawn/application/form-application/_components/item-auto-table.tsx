import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Barang } from "../_data/barang-data"

// export function ItemAutoTable() {
interface AutoBarangProps {
    data: Barang[]
}

export function ItemAutoTable({ data }: AutoBarangProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Clarity</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Shape</TableHead>
                    <TableHead>Fineness</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Quantity</TableHead>
                </TableRow>
            </TableHeader>

            {data.map((data) => (
                <TableBody key={data.kode}>
                    <TableRow>
                        <TableCell>{data.clarity}</TableCell>
                        <TableCell>{(data.color).join(",")}</TableCell>
                        <TableCell>{data.shape}</TableCell>
                        <TableCell>{data.fineness}</TableCell>
                        <TableCell>{data.brand}</TableCell>
                        <TableCell>{data.qty}</TableCell>
                    </TableRow>
                </TableBody>
            ))}
        </Table>
    )
}