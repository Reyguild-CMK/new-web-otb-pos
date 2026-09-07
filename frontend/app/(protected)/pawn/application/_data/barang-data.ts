export interface Barang {
  kode: string;
  foto: string;
  jenis: string;
  namabarang: string;
  karat: string;
  berat: number;
  catatan: string;
  qty: number;
  nilai: number,
  makspinjaman:number,
  clarity:number,
  color:string[],
  shape:string,
  fineness:number,
  brand?:string,
}

export const dataBarang: Barang[] = [
  {
    kode: "ITEM-260901-0001",
    foto: "/image/bg-login.jpg",
    jenis: "CMK Diamond Jewelry",
    namabarang: "ABE051496",
    karat:"18K",
    berat: 5.04,
    catatan: "testing",
    qty: 1,
    nilai: 9835366,
    makspinjaman:8851829,
    clarity: 1,
    color: ["D", "E", "F", "G"],
    shape: "Round",
    fineness: .019,
  },
  // {
  //   kode: "ITEM-260901-0002",
  //   foto: "/image/bg-login.jpg",
  //   jenis: "CMK Diamond Jewelry",
  //   namabarang: "ABE0529190",
  //   karat:"18K",
  //   berat: 6.20,
  //   catatan: "testing2222 fhauhfaujf oei jaiojf aeoijf io joairaoejaj oiajroij aj oijo jo jo jaoojaojoaojwdjoaj ojjo jiu jo joijoiij iojojoojojjoj fakaka",
  //   qty: 1,
  //   nilai: 9999999,
  //   makspinjaman:8888888,
  //   clarity: 1,
  //   color: ["D", "E", "F"],
  //   shape: "Round",
  //   fineness: .019,
  // }
]