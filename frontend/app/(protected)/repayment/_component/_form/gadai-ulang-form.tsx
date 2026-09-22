"use client"
import { differenceInDays, parseISO } from 'date-fns';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PawnSummary } from "@/app/(protected)/_data/data-summary"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CurrencyInput } from '@/components/ui/currency-input';
import { formatRupiah } from '@/lib/currency';
import { createRepaymentSchema, type RepaymentFormValues } from '../../_lib/repayment-schema';

interface GadaiUlangRepaymentFormProps{
    data: PawnSummary;
    formId: string;
    onSubmit: (data: RepaymentFormValues) => void;
}

export function GadaiUlangRepaymentForm({data, formId, onSubmit}: GadaiUlangRepaymentFormProps){
    // untuk hitung pemakaian
    const pemakaianHari = differenceInDays(new Date(), parseISO(data.tanggalTransaksi.toLocaleDateString("id-ID")));
    const total = data.biayaAdmin + data.biayaPerawatan;
    const form = useForm<RepaymentFormValues>({
        resolver: zodResolver(createRepaymentSchema(total)) as never,
        defaultValues: { nominal: "", buktiTransaksi: null },
    });
    const { control, handleSubmit, formState: { errors } } = form;
    
    return(
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
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
                        <span>: {formatRupiah(data.nilaiPinjaman)}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Biaya Administrasi & Penyimpanan</span>
                        <span>: {formatRupiah(total)}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <span>Total</span>
                        <span>: {formatRupiah(total)}</span>
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
                        <Controller
                            name="nominal"
                            control={control}
                            render={({ field }) => (
                                <CurrencyInput value={field.value} onValueChange={field.onChange} placeholder="Nominal" className="w-full rounded-md border px-3 py-2" />
                            )}
                        />
                        {errors.nominal && <p className="text-sm text-destructive">{errors.nominal.message}</p>}
                    </div>
                    <div>
                        <Label className='mb-2 block text-xs'>Bukti Transfer</Label>
                        <Controller
                            name="buktiTransaksi"
                            control={control}
                            render={({ field: { onChange, name, ref } }) => (
                                <Input
                                    ref={ref}
                                    name={name}
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => onChange(event.target.files?.[0] ?? null)}
                                />
                            )}
                        />
                        {errors.buktiTransaksi && <p className="text-sm text-destructive">{errors.buktiTransaksi.message}</p>}
                    </div>
                </div>
            </div>
        </form>
    )
}