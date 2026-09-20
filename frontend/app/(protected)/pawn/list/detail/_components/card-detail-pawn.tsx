import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { formatRupiah } from "@/lib/currency";
import { Handshake } from "lucide-react"
import { formatDateTime } from "@/lib/date";
import { style_card } from "@/components/shared/Stepper/Stepper";

interface CardDetailPawnProps {
    data: PawnSummary;
}

export function CardDetailPawn({ data }: CardDetailPawnProps) {
    return (
        <div className={style_card}>
            <div className="flex flex-row items-center justify-start gap-2 pb-2">
                <Handshake size={20}></Handshake>
                <h1 className="font-bold">Detail Pinjaman</h1>
            </div>
            <div className="grid grid-cols-1 gap-6 text-xs">
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Nilai Pinjaman </span>
                        <span>: {formatRupiah(data.nilaiPinjaman)}</span>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-x-2">
                        <span>Tenor:</span>
                        <span>: {data.tenor} hari</span>
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
                </div>
            </div>
        </div>
    )
}