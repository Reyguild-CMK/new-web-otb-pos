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
  clarity:string | number,
  color:string[],
  shape:string,
  fineness:string | number,
  brand?:string,
}

export const dataBarang: Barang[] = [];