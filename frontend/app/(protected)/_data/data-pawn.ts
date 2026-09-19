// status di pawn
export type PawnStatus =
   | "approved"
   | "cancel"
   | "created"
   | "disbursed" // ini buat dua duanya baik diatas atau dibawah 20 juta
   | "done"
   | "processing" // ini processing yang dari  midtrans jadi iris nya ngelempar status processing ini
   | "ready_disburse" // ini di atas 20 juta atau 15 gitu dan kalau udah acc dari finance
   | "rejected"
   | "resell"
   | "waiting_approval";

// status notification buat di due-date list
export type PawnStatusNotification =
   | "bayar_sebagian"
   | "akan_lunas"
   | "tanpa_status"
   | "gadai_ulang" 
   | "tidak_akan_lunas"

export interface Pawn {
   id: number;
   type: string;
   applicationNumber: string;
   pawnNumber: string;
   oldApplication: string;
   dibuatOleh: string;
   status: PawnStatus;
   brand: string;
   paymentMethod: string;
   disbursementType: string;
   storeId: string;
   usersId: string;

   customerId: number;
   customerData: unknown | null;
   newPawnId: number | null;
   isNewJ2c: boolean;
   isRestock: boolean;
   isTakeOver: boolean;
   isGadaiResell: boolean;
   statusNotification: string | null;

   barangCodes: string[];
   totalAppraisalPrice: number;
   totalMaximumLoan: number;
   nilaiPinjaman: number;
   disburseNominal: number;
   idPawnTenor: string;
   tenor: number;
   biayaAdmin: number;
   interestPercentage: number;
   interestNominal: number;
   repaymentNominal: number;
   interestRepaymentPercentage: number | null;
   interestRepaymentNominal: number | null;
   penaltyNominal: number;
   storageInsuranceFeePercentage: number;
   storageInsuranceFeeNominal: number;
   persentaseBiayaPerawatan: number;
   goldRate: number | null;
   tanggalTransaksi: Date;
   dueDate: Date | null;
   lastSaleDate: Date | null;
   topupDate: Date | null;

   pawnDoneDate: Date | null;
   pawnDoneBy: string | null;
   draftName: string | null;
   customerCurrentId: string | null;
   customerSgkId: string | null;
   requestDiscountId: string | null;

   document: string | null;
   remark: string | null;
   appraisal: number | null;
   approvedAt: Date | null;
   approvedBy: string | null;
   approveNote: string | null;
   rejectedAt: Date | null;
   rejectedBy: string | null;
   completedDocumentAt: Date | null;
   completedDocumentBy: string | null;
   reviewedFinanceAt: Date | null;
   reviewedFinanceBy: string | null;
   disbursedBy: string | null;
   disbursedAt: Date | null;
   resellAt: Date | null;
   resellBy: string | null;
   reason: string | null;
   updatedStatusAt: Date | null;

   bankId: number;
   metodePencairan: string;
   nomorRekening: string;
   namaPemilikRekening: string;
   bankBranch: string;

   applicationFormPhoto: string | null;
   pawnFormPhoto: string | null;
   sbgFormPhoto: string | null; // surat bukti gadai
   suratKuasaPhoto: string | null;
   sealFormPhoto: string | null;
   sealedProductPhoto: string | null;
   invoice: string | null;
   suratsegel: string | null;
   irisReferenceNumber: string | null;
   jsonRequestPaid: unknown | null;
   jsonResponsePaid: unknown | null;
   nominalPelunasan: number | null;
   buktiTransferPelunasan: string | null;

   generateCode: string | null;
   noReferensi: string | null;
   referenceById: string | null;
   responseStatus: string | null;
   responseCmkapi: unknown | null;

   createdAt: Date;
   createdBy: string;
   updatedAt: Date | null;
   deletedAt: Date | null;
   stampsCustomerId: string | null;
   draftData?: any;
}

const emptyPawnFields = {
   oldApplication: "-",
   brand: "J2C",
   paymentMethod: "Transfer",
   disbursementType: "Transfer",
   storeId: "STORE-C",
   usersId: "JR-C",
   customerData: null,
   newPawnId: null,
   isNewJ2c: false,
   isRestock: false,
   isTakeOver: false,
   isGadaiResell: false,
   totalAppraisalPrice: 0,
   totalMaximumLoan: 0,
   disburseNominal: 0,
   interestPercentage: 0,
   interestNominal: 0,
   repaymentNominal: 0,
   interestRepaymentPercentage: null,
   interestRepaymentNominal: null,
   penaltyNominal: 0,
   storageInsuranceFeeNominal: 0,
   persentaseBiayaPerawatan: 0,
   goldRate: null,
   dueDate: null,
   lastSaleDate: null,
   topupDate: null,
   pawnDoneDate: null,
   pawnDoneBy: null,
   draftName: null,
   customerCurrentId: null,
   customerSgkId: null,
   requestDiscountId: null,
   document: null,
   approveNote: null,
   rejectedAt: null,
   rejectedBy: null,
   completedDocumentAt: null,
   completedDocumentBy: null,
   reviewedFinanceAt: null,
   reviewedFinanceBy: null,
   disbursedBy: null,
   disbursedAt: null,
   resellAt: null,
   resellBy: null,
   reason: null,
   updatedStatusAt: null,
   bankBranch: "-",
   applicationFormPhoto: null,
   pawnFormPhoto: null,
   sbgFormPhoto: null,
   suratKuasaPhoto: null,
   sealFormPhoto: null,
   sealedProductPhoto: null,
   invoice: null,
   suratsegel: null,
   irisReferenceNumber: null,
   jsonRequestPaid: null,
   jsonResponsePaid: null,
   nominalPelunasan: null,
   buktiTransferPelunasan: null,
   generateCode: null,
   noReferensi: null,
   referenceById: null,
   responseStatus: null,
   responseCmkapi: null,
   updatedAt: null,
   deletedAt: null,
   stampsCustomerId: null,
} satisfies Partial<Pawn>;


