import { Card, CardContent } from "@/components/ui/card";
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";
import { formatRupiah } from "@/lib/currency";
import { dataPawnHistory } from "@/app/(protected)/_data/data-pawn-history";
import { FileText } from "lucide-react";

import { style_card } from "@/components/shared/Stepper/Stepper";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";

interface CardRepaymentProps {
    data: PawnSummary;
}

export function CardRepayment({ data }: CardRepaymentProps) {
    const historyData = dataPawnHistory.filter(h => h.pawn_id === data.id);

    return (
        <div className={style_card}>
            <div className="flex flex-row items-center justify-start gap-2 pb-2">
                <FileText size={20}></FileText>
                <h1 className="font-bold">Repawn History</h1>
            </div>
            <div className="space-y-4">
                {historyData.map((history) => (
                        <div key={history.id} className="space-y-4">
                            <h4 className="font-bold">
                                Perpanjangan Ke {history.extend_number} | Due Date:{" "}
                                {history.due_date}
                            </h4>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Storage Insurance Fee
                                    </p>
                                    <p className="font-semibold">
                                        {formatRupiah(
                                            history.storage_insurance_fee_nominal
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Admin Fee
                                    </p>
                                    <p className="font-semibold">
                                        {formatRupiah(history.admin_fee)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Total Payment
                                    </p>
                                    <p className="font-semibold">
                                        {formatRupiah(history.total_payment)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Status
                                    </p>
                                    <p className="font-semibold">
                                        {history.status}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="font-semibold">Form Perpanjangan</p>

                                {history.form_application && (
                                    <PreviewImage
                                        src={history.form_application}
                                        alt="Form Perpanjangan"
                                        className="w-40"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}