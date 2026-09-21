import { User } from "lucide-react"
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { style_card } from "@/components/shared/Stepper/Stepper";

interface CardCustomerProps{
    data: PawnSummary;
    isReuploadMode?: boolean;
}

export function CardCustomer({data, isReuploadMode}: CardCustomerProps){
    const date = data.customer.tanggal_lahir ? new Date(data.customer.tanggal_lahir) : null;
    const customerBirthday = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : "-";

    return(
        <div className={style_card}>
            <div className="flex flex-row items-center justify-start gap-2 pb-2">
                <User size={20}></User>
                <h1 className="font-bold">Customer Detail</h1>
            </div>    
            <div className="grid grid-cols-1 gap-6 text-xs">
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>ID Number </span>
                        <span>: {data.customer.tanda_pengenal || "-"}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Nama</span>
                        <span>: {data.customer.name}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Birthday</span>
                        <span>: {customerBirthday}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Address</span>
                        <span>: {data.customer.address}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Handphone</span>
                        <span>: {data.customer.handphone}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Email</span>
                        <span>: {data.customer.email}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Occupation</span>
                        <span>: {data.customer.profesi}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Marital Status</span>
                        <span>: {data.customer.status_perkawinan}</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <span>ID CARD</span>
                        {isReuploadMode ? (
                            <div className="flex flex-col gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                                <label className="text-xs font-semibold text-gray-500">Upload New ID Card</label>
                                <input type="file" accept="image/*" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                                {data.customer.image_tanda_pengenal && (
                                    <div className="mt-2 opacity-50 pointer-events-none">
                                        <PreviewImage src={data.customer.image_tanda_pengenal} alt="current ID Card" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            data.customer.image_tanda_pengenal && (
                                <PreviewImage src={data.customer.image_tanda_pengenal} alt="ID Card"/>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}