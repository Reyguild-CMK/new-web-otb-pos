export interface Pawn {
   no: string;
   type: string;
   applicationNumber: string;
   oldApplication: string;
   dibuatOleh: string;
   status: string; //open, waiting_approval, approved, disbursed,
   nilaiPinjaman: number;
   tenor: number;
   tanggalTransaksi: Date;
   // biayaPerawatan otomatis di getPawnSummary;
   // jatuhTempo otomatis di getPawnSummary;
   biayaAdmin: number;
   persentaseBiayaPerawatan: number;

   customerId: string;
   barangCodes: string[];
   bankId: number;
   metodePencairan: string;
   nomorRekening: string;
   namaPemilikRekening: string;
}

// Data Dummy
export const pawnData: Pawn[] =[
   {
      no:"1",
      type:"J2C",
      applicationNumber:"J2CE432608310001",
      oldApplication:"-",
      dibuatOleh:"JR CMK",
      status:"open",

      
      nilaiPinjaman: 17522375,
      tenor: 120,
      tanggalTransaksi: new Date("2023-03-05"),
      biayaAdmin:35000,
      persentaseBiayaPerawatan: 0.06,

      customerId: "1234567891011121",
      barangCodes: ["ITEM-260901-0001"],
      bankId: 1,
      metodePencairan: "Transfer",
      nomorRekening: "0011223344",
      namaPemilikRekening: "BCA Simulator A"
   },
   // {
   //    no:"2",
   //    type:"J2C",
   //    applicationNumber:"J2CE432608310002",
   //    oldApplication:"-",
   //    jatuhTempo:"23 Dec 2019",
   //    dibuatOleh:"JR CMK",
   //    status:"waiting_approval",
   // },
   // {
   //    no:"3",
   //    type:"J2C",
   //    applicationNumber:"J2CE432608310003",
   //    oldApplication:"-",
   //    jatuhTempo:"23 Dec 2019",
   //    dibuatOleh:"JR CMK",
   //    status:"approved"
   // },
   {
      no:"4",
      type:"J2C",
      applicationNumber:"J2CE432608310004",
      oldApplication:"-",
      dibuatOleh:"JR CMK",
      status:"disbursed",

      nilaiPinjaman: 2178838,
      tenor: 120,
      tanggalTransaksi: new Date("2023-03-04"),
      // biayaPerawatan: 130731,
      biayaAdmin:35000,
      persentaseBiayaPerawatan: 0.06,

      customerId: "1234567891012131",
      barangCodes: ["ITEM-260901-0001"],
      bankId: 2,
      metodePencairan: "Transfer",
      nomorRekening: "0011223344",
      namaPemilikRekening: "BCA Simulator A"
   }
   // {
   //    no:"5",
   //    type:"J2C",
   //    applicationNumber:"J2CE432608310005",
   //    oldApplication:"-",
   //    jatuhTempo:"23 Dec 2019",
   //    dibuatOleh:"JR CMK",
   //    status:"waiting_approval",
   // }
//    {
//       no:"6",
//       type:"J2C",
//       applicationNumber:"J2CE432608310006",
//       oldApplication:"-",
//       jatuhTempo:"23 Dec 2019",
//       dibuatOleh:"JR CMK",
//       status:"waiting_approval",
//    },
//    {
//       no:"7",
//       type:"J2C",
//       applicationNumber:"J2CE432608310007",
//       oldApplication:"-",
//       jatuhTempo:"23 Dec 2019",
//       dibuatOleh:"JR CMK",
//       status:"disbursed",
//    },
]
