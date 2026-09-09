export interface Tenor{
    id: string,
    tenor: number
    label:string,
}

export const tenor: Tenor[] =[
    {
        id: "1",
        tenor: 120,
    },
    {
        id: "2",
        tenor: 240,
    }
].map(item => ({ ...item, label: `${item.tenor} Days` }));