import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { Landmark } from "lucide-react";
import { style_card } from "@/components/shared/Stepper/Stepper";

interface CardBankProps {
    data: PawnSummary;
}

export function CardBank({data}: CardBankProps){
    return(
        <div className={style_card}>
            <div className="flex flex-row items-center justify-start gap-2 pb-2">
                <Landmark size={20}></Landmark>
                <h1 className="font-bold">Bank Information</h1>
            </div>
            <div className="grid grid-cols-1 gap-6 text-xs">
                <div className="flex flex-col gap-2">
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
                </div>
            </div>
        </div>
    )
}