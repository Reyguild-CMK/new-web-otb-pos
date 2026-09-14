import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { Card, CardContent } from "@/components/ui/card"
import { formatRupiah } from "@/lib/currency";
import { Handshake } from "lucide-react"
import { formatDateTime } from "@/lib/date";

interface CardDetailPawnProps{
    data: PawnSummary;
}

export function CardDetailPawn({data}: CardDetailPawnProps){
    return(
        <>
        <div className="">
            {/* Judul */}
            <div className="md:flex justify-items-start gap-2 pb-2">
                <Handshake size={20}></Handshake>
                <h1 className="font-bold">Detail Pinjaman</h1>
            </div>    
            <Card className="grid grid-cols-1 gap-6 rounded-none p-2 ring-0 text-xs">
                <CardContent className="flex flex-col gap-2">
                    {/* Judul */}
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Nilai Pinjaman </span>
                        <span>: {formatRupiah(data.nilaiPinjaman)}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Tenor:</span>
                        <span>: {data.tenor}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Tanggal Transaksi</span>
                        <span>: {formatDateTime(data.tanggalTransaksi)}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Jatuh Tempo</span>
                        <span>: {formatDateTime(data.jatuhTempo)}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Biaya Perawatan</span>
                        <span>: {formatRupiah(data.biayaPerawatan)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        </>
    )
}