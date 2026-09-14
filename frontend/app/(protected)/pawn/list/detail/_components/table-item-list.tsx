import { Table, TableCell, TableHeader, TableHead, TableRow, TableBody } from "@/components/ui/table";
import { Gem } from "lucide-react"
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";
import { formatRupiah } from "@/lib/currency";
import { Card } from "@/components/ui/card";
import { dataPawnItemType } from "@/app/(protected)/_data/data-pawn-item-type";
import { PawnItemSummary } from "@/app/(protected)/_data/data-summary";

interface TableItemProps{
    data: PawnItemSummary[];
}

export function TableItemList({data}: TableItemProps){
    return(
        <>
        <div className="">
            <div className="md:flex justify-items-start gap-2 pb-2 pt-2">
                <Gem size={20}></Gem>
                <h1 className="font-bold">Item List</h1>
            </div> 
            <Card className="rounded-none p-4 ring-0 text-xs">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item Type</TableHead>
                            <TableHead>Carat</TableHead>
                            <TableHead>Remark</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Appraisal</TableHead>
                            <TableHead>Max Loan Price</TableHead>
                            <TableHead>Photo</TableHead>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Seal Form</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* Body table */}
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span>{item.item_name}</span>
                                        <span>{item.itemType?.text ?? "-"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{item.carat}</TableCell>
                                <TableCell>{item.remark}</TableCell>
                                <TableCell>{item.weight}</TableCell>
                                <TableCell>{formatRupiah(item.appraisal)}</TableCell>
                                <TableCell>{formatRupiah(item.max_loan_price)}</TableCell>
                                <TableCell>
                                    {item.photo && (
                                        <PreviewImage src={item.photo} alt={item.item_name} />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {item.invoice_photo && (
                                        <PreviewImage src={item.invoice_photo} alt={item.item_name} />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {item.seal_form_photo && (
                                        <PreviewImage src={item.seal_form_photo} alt={item.item_name} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
        </>
    )
}