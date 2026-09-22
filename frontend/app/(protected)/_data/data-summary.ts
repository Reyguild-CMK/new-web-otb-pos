// Data Bank
import { dataBank } from "./data-bank";
// Data Barang
import { dataBarang, type Barang } from "./barang-data";
import { dataCustomer, type Customer } from "./data-customer";
import { type Pawn } from "./data-pawn";
import { pawnData } from "./data-pawn-dummy";
import { tenor, type Tenor } from "./data-tenor";
import { dataPawnItems, type PawnItem } from "./data-pawn-item";
import { dataPawnItemType, type PawnItemType } from "./data-pawn-item-type";
import { dataDocs, type Docs } from "./data-docs";
import { dataPawnHistory, type PawnHistory } from "./data-pawn-history";

export interface PawnSummary extends Pawn {
    customer: Customer;
    barang: Barang[];
    bankName: string;
    tenordata: Tenor;
    jatuhTempo: Date;
    biayaPerawatan: number;
    nominalDitransfer: number;
    pawnItems: PawnItemSummary[];
    pawnDocs: Docs | null;
    pawnHistory: PawnHistory[];
}

export interface PawnItemSummary extends PawnItem {
    itemType: PawnItemType | null;
}

export function getPawnSummary(pawn: Pawn): PawnSummary | undefined {
    if (!pawn) {
        return undefined;
    }

    let customer = dataCustomer.find((item) => item.id === pawn.customerId);

    if (!customer && pawn.draftData?.customerData) {
        const draft = pawn.draftData.customerData;
        customer = {
            id: 0,
            name: draft.name || "-",
            tanggal_lahir: draft.birthDate || null,
            address: draft.address || "-",
            handphone: draft.handphone || "-",
            email: draft.email || null,
            profesi: draft.occupation || null,
            status_perkawinan: draft.maritalStatus || null,
            tanda_pengenal: draft.ktpNumber || "-",
            image_tanda_pengenal: "",
            image_selfie: "",
            created_at: null,
            deleted_at: null,
            NoCustomer: "",
            IDCustomerStamps: null
        } as any;
    }
    if (!customer) {
        customer = {
            id: 0,
            name: "-",
            tanggal_lahir: null,
            address: "-",
            handphone: "-",
            email: null,
            profesi: null,
            status_perkawinan: null,
            tanda_pengenal: "-",
            image_tanda_pengenal: "",
            image_selfie: "",
            created_at: null,
            deleted_at: null,
            NoCustomer: "",
            IDCustomerStamps: null
        } as any;
    }
    const bank = dataBank.find((item) => item.id === pawn.bankId) || { id: 0, name: "-", image: "" };
    const barang = dataBarang.filter((item) => pawn.barangCodes.includes(item.kode));
    const pawnTenor = tenor.find((item) => item.id === pawn.idPawnTenor) || { id: "", tenor: 0, type: "days" };

    const storedPawnItems: PawnItemSummary[] = dataPawnItems
        .filter((item) => item.pawn_id === pawn.id)
        .map((item) => ({
            ...item,
            itemType:
                dataPawnItemType.find(
                    (itemType) => itemType.id === item.pawn_item_type_id
                ) ?? null,
        }));

    const pawnItems = storedPawnItems.length > 0
        ? storedPawnItems
        : pawn.draftData?.pawnItems ?? [];

    const pawnHistory = dataPawnHistory.filter(
        (history) => history.pawn_id === pawn.id
    );

    const pawnDocs =
        dataDocs.find((item) => item.pawn_id === pawn.id) ??
        pawn.draftData?.pawnDocs ??
        null;

    // We no longer return undefined here so that drafts and incomplete transactions still appear in the list

    const jatuhTempo = calculateDueData(
        pawn.tanggalTransaksi,
        pawnTenor.tenor
    );
    const biayaPerawatan =
        pawn.draftData?.loanDetails?.biayaPerawatan ??
        pawn.nilaiPinjaman * pawn.persentaseBiayaPerawatan;

    return {
        ...pawn,
        customer,
        barang,
        bankName: bank.name,
        tenordata: pawnTenor,
        jatuhTempo,
        biayaPerawatan,
        nominalDitransfer: pawn.nilaiPinjaman - biayaPerawatan - pawn.biayaAdmin,
        pawnItems,
        pawnDocs,
        pawnHistory
    };
}


export function filterPawnSummarybyDate(tanggalTransaksi: Date): PawnSummary[] {
    return pawnData.filter(
        (item) => item.tanggalTransaksi.getTime() === tanggalTransaksi.getTime()
    )
        .map((pawn) => getPawnSummary(pawn))
        .filter((item): item is PawnSummary => item !== undefined);
}

export function calculateDueData(
    tanggalTransaksi: Date,
    tenor: number
): Date {
    const dueDate = new Date(tanggalTransaksi);
    dueDate.setDate(dueDate.getDate() + tenor);

    return dueDate;
}