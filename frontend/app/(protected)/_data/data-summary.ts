import { dataBank } from "./data-bank";
import { dataBarang, type Barang } from "./barang-data";
import { dataCustomer } from "./data-customer";
import { pawnData, type Pawn } from "./data-pawn";

export interface PawnSummary extends Pawn{
    customer: (typeof dataCustomer)[number];
    barang: Barang[];
    bankName: string;
    persentaseBiayaPerawatan: string;
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
    const persentaseBiayaPerawatan = pawn.persentaseBiayaPerawatan
    if (!customer || !bank){
        return undefined;
    }
    return{
        ...pawn,
        customer,
        barang,
        bankName: bank.name,
        persentaseBiayaPerawatan,
        nominalDitransfer: pawn.nilaiPinjaman - pawn.biayaPerawatan,
    };
}