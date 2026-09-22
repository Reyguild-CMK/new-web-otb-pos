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

export const pawnData: Pawn[] = [
   {
      ...emptyPawnFields,
      id: 1,
      type: "J2C",
      applicationNumber: "J2CE432608310001",
      pawnNumber: "PWN-260901-0001",
      dibuatOleh: "JR CMK",
      status: "created",
      customerId: 1,
      barangCodes: ["ITEM-260901-0001"],
      totalAppraisalPrice: 9835366,
      totalMaximumLoan: 8851829,
      nilaiPinjaman: 17522375,
      disburseNominal: 0,
      idPawnTenor: "1",
      tenor: 120,
      biayaAdmin: 35000,
      storageInsuranceFeePercentage: 0.06,
      persentaseBiayaPerawatan: 0.06,
      tanggalTransaksi: new Date("2023-03-05T00:00:00"),
      statusNotification: null,
      remark: null,
      appraisal: null,
      bankId: 1,
      metodePencairan: "Transfer",
      nomorRekening: "0011223344",
      namaPemilikRekening: "BCA Simulator A",
      createdAt: new Date("2023-03-05T00:00:00"),
      createdBy: "JR CMK C",
      approvedAt: null,
      approvedBy: null,
   },
   {
      ...emptyPawnFields,
      id: 2,
      type: "J2C",
      applicationNumber: "J2CE432608310002",
      pawnNumber: "PWN-260901-0002",
      dibuatOleh: "JR CMK",
      status: "waiting_approval",
      customerId: 2,
      barangCodes: ["ITEM-260901-0001"],
      totalAppraisalPrice: 9835366,
      totalMaximumLoan: 8851829,
      nilaiPinjaman: 10000000,
      disburseNominal: 0,
      idPawnTenor: "1",
      tenor: 120,
      biayaAdmin: 35000,
      storageInsuranceFeePercentage: 0.06,
      persentaseBiayaPerawatan: 0.06,
      statusNotification: null,
      tanggalTransaksi: new Date("2026-09-10T00:00:00"),
      remark: null,
      appraisal: null,
      bankId: 2,
      metodePencairan: "Transfer",
      nomorRekening: "0099887766",
      namaPemilikRekening: "Bank Simulator A",
      createdAt: new Date("2026-09-09T00:00:00"),
      createdBy: "JR CMK A",
      approvedAt: null,
      approvedBy: null,
   },
   {
      ...emptyPawnFields,
      id: 3,
      type: "J2C",
      applicationNumber: "J2CE432608310003",
      pawnNumber: "PWN-260901-0003",
      dibuatOleh: "JR CMK",
      status: "done",
      customerId: 3,
      barangCodes: ["ITEM-260901-0001"],
      totalAppraisalPrice: 9835366,
      totalMaximumLoan: 8851829,
      nilaiPinjaman: 1808388,
      disburseNominal: 1699884,
      idPawnTenor: "1",
      tenor: 120,
      biayaAdmin: 0,
      storageInsuranceFeePercentage: 0.06,
      persentaseBiayaPerawatan: 0.06,
      statusNotification: null,
      tanggalTransaksi: new Date("2026-01-08T00:00:00"),
      remark: null,
      appraisal: null,
      bankId: 1,
      metodePencairan: "Transfer",
      nomorRekening: "0011223344",
      namaPemilikRekening: "BCA Simulator A",
      createdAt: new Date("2026-01-08T00:00:00"),
      createdBy: "JR Transaction C",
      approvedAt: new Date("2026-01-08T10:30:00"),
      approvedBy: "Store Manager C",
   },
   {
      ...emptyPawnFields,
      id: 4,
      type: "J2C",
      applicationNumber: "J2CE432608310004",
      pawnNumber: "PWN-260901-0004",
      dibuatOleh: "JR CMK",
      status: "disbursed",
      customerId: 4,
      barangCodes: ["ITEM-260901-0001"],
      totalAppraisalPrice: 5726000,
      totalMaximumLoan: 8851829,
      nilaiPinjaman: 2178838,
      disburseNominal: 2043838,
      idPawnTenor: "1",
      tenor: 120,
      biayaAdmin: 35000,
      storageInsuranceFeePercentage: 0.06,
      persentaseBiayaPerawatan: 0.06,
      statusNotification: "gadai_ulang",
      tanggalTransaksi: new Date("2023-03-04T00:00:00"),
      remark: "Condition: Excellent",
      appraisal: 5726000,
      bankId: 2,
      metodePencairan: "Transfer",
      nomorRekening: "0011223344",
      namaPemilikRekening: "BCA Simulator A",
      createdAt: new Date("2023-03-03T00:00:00"),
      createdBy: "JR Transaction C",
      approvedAt: new Date("2023-03-05T00:00:00"),
      approvedBy: "Store Manager C",
      invoice: "/image/bg-login.jpg",
      suratsegel: "/image/bg-login.jpg",
      disbursedBy: "Finance C",
      disbursedAt: new Date("2023-03-05T11:00:00"),
   },
   {
      ...emptyPawnFields,
      id: 5,
      type: "J2C",
      applicationNumber: "J2CE432608310005",
      pawnNumber: "PWN-260901-0005",
      dibuatOleh: "JR CMK",
      status: "disbursed",
      customerId: 5,
      barangCodes: ["ITEM-260901-0001"],
      totalAppraisalPrice: 5726000,
      totalMaximumLoan: 8851829,
      nilaiPinjaman: 2178838,
      disburseNominal: 2043838,
      idPawnTenor: "1",
      tenor: 120,
      biayaAdmin: 35000,
      storageInsuranceFeePercentage: 0.06,
      persentaseBiayaPerawatan: 0.06,
      statusNotification: "akan_lunas",
      tanggalTransaksi: new Date("2023-03-04T00:00:00"),
      remark: "Condition: Excellent",
      appraisal: 5726000,
      bankId: 2,
      metodePencairan: "Transfer",
      nomorRekening: "0011223344",
      namaPemilikRekening: "BCA Simulator A",
      createdAt: new Date("2023-03-03T00:00:00"),
      createdBy: "JR Transaction C",
      approvedAt: new Date("2023-03-05T00:00:00"),
      approvedBy: "Store Manager C",
   },
   {
      ...emptyPawnFields,
      id: 6,
      type: "J2C",
      applicationNumber: "J2CE432608310006",
      pawnNumber: "PWN-260901-0006",
      dibuatOleh: "JR CMK",
      status: "disbursed",
      customerId: 6,
      barangCodes: ["ITEM-260901-0001"],
      totalAppraisalPrice: 7000000,
      totalMaximumLoan: 5600000,
      nilaiPinjaman: 2500000,
      disburseNominal: 2350000,
      idPawnTenor: "1",
      tenor: 120,
      biayaAdmin: 35000,
      storageInsuranceFeePercentage: 0.06,
      persentaseBiayaPerawatan: 0.06,
      tanggalTransaksi: new Date("2026-08-01T00:00:00"),
      statusNotification: "gadai_ulang",
      remark: "Test gadai ulang tanpa pending history",
      appraisal: 7000000,
      bankId: 1,
      metodePencairan: "Transfer",
      nomorRekening: "111122223333",
      namaPemilikRekening: "Test Gadai Ulang Baru",
      createdAt: new Date("2026-08-01T00:00:00"),
      createdBy: "Test User",
      approvedAt: new Date("2026-08-01T10:00:00"),
      approvedBy: "Store Manager",
   },
   {
      ...emptyPawnFields,
      id: 7,
      type: "J2C",
      applicationNumber: "J2CE432608310007",
      pawnNumber: "PWN-260901-0007",
      dibuatOleh: "JR CMK",
      status: "disbursed",
      customerId: 7,
      barangCodes: ["ITEM-260901-0001"],
      totalAppraisalPrice: 9000000,
      totalMaximumLoan: 7200000,
      nilaiPinjaman: 4000000,
      disburseNominal: 3800000,
      idPawnTenor: "1",
      tenor: 120,
      biayaAdmin: 35000,
      storageInsuranceFeePercentage: 0.06,
      persentaseBiayaPerawatan: 0.06,
      tanggalTransaksi: new Date("2026-07-15T00:00:00"),
      statusNotification: "akan_lunas",
      remark: "Test akan lunas",
      appraisal: 9000000,
      bankId: 2,
      metodePencairan: "Transfer",
      nomorRekening: "222233334444",
      namaPemilikRekening: "Test Akan Lunas",
      createdAt: new Date("2026-07-15T00:00:00"),
      createdBy: "Test User",
      approvedAt: new Date("2026-07-15T10:00:00"),
      approvedBy: "Store Manager",
   },
   {
      ...emptyPawnFields,
      id: 8,
      type: "J2C",
      applicationNumber: "J2CE432608310008",
      pawnNumber: "PWN-260901-0008",
      dibuatOleh: "JR CMK",
      status: "disbursed",
      customerId: 8,
      barangCodes: ["ITEM-260901-0001"],
      totalAppraisalPrice: 5000000,
      totalMaximumLoan: 4000000,
      nilaiPinjaman: 1800000,
      disburseNominal: 1700000,
      idPawnTenor: "1",
      tenor: 120,
      biayaAdmin: 25000,
      storageInsuranceFeePercentage: 0.06,
      persentaseBiayaPerawatan: 0.06,
      tanggalTransaksi: new Date("2026-08-15T00:00:00"),
      statusNotification: "tanpa_status",
      remark: "Test tanpa status",
      appraisal: 5000000,
      bankId: 1,
      metodePencairan: "Transfer",
      nomorRekening: "333344445555",
      namaPemilikRekening: "Test Tanpa Status",
      createdAt: new Date("2026-08-15T00:00:00"),
      createdBy: "Test User",
      approvedAt: new Date("2026-08-15T10:00:00"),
      approvedBy: "Store Manager",
   },
];
