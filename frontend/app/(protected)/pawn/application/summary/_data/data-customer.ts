export interface Customer{
    tenor: string;
    persentaseBiayaPerawatan: string;
    metodePencairan: string;
    bank: string;
    nomorRekening: string;
    namaPemilikRekening: string;
    noDokumen: string;
    tanggalTransaksi: Date;
    tanggalJatuhTempo: Date;
    nilaiPinjaman: number;
    biayaPerawatan: number;
    nominalDitransfer: number;
}

export const dataCustomer: Customer[] = [
    {
        tenor:"120 Days",
        persentaseBiayaPerawatan: "6.00%",
        metodePencairan: "Transfer",
        bank:"Bank Central Asia",
        nomorRekening:"0011223344",
        namaPemilikRekening:"BCA Simulator A",
        noDokumen:"J2CE432501070001",
        tanggalTransaksi: new Date("2026-01-08"),
        tanggalJatuhTempo: new Date("2026-05-08"),
        nilaiPinjaman: 1808388,
        biayaPerawatan: 108504,
        nominalDitransfer:1699884
    }
];