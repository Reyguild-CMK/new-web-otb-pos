import { Customer } from "../_data/data-customer"
import { Card, CardContent } from "@/components/ui/card"
import { formatRupiah } from "@/lib/currency"

interface SummaryProps {
    data: Customer[]
}

export function Summary({ data }: SummaryProps) {
    return data.map((item) => (
        <Card
            key={item.noDokumen}
            className="grid grid-cols-1 gap-6 rounded-none border-x-0 border-y p-2 ring-0 shadow-none bg-transparent md:grid-cols-2 text-xs"
        >
            <CardContent className="flex flex-col gap-2">
                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Tenor</span>
                    <span>: {item.tenor}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Persentase Biaya Perawatan</span>
                    <span>: {item.persentaseBiayaPerawatan}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Metode Pencairan</span>
                    <span>: {item.metodePencairan}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Bank</span>
                    <span>: {item.bank}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>No Rekening</span>
                    <span>: {item.nomorRekening}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Nama Pemilik Rekening</span>
                    <span>: {item.namaPemilikRekening}</span>
                </div>
            </CardContent>

            <CardContent className="flex flex-col gap-2">
                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>No Dokumen</span>
                    <span>: {item.noDokumen}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Tanggal Transaksi</span>
                    <span>: {item.tanggalTransaksi.toLocaleDateString()}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Tanggal Jatuh Tempo</span>
                    <span>: {item.tanggalJatuhTempo.toLocaleDateString()}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Nilai Pinjaman</span>
                    <span>: {formatRupiah(item.nilaiPinjaman)}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Biaya Perawatan</span>
                    <span>: {formatRupiah(item.biayaPerawatan)}</span>
                </div>

                <div className="grid grid-cols-[220px_1fr] gap-x-2">
                    <span>Nominal Ditransfer</span>
                    <span>: {formatRupiah(item.nominalDitransfer)}</span>
                </div>
            </CardContent>
        </Card>
    ))
}