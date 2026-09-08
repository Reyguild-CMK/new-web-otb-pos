import { dataBank } from "./data-bank";
import { dataCustomer } from "./data-customer";
import { dataBarang, type Barang } from "./barang-data";
import { pawnData, type Pawn } from "./data-pawn";

export interface Disbursed extends Pawn{
    customer: (typeof dataCustomer)[number];
    bank: (typeof dataBank)[number];
    barang: Barang[];
    // // Document Proposal ada di data-pawn
    // applicationNumber: string,
    // metodePencairan: string,
    // createdAt: Date,
    // createdBy: string,
    // approvedAt: Date,
    // approvedBy: string,
    // oldDoc: string,
    // // Detail Pinjaman data customer ada di data-pawn
    // nilaiPinjaman: number,
    // tenor: string,
    // tanggalTransaksi: Date,
    // jatuhTempo: Date,
    // biayaPerawatan: number,
    // // Customer Detail ini ada di data-customer
    // idNumber: number,
    // nama: string,
    // birthday: Date,
    // address: string,
    // handphone: number,
    // email: string,
    // occupation: string,
    // maritalStatus: string,
    // // Bank Information
     
}

export function getDisbursed(applicationNumber: string): Disbursed | undefined{
    const pawn = pawnData.find(
        (item) => item.applicationNumber === applicationNumber
    );
    if (!pawn){
        return undefined;
    }
    const customer = dataCustomer.find(
        (item) => String(item.idNumber) === pawn.customerId
    );
    const barang = dataBarang.filter(
        (item) => pawn.barangCodes.includes(item.kode)
    );
    const bank = dataBank.find(
        (item) => item.id === pawn.bankId
    );
    if (!customer || !bank){
        return undefined
    } 
    return { ...pawn, customer, bank, barang };
}