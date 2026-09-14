import { getPawnSummary, type PawnSummary } from "@/app/(protected)/_data/data-summary";
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { formatDateTime } from "@/lib/date";
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";

interface CardDocProps{
    data: PawnSummary;
}

export function CardDoc({data}: CardDocProps){
    return(
        <>
        <div className="">
            <div className="md:flex justify-items-start gap-2 pb-2 pt-2">
                <FileText size={20}></FileText>
                <h1 className="font-bold">Document</h1>
            </div>    
            <Card className="rounded-none">
                <CardContent className="grid grid-cols-2 gap-6 md:grid-cols-4 p-4">
                    <div className="flex flex-col gap-2">
                        <span>Application Form</span>
                        {data.pawnDocs?.application_form && (
                            <PreviewImage
                                src={data.pawnDocs.application_form}
                                alt="Application Form"
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span>Surat Bukti Gadai</span>
                        {data.pawnDocs?.sbg_form && (
                            <PreviewImage
                                src={data.pawnDocs.sbg_form}
                                alt="Surat Bukti Gadai"
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span>Bukti Kepemilikan Barang</span>
                        {data.pawnDocs?.bukti_kepemilikan && (
                            <PreviewImage
                                src={data.pawnDocs.bukti_kepemilikan}
                                alt="Bukti Kepemilikan Barang"
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span>Surat Kuasa</span>
                        {data.pawnDocs?.surat_kuasa_form && (
                            <PreviewImage
                                src={data.pawnDocs.surat_kuasa_form}
                                alt="Surat Kuasa"
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
        </>
    )
}