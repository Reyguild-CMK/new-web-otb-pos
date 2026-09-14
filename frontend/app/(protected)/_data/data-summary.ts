// Data Bank
import { dataBank } from "./data-bank";
// Data Barang
import { dataBarang, type Barang } from "./barang-data";
import { dataCustomer, type Customer } from "./data-customer";
import { pawnData, type Pawn } from "./data-pawn";
import { tenor, type Tenor } from "./data-tenor";
import { dataPawnItems, type PawnItem } from "./data-pawn-item";
import { dataPawnItemType, type PawnItemType } from "./data-pawn-item-type";
import { dataDocs, type Docs } from "./data-docs";

export interface PawnSummary extends Pawn{
    customer: Customer;
    barang: Barang[];
    bankName: string;
    tenordata: Tenor;
    jatuhTempo: Date;
    biayaPerawatan: number;
    nominalDitransfer: number;
    pawnItems: PawnItemSummary[];
    pawnDocs: Docs | null;
}

export interface PawnItemSummary extends PawnItem{
    itemType: PawnItemType | null;
}

export function getPawnSummary(id: number): PawnSummary | undefined {
    const pawn = pawnData.find((item) => item.id === id);
    if (!pawn){
        return undefined;
    }

    const customer = dataCustomer.find((item) => (item.id) === pawn.customerId);
    const bank = dataBank.find((item)=> item.id ===pawn.bankId);
    const barang = dataBarang.filter((item)=> pawn.barangCodes.includes(item.kode))
    
    const pawnTenor = tenor.find((item)=>item.id===pawn.idPawnTenor);

    const pawnItems: PawnItemSummary[] = dataPawnItems
        .filter((item) => item.pawn_id === pawn.id)
        .map((item) => ({
            ...item,
            itemType:
                dataPawnItemType.find(
                    (itemType) => itemType.id === item.pawn_item_type_id
                ) ?? null,
        }));

    const pawnDocs = dataDocs.find((item) => item.pawn_id === pawn.id) ?? null;
    
    if (!customer || !bank || !pawnTenor){
        return undefined;
    }

    const jatuhTempo = calculateDueData(
        pawn.tanggalTransaksi,
        pawnTenor.tenor
    );

    const biayaPerawatan = pawn.nilaiPinjaman * pawn.persentaseBiayaPerawatan;

    return{
        ...pawn,
        customer,
        barang,
        bankName: bank.name,
        tenordata: pawnTenor,
        jatuhTempo,
        biayaPerawatan,
        nominalDitransfer: pawn.nilaiPinjaman - biayaPerawatan - pawn.biayaAdmin,
        pawnItems,
        pawnDocs
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
                (item) => (item.id) === pawn.customerId
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

export function calculateDueData(
  tanggalTransaksi: Date, 
  tenor: number
): Date{
  const dueDate = new Date(tanggalTransaksi);
  dueDate.setDate(dueDate.getDate()+tenor);

  return dueDate;
}