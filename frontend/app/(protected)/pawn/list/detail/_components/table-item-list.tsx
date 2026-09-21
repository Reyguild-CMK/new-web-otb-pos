import { Table, TableCell, TableHeader, TableHead, TableRow, TableBody } from "@/components/ui/table";
import { Gem, Upload } from "lucide-react"
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";
import { formatRupiah } from "@/lib/currency";
import { Card } from "@/components/ui/card";
import { style_card } from "@/components/shared/Stepper/Stepper";
import { dataPawnItemType } from "@/app/(protected)/_data/data-pawn-item-type";
import { PawnItemSummary } from "@/app/(protected)/_data/data-summary";
import { useState } from "react";

interface TableItemProps {
    data: PawnItemSummary[];
    isReuploadMode?: boolean;
    pawnInvoice?: string | null;
    pawnSealForm?: string | null;
}

export function TableItemList({ data, isReuploadMode, pawnInvoice, pawnSealForm }: TableItemProps) {
    const [localImages, setLocalImages] = useState<Record<string, string>>({});

    const handleFileChange = (itemId: number, type: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setLocalImages(prev => ({ ...prev, [`${itemId}-${type}`]: url }));
        }
    };

    return (
        <div className={style_card}>
            <div className="flex flex-row items-center justify-start gap-2 pb-2">
                <Gem size={20}></Gem>
                <h1 className="font-bold">Item List</h1>
            </div>
            <div className="text-xs overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item Type</TableHead>
                            <TableHead>Carat</TableHead>
                            <TableHead>Remark</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Appraisal</TableHead>
                            <TableHead>Max Loan Price</TableHead>
                            <TableHead>Product</TableHead>
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
                                <TableCell>
                                    <div className="flex flex-col gap-1.5 min-w-[150px] max-w-[250px]">
                                        {item.ltv ? (
                                            <span className="font-semibold text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded w-fit">LTV: {item.ltv}%</span>
                                        ) : item.condition ? (
                                            <span className="font-semibold text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded w-fit">Condition: {item.condition}</span>
                                        ) : null}
                                        <span className="whitespace-pre-wrap text-[11px] text-gray-500 leading-relaxed">{item.remark}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{item.weight}</TableCell>
                                <TableCell>{formatRupiah(item.appraisal)}</TableCell>
                                <TableCell>{formatRupiah(item.max_loan_price)}</TableCell>
                                <TableCell>
                                    {isReuploadMode ? (
                                        <div className="flex flex-col items-start gap-2 min-w-[120px]">
                                            <label className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-md text-[10px] font-semibold text-center inline-flex items-center gap-1.5 w-fit">
                                                <Upload size={12} /> Ganti Foto
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(item.id, 'photo', e)} />
                                            </label>
                                            {(localImages[`${item.id}-photo`] || item.photo) && (
                                                <PreviewImage src={localImages[`${item.id}-photo`] || item.photo || ""} alt={item.item_name} />
                                            )}
                                        </div>
                                    ) : (
                                        item.photo && <PreviewImage src={item.photo} alt={item.item_name} />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {isReuploadMode ? (
                                        <div className="flex flex-col items-start gap-2 min-w-[120px]">
                                            <label className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-md text-[10px] font-semibold text-center inline-flex items-center gap-1.5 w-fit">
                                                <Upload size={12} /> Ganti Foto
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(item.id, 'invoice', e)} />
                                            </label>
                                            {(localImages[`${item.id}-invoice`] || item.invoice_photo || pawnInvoice) && (
                                                <PreviewImage src={localImages[`${item.id}-invoice`] || item.invoice_photo || pawnInvoice || ""} alt={item.item_name} />
                                            )}
                                        </div>
                                    ) : (
                                        (item.invoice_photo || pawnInvoice) && <PreviewImage src={item.invoice_photo || pawnInvoice || ""} alt={item.item_name} />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {isReuploadMode ? (
                                        <div className="flex flex-col items-start gap-2 min-w-[120px]">
                                            <label className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-md text-[10px] font-semibold text-center inline-flex items-center gap-1.5 w-fit">
                                                <Upload size={12} /> Ganti Foto
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(item.id, 'seal', e)} />
                                            </label>
                                            {(localImages[`${item.id}-seal`] || item.seal_form_photo || pawnSealForm) && (
                                                <PreviewImage src={localImages[`${item.id}-seal`] || item.seal_form_photo || pawnSealForm || ""} alt={item.item_name} />
                                            )}
                                        </div>
                                    ) : (
                                        (item.seal_form_photo || pawnSealForm) && <PreviewImage src={item.seal_form_photo || pawnSealForm || ""} alt={item.item_name} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}