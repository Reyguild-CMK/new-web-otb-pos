import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";

interface CardDocProposalProps{
    data: PawnSummary;
}

export function CardDocProposal({data}: CardDocProposalProps){
    return(
        <>
        <div className="">
            <div className="md:flex justify-items-start gap-2 pb-2">
                <FileText size={20}></FileText>
                <h1 className="font-bold">Document Proposal</h1>
            </div>    
            <Card className="grid grid-cols-1 gap-6 rounded-none p-2 ring-0 text-xs">
                <CardContent className="flex flex-col gap-2">
                    {/* Judul */}
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Application Number </span>
                        <span>: {data.applicationNumber}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Metode Pencairan</span>
                        <span>: {data.metodePencairan}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Created At:</span>
                        <span>: {new Date(data.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Created By</span>
                        <span>: {data.createdBy}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Approved At</span>
                        <span>: {data.approvedAt ? new Date(data.approvedAt).toLocaleString() : "-"}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Approved By</span>
                        <span>: {data.approvedBy}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Old Document</span>
                        <span>: {data.oldApplication}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        </>
    )
}