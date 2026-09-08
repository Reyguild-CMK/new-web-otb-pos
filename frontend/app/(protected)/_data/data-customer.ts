export interface Customer{
    idNumber: number,
    nama: string,
    birthday: Date,
    address: string,
    handphone: number,
    email: string,
    occupation: string,
    maritalStatus: string,
}

export const dataCustomer: Customer[] = [
    {
        idNumber: 1234567891011121,
        nama: "Bunga Lavender",
        birthday: new Date(2004, 6, 12),
        address: "Jl. Menuju Kesuksesan",
        handphone: 0,
        email: "bungalavender@gmail.com",
        occupation: "Florist",
        maritalStatus: "Lajang"
    }
];