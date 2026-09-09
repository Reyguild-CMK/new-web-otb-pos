export interface Bank{
    id: number,
    name: string,
    logo?: string,
}

export const dataBank: Bank[] =[
    {
        id: 1,
        name: "BCA",
        logo: "image/bank/bca.png"
    },
    {
        id: 2,
        name: "BNI",
        logo: "image/bank/bni.png"
    },
    {
        id: 3,
        name: "BRI",
        logo: "image/bank/bri.png"
    },
    {
        id: 4,
        name: "DANA",
        logo: "image/bank/dana.png"
    },
    {
        id: 5,
        name: "Danamon",
        logo: "image/bank/danamon.png"
    },
    {
        id: 6,
        name: "DBS",
        logo: "image/bank/dbs.png"
    },
]