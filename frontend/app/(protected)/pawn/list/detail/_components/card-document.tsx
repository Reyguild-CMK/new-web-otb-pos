import { type PawnSummary } from "@/app/(protected)/_data/data-summary";
import { type Docs } from "@/app/(protected)/_data/data-docs";
import { FileText } from "lucide-react";
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";
import { style_card } from "@/components/shared/Stepper/Stepper";

interface CardDocProps {
    data: PawnSummary;
    isReuploadMode?: boolean;
}

interface DocMapping {
    key: keyof Docs;
    label: string;
}

const documentList: DocMapping[] = [
    { key: "application_form", label: "Application Form" },
    { key: "sbg_form", label: "Surat Bukti Gadai" },
    { key: "bukti_kepemilikan", label: "Surat Kepemilikan Barang" },
    { key: "surat_segel_barang", label: "Surat Segel Barang" },
    { key: "surat_kuasa_form", label: "Surat Kuasa" },
    { key: "perjanjian_take_over", label: "Perjanjian Take Over" },
    { key: "permintaan_dana_take_over", label: "Permintaan Dana Take Over" },
    { key: "form_perjanjian", label: "Form Perjanjian" },
    { key: "titip_jual_form", label: "Form Titip Jual" },
    { key: "nota_pembayaran", label: "Nota Pembayaran" },
    { key: "nota_tanda_terima", label: "Nota Tanda Terima" },
    { key: "sertifikat_in_house", label: "Sertifikat in House" },
    { key: "sertifikat_gia", label: "Sertifikat GIA/Setara" },
    { key: "buying_price", label: "Buying price" },
    { key: "lainnya", label: "Lainnya" }
];

export function CardDoc({ data, isReuploadMode }: CardDocProps) {
    return (
        <div className={style_card}>
            <div className="flex flex-row items-center justify-start gap-2 pb-2">
                <FileText size={20} />
                <h1 className="font-bold">Document</h1>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {documentList.map(({ key, label }) => {
                    const docValue = data.pawnDocs?.[key] as string | undefined;

                    if (!isReuploadMode && !docValue) {
                        return null; // Do not render if there's no file and not in reupload mode
                    }

                    return (
                        <div key={key} className="flex flex-col gap-2 mt-2">
                            <span>{label}</span>
                            {isReuploadMode ? (
                                <div className="flex flex-col gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                                    <label className="text-xs font-semibold text-gray-500">Upload New {label}</label>
                                    <input type="file" accept="image/*,application/pdf" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                                    {docValue && (
                                        <div className="mt-2 opacity-50 pointer-events-none">
                                            <PreviewImage src={docValue} alt={`current ${label}`} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                docValue && (
                                    <PreviewImage src={docValue} alt={label} fileName={`${label}.pdf`} />
                                )
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}