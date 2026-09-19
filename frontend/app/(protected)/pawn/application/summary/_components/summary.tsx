// Component
import { Card, CardContent } from "@/components/ui/card"

// Library
import { formatRupiah } from "@/lib/currency"
import { dataBank } from "@/app/(protected)/_data/data-bank"

interface SummaryProps {
    data: any; // data from loanDetails
}

export function Summary({ data }: SummaryProps) {
    const style_grid_summary = "grid lg:grid-cols-[220px_1fr] md:grid-cols-[220px_1fr] sm:grid-cols-[200px_1fr] grid-cols-[160px_1fr] gap-x-2"

    const bankName = dataBank.find(b => String(b.id) === data?.bankId)?.name || "-";

    const txDate = data?.tanggalTransaksi ? new Date(data.tanggalTransaksi) : new Date();
    const yy = String(txDate.getFullYear()).slice(-2);
    const mm = String(txDate.getMonth() + 1).padStart(2, '0');
    const dd = String(txDate.getDate()).padStart(2, '0');
    const defaultAppNumber = `J2CE34${yy}${mm}${dd}0001`;
    const appNumber = data?.applicationNumber || defaultAppNumber;

    return (
        <Card
            className="grid grid-cols-1 gap-6 rounded-none border-x-0 border-y p-2 ring-0 shadow-none bg-transparent lg:grid-cols-2 text-xs md:text-sm"
        >
            <CardContent className="flex flex-col gap-3 md:gap-4 p-0 md:p-2">
                <div className={`${style_grid_summary}`}>
                    <span>Tenor</span>
                    <span>: {data?.tenor || 0} Days</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Persentase Biaya Perawatan</span>
                    <span>: {`${((data?.persentaseBiayaPerawatan || 0) * 100).toFixed(2)}%`}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Metode Pencairan</span>
                    <span>: {data?.bankId ? "Transfer" : "-"}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Bank</span>
                    <span>: {bankName}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>No Rekening</span>
                    <span>: {data?.nomorRekening || "-"}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Nama Pemilik Rekening</span>
                    <span>: {data?.namaPemilikRekening || "-"}</span>
                </div>
            </CardContent>

            <CardContent className="flex flex-col gap-3 md:gap-4 p-0 md:p-2">
                <div className={`${style_grid_summary}`}>
                    <span>No Dokumen</span>
                    <span>: {appNumber}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Tanggal Transaksi</span>
                    <span>: {data?.tanggalTransaksi || "-"}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Tanggal Jatuh Tempo</span>
                    <span>: {data?.tanggalJatuhTempo || "-"}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Nilai Pinjaman</span>
                    <span>: {formatRupiah(data?.nilaiPinjaman || 0)}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Biaya Perawatan</span>
                    <span>: {formatRupiah(data?.biayaPerawatan || 0)}</span>
                </div>

                <div className={`${style_grid_summary}`}>
                    <span>Nominal Ditransfer</span>
                    <span>: {formatRupiah(data?.totalNilaiPinjaman || data?.nominalDitransfer || 0)}</span>
                </div>
            </CardContent>
        </Card>
    )
}