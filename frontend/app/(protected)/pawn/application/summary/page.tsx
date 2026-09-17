"use client"

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { Summary } from "../summary/_components/summary"
import { TableDocument } from "../_components/table-document";

// Function getPawnSummary
import { getPawnSummary } from "@/app/(protected)/_data/data-summary";

import { StepNavigation } from "@/components/shared/Stepper/StepNavigation";
import { useRouter } from "next/navigation";

export default function SummaryPage(){
    const router = useRouter();

    const handleBack = () => {
        router.push("/pawn/application/document");
    };
    // hardcore aja
    const pawnId = 1;
    const summaryData = getPawnSummary(pawnId);

    if (!summaryData){
        return <p>Data Summary ga ada.</p>
    }

    return(
        <div className={`${style_card} w-full`}>
            {/* Judul */}
            <div className="md:flex justify-between align-middle">
                <h1 className="font-bold pb-2">Detail Pinjaman</h1>
            </div>
            {/* Table Barang */}
            <TableDocument data={summaryData.pawnItems}></TableDocument>
            <Summary data={summaryData}></Summary>

            <StepNavigation 
                currentStep={5} 
                totalSteps={5} 
                isLastStep
                hideNext
                onBack={handleBack}
            />
        </div>
    )
}