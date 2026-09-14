import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";

interface CardCustomerProps{
    data: PawnSummary;
}

export function CardCustomer({data}: CardCustomerProps){
    const customerBirthday = data.customer.tanggal_lahir ? new Date(data.customer.tanggal_lahir).toLocaleDateString() : "-";

    return(
        <>
        <div className="">
            <div className="md:flex justify-items-start gap-2 pb-2">
                <User size={20}></User>
                <h1 className="font-bold">Customer Detail</h1>
            </div>    
            <Card className="grid grid-cols-1 gap-6 rounded-none p-2 ring-0 text-xs">
                <CardContent className="flex flex-col gap-2">
                    {/* Judul */}
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>ID Number </span>
                        <span>: {data.customerId}</span>
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
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>ID CARD</span>
                        <PreviewImage 
                            src={data.customer.image_tanda_pengenal}
                            alt={String(data.customerId)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
        </>
    )
}