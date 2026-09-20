"use client"
import { differenceInDays, parseISO } from 'date-fns';
import { PawnSummary } from "@/app/(protected)/_data/data-summary"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CurrencyInput } from '@/components/ui/currency-input';

interface GadaiUlangRepaymentFormProps{
    data: PawnSummary;
    transferNominal: string;
    onTransferNominalChange: (value: string) => void;
    onTransferProofChange: (file: File | null) => void;
}

export function GadaiUlangRepaymentForm({data, transferNominal, onTransferNominalChange, onTransferProofChange}: GadaiUlangRepaymentFormProps){
    // untuk hitung pemakaian
    const pemakaianHari = differenceInDays(new Date(), parseISO(data.tanggalTransaksi.toLocaleDateString("id-ID")));
    const total = data.biayaAdmin + data.biayaPerawatan
    
    return(
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
                <div className="rounded-md border p-4">
                    Mohon hubungi ibu Meilisa untuk pembayaran
                </div>
            </div>
            {/* Informasi */}
            <div className="col-span-12 md:col-span-7">
                <h3 className="mb-4 text-sm font-semibold"> Informasi #{data.applicationNumber}</h3>
                <div className="space-y-3">
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Customer</span>
                        <span>: {data.customer.name}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Kontak</span>
                        <span>: {data.customer.handphone} {data.customer.email && (<>
                            <br />
                            {data.customer.email}</>
                            )} 
                        </span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Jatuh Tempo</span>
                        <span>: {data.jatuhTempo.toLocaleDateString("id-ID")}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Pemakaian</span>
                        <span>: {pemakaianHari}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Pinjaman</span>
                        <span>: {data.nilaiPinjaman}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Biaya Administrasi & Penyimpanan</span>
                        <span>: {total}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Total</span>
                        <span>: {total}</span>
                    </div>
                </div>
            </div>
            
            {/* Document Form */}
            <div className="col-span-12 md:col-span-5">
                <h3 className='mb-4 text-sm font-semibold'>Document Form</h3>
                <div className='space-y-4 rounded-lg border p-4'>
                    <div>
                        <Label className='mb-2 block text-xs'>
                            Transfer Nominal
                        </Label>
                        <CurrencyInput
                            value={transferNominal}
                            onValueChange={onTransferNominalChange}
                            placeholder="Nominal"
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>
                    <div>
                        <Label className='mb-2 block text-xs'>Bukti Transfer</Label>
                        <Input type='file' accept='image/*' onChange={(event) => onTransferProofChange(event.target.files?.[0] ?? null)}></Input>
                    </div>
                </div>
            </div>
        </div>
    )
}