export interface Customer{
    idNumber: string,
    nama: string,
    birthday: Date | null,
    address: string,
    handphone: string,
    email: string | null,
    occupation: string | null,
    maritalStatus: string | null,
}

export const dataCustomer: Customer[] = [
    {
        idNumber: "1234567891011121",
        nama: "Bunga Lavender",
        birthday: new Date(2004, 6, 12),
        handphone: "0",
        address: "Jl. Menuju Kesuksesan",
        email: "bungalavender@gmail.com",
        occupation: "Florist",
        maritalStatus: "Lajang"
    },

    {
        idNumber: "1234567891012131",
        nama: "Bunga Lily",
        birthday: new Date(2000, 7, 5),
        address: "Jl. Jalan",
        handphone: "08123",
        email: "bungalily@gmail.com",
        occupation: "Karyawan",
        maritalStatus: "Menikah"
    }
];