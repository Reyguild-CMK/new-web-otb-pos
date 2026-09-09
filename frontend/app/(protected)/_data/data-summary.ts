// Data Bank
import { dataBank } from "./data-bank";
// Data Barang
import { dataBarang, type Barang } from "./barang-data";
// Data Customer
import { dataCustomer } from "./data-customer";
// Data Pinjaman (Pawn) & Interface Pawn
import { pawnData, type Pawn } from "./data-pawn";

export interface PawnSummary extends Pawn{
    customer: (typeof dataCustomer)[number];
    barang: Barang[];
    bankName: string;
    jatuhTempo: Date;
    biayaPerawatan: number;
    nominalDitransfer: number;
}

export function getPawnSummary(applicationNumber: string): PawnSummary | undefined {
    const pawn = pawnData.find((item) => item.applicationNumber === applicationNumber);
    if (!pawn){
        return undefined;
    }

    const customer = dataCustomer.find((item) => String(item.idNumber) === pawn.customerId);
    const bank = dataBank.find((item)=> item.id ===pawn.bankId);
    const barang = dataBarang.filter((item)=> pawn.barangCodes.includes(item.kode))
    
    const jatuhTempo = new Date(pawn.tanggalTransaksi);
    jatuhTempo.setDate(jatuhTempo.getDate() + pawn.tenor);

    const biayaPerawatan = pawn.nilaiPinjaman * pawn.persentaseBiayaPerawatan;

    if (!customer || !bank){
        return undefined;
    }
    return{
        ...pawn,
        customer,
        barang,
        bankName: bank.name,
        jatuhTempo,
        biayaPerawatan,
        nominalDitransfer: pawn.nilaiPinjaman - biayaPerawatan - pawn.biayaAdmin,
    };
}


export function filterPawnSummarybyDate(tanggalTransaksi: Date): PawnSummary[]{
    const pawn = pawnData.filter(
        (item) => item.tanggalTransaksi.getTime() === tanggalTransaksi.getTime()
    );

    return(
        pawn.map((pawn, index) =>{
            // Cari dataCustomer yang id-nya = pawn.customerId
            const customer = dataCustomer.find(
                (item) => String(item.idNumber) === pawn.customerId
            );

            // Cari dataBank yang id-nya = pawn.bankId
            const bank = dataBank.find(
                (item) => item.id === pawn.bankId
            );

            // Filter dataBarang yang kodenya ada pada pawn.barangCodes
            const barang = dataBarang.filter(
                (item) => pawn.barangCodes.includes(item.kode)
            )

            const jatuhTempo = new Date(pawn.tanggalTransaksi);
            jatuhTempo.setDate(jatuhTempo.getDate() + pawn.tenor);

            const biayaPerawatan = Math.round(pawn.nilaiPinjaman * pawn.persentaseBiayaPerawatan);

            // Undefined jika tidak ada data customer atau data bank
            if (!customer || !bank) {
                return undefined;
            }

            return{
                ...pawn,
                customer,
                barang,
                bankName: bank.name,
                jatuhTempo,
                biayaPerawatan,
                nominalDitransfer: pawn.nilaiPinjaman - biayaPerawatan - pawn.biayaAdmin,
            };
        }).filter((item): item is PawnSummary => item !== undefined)
    )
}