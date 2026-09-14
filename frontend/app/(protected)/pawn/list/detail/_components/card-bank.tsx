import { Disbursed, getDisbursed } from "@/app/(protected)/_data/data-approved";
import { Card, CardContent } from "@/components/ui/card"

interface CardBankProps{
    data: Disbursed;
}

export function CardBank({data}: CardBankProps){
    return(
        <Card className="grid grid-cols-1 gap-2 rounded-none p-2 ring-0 text-xs">
                {/* Judul */}
            <h3 className="font-bold">Bank Information</h3>
            <CardContent className="flex flex-col gap-2">
                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Bank </span>
                    <span>: {data.bankName}</span>
                </div>
                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Account Number</span>
                    <span>: {data.nomorRekening}</span>
                </div>
                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Account Name</span>
                    <span>: {data.namaPemilikRekening}</span>
                </div>
            </CardContent>
        </Card>
    )
}