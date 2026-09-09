// Component
import { Card, CardContent } from "@/components/ui/card"

// Library
import { formatRupiah } from "@/lib/currency"

// Interface Data PawnSummary
import { PawnSummary } from "@/app/(protected)/_data/data-summary"

interface SummaryProps {
    data: PawnSummary;
}

export function Summary({ data }: SummaryProps) {
    return (
        <Card
            className="grid grid-cols-1 gap-6 rounded-none border-x-0 border-y p-2 ring-0 shadow-none bg-transparent md:grid-cols-2 text-xs"
        >
            <CardContent className="flex flex-col gap-2">
                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Tenor</span>
                    <span>: {data.tenor} Days</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Persentase Biaya Perawatan</span>
                    <span>: {`${(data.persentaseBiayaPerawatan * 100).toFixed(2)}%`}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Metode Pencairan</span>
                    <span>: {data.metodePencairan}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Bank</span>
                    <span>: {data.bankName}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>No Rekening</span>
                    <span>: {data.nomorRekening}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Nama Pemilik Rekening</span>
                    <span>: {data.namaPemilikRekening}</span>
                </div>
            </CardContent>

            <CardContent className="flex flex-col gap-2">
                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>No Dokumen</span>
                    <span>: {data.applicationNumber}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Tanggal Transaksi</span>
                    <span>: {data.tanggalTransaksi.toLocaleDateString("id-ID")}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Tanggal Jatuh Tempo</span>
                    <span>: {data.jatuhTempo.toLocaleDateString("id-ID")}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Nilai Pinjaman</span>
                    <span>: {formatRupiah(data.nilaiPinjaman)}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Biaya Perawatan</span>
                    <span>: {formatRupiah(data.biayaPerawatan)}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Nominal Ditransfer</span>
                    <span>: {formatRupiah(data.nominalDitransfer)}</span>
                </div>
            </CardContent>
        </Card>
    )
}