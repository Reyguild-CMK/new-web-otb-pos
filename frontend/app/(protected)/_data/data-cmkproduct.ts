export interface CMKProduct {
  id: string;
  plu: string;
  item_category: "DJ" | "PG";
  namaitem: string;
  beratnet: number;
  kadar: string;
  netsales: number;
  PPNPembagi: number;
  datastone: string;
  acuanresell: number;
  acuan_resell_per_gram: number;
  max_loan: number;
  statusproduct: string;
}

export const DummyCMKProduct: CMKProduct[] = [
  {
    id: "1",
    plu: "DJ-001",
    item_category: "DJ",
    namaitem: "Cincin Berlian Solitaire 18K",
    beratnet: 3.5,
    kadar: "18K",
    netsales: 15000000,
    PPNPembagi: 1.11,
    datastone: "1 RD 0.50 F VVS1",
    acuanresell: 12000000,
    acuan_resell_per_gram: 3428571,
    max_loan: 10800000,
    statusproduct: "Active",
  },
  {
    id: "2",
    plu: "PG-002",
    item_category: "PG",
    namaitem: "Kalung Emas Polos 24K",
    beratnet: 10.0,
    kadar: "24K",
    netsales: 12500000,
    PPNPembagi: 1.11,
    datastone: "-",
    acuanresell: 12000000,
    acuan_resell_per_gram: 1200000,
    max_loan: 11400000,
    statusproduct: "Active",
  },
  {
    id: "3",
    plu: "DJ-003",
    item_category: "DJ",
    namaitem: "Anting Berlian Pear Shape 18K",
    beratnet: 4.2,
    kadar: "18K",
    netsales: 22000000,
    PPNPembagi: 1.11,
    datastone: "2 PS 1.20 E VVS2",
    acuanresell: 18000000,
    acuan_resell_per_gram: 4285714,
    max_loan: 16200000,
    statusproduct: "Sold",
  },
  {
    id: "4",
    plu: "DJ-004",
    item_category: "DJ",
    namaitem: "Gelang Tennis Diamond 18K",
    beratnet: 8.5,
    kadar: "18K",
    netsales: 45000000,
    PPNPembagi: 1.11,
    datastone: "45 RD 3.50 G VS1",
    acuanresell: 38000000,
    acuan_resell_per_gram: 4470588,
    max_loan: 34200000,
    statusproduct: "Active",
  },
];
