export interface Pawn {
    no: string;
    type: string;
    applicationNumber: string;
    oldApplication: string;
    customer: string;
    jatuhTempo: string;
    dibuatOleh: string;
    status: string;
}

// Data Dummy
export const pawnData: Pawn[] =[
    {
       no:"1",
       type:"J2C",
       applicationNumber:"J2CE432608310001",
       oldApplication:"-",
       customer:"Bunga Mawar",
       jatuhTempo:"23 Dec 2019",
       dibuatOleh:"JR CMK",
       status:"open",
    },
    {
       no:"2",
       type:"J2C",
       applicationNumber:"J2CE432608310002",
       oldApplication:"-",
       customer:"Bunga Melati Semuanya Indah",
       jatuhTempo:"23 Dec 2019",
       dibuatOleh:"JR CMK",
       status:"waiting_approval",
    },
    {
       no:"3",
       type:"J2C",
       applicationNumber:"J2CE432608310003",
       oldApplication:"-",
       customer:"Bunga Lily",
       jatuhTempo:"23 Dec 2019",
       dibuatOleh:"JR CMK",
       status:"approved"
    },
    {
       no:"4",
       type:"J2C",
       applicationNumber:"J2CE432608310004",
       oldApplication:"-",
       customer:"Bunga Lavender",
       jatuhTempo:"23 Dec 2019",
       dibuatOleh:"JR CMK",
       status:"waiting_approval",
    },
    {
       no:"5",
       type:"J2C",
       applicationNumber:"J2CE432608310005",
       oldApplication:"-",
       customer:"Buah Melon",
       jatuhTempo:"23 Dec 2019",
       dibuatOleh:"JR CMK",
       status:"waiting_approval",
    },
    {
       no:"6",
       type:"J2C",
       applicationNumber:"J2CE432608310006",
       oldApplication:"-",
       customer:"Buah Mangga",
       jatuhTempo:"23 Dec 2019",
       dibuatOleh:"JR CMK",
       status:"waiting_approval",
    },
    {
       no:"7",
       type:"J2C",
       applicationNumber:"J2CE432608310007",
       oldApplication:"-",
       customer:"Buah Apple",
       jatuhTempo:"23 Dec 2019",
       dibuatOleh:"JR CMK",
       status:"disbursed",
    },
]
