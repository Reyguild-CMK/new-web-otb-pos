export interface JawsMasterItem {
  id: string;
  nama: string;
}

// Product Char Tab
export const DUMMY_PRODUCT_ITEMS: JawsMasterItem[] = [
  { id: "BGL", nama: "Bangle" },
  { id: "BCL", nama: "Bracelet" },
  { id: "CHN", nama: "Chain" },
  { id: "WTC", nama: "Watch" },
];
export const DUMMY_PRODUCT_CATEGORIES: JawsMasterItem[] = [
  { id: "FASHION", nama: "Fashion" },
  { id: "FUN", nama: "FUN" },
  { id: "PG", nama: "Plain Gold" },
];
export const DUMMY_PRODUCT_LEVELS: JawsMasterItem[] = [
  { id: "DJ1", nama: "Diamond Jewellery 1" },
  { id: "MOUNTING", nama: "Mounting" },
  { id: "SEMIMOUNTING", nama: "Semi Mounting" },
];
export const DUMMY_STONE_DISTS: JawsMasterItem[] = [
  { id: "FNC", nama: "Fancy" },
  { id: "FNCD", nama: "Fancy Design" },
  { id: "FTSS", nama: "Fantasy Shape" },
  { id: "PROMO", nama: "Promo" },
];
export const DUMMY_FRAME_MATERIALS: JawsMasterItem[] = [
  { id: "EM", nama: "Emas" },
  { id: "PD", nama: "Paladium" },
  { id: "PT", nama: "Platinum" },
  { id: "SV", nama: "Silver" },
];
export const DUMMY_FRAME_FINISHINGS: JawsMasterItem[] = [
  { id: "CHROOM", nama: "Chroom" },
];
export const DUMMY_FRAME_COLORS: JawsMasterItem[] = [
  { id: "WHT", nama: "White" },
  { id: "YEL", nama: "Yellow" },
  { id: "RSG", nama: "RoseGold" },
  { id: "RWR", nama: "Rosegold White Rosegold" },
];
export const DUMMY_PROCESS_CONS: JawsMasterItem[] = [
  { id: "MUDAH", nama: "Mudah" },
  { id: "SEDANG", nama: "Sedang" },
  { id: "SULIT", nama: "Sulit" },
];

// Design Tab
export const DUMMY_DESIGN_FINISHINGS: JawsMasterItem[] = [
  { id: "DOFF", nama: "Doff" },
  { id: "CHBLACK", nama: "Chroom Black" },
  { id: "GRAFIR", nama: "Grafir" },
  { id: "GRAIN", nama: "Grain" },
  { id: "CHKOMB", nama: "Chroom Kombinasi" },
  { id: "CHROOM", nama: "Chroom" },
  { id: "OLLP", nama: "Ongkos Lain-Lain (LP)" },
  { id: "OLLS", nama: "Ongkos Lain-Lain (LS)" },
  { id: "STONESET", nama: "Stone Setting" },
];

// Stone Tab
export const DUMMY_STONE: JawsMasterItem[] = [
  { id: "DREG", nama: "Diamond Reguler" },
  { id: "DDOS", nama: "Diamond Dossier" },
  { id: "CDIA", nama: "Colour Diamond" },
  { id: "PSTO", nama: "Precious Stone" },
  { id: "SPSTO", nama: "Semi Precious" },
  { id: "PRL", nama: "Pearl" },
];

export const DUMMY_TARGET_AGE: JawsMasterItem[] = [
  { id: "ADL", nama: "Adult" },
  { id: "BBY", nama: "Baby" },
  { id: "TNG", nama: "Teenager" },
  { id: "NAN", nama: "None" },
];

export const DUMMY_GOLD_MODEL: JawsMasterItem[] = [
  { id: "SMP", nama: "Simple" },
  { id: "FSH", nama: "Fashion" },
  { id: "SPC", nama: "Special" },
  { id: "GJS", nama: "Gold Jewellery Simple" },
  { id: "GJF", nama: "Gold Jewellery Fancy" },
  { id: "GJSS", nama: "Gold Jewellery Special" },
  { id: "CZS", nama: "Cubic Zirconia Simple" },
  { id: "CZF", nama: "Cubic Zirconia Fancy" },
  { id: "VLEI", nama: "Voucher LEI" },
];

// Simulasi Fetching
export async function fetchJawsReference(prefix: string): Promise<JawsMasterItem[]> {
  await new Promise(resolve => setTimeout(resolve, 300));

  switch (prefix) {
    case 'ProductItem':
      return DUMMY_PRODUCT_ITEMS;
    case 'ProductCategory':
      return DUMMY_PRODUCT_CATEGORIES;
    case 'ProductLevel':
      return DUMMY_PRODUCT_LEVELS;
    case 'StoneDist':
      return DUMMY_STONE_DISTS;
    case 'FrameMaterial':
      return DUMMY_FRAME_MATERIALS;
    case 'FrameFinishing':
      return DUMMY_FRAME_FINISHINGS;
    case 'ProcessFinishing':
      return DUMMY_DESIGN_FINISHINGS;
    case 'FrameColor':
      return DUMMY_FRAME_COLORS;
    case 'ProcessCons':
      return DUMMY_PROCESS_CONS;
    case 'Stone':
      return DUMMY_STONE;
    case 'TargetAge':
      return DUMMY_TARGET_AGE;
    case 'GoldModel':
      return DUMMY_GOLD_MODEL;
    default:
      return [];
  }
}

// Konfigurasi Form Dinamis untuk Stone
export const STONE_CONFIG: Record<string, any> = {
  "Diamond Reguler": {
    fields: ["shape", "size", "color", "clarity"],
    options: {
      shape: ["Default", "Banjar", "Baguette", "Emerald"],
      size: ["0,001 - 0,0029 ROUND", "0,001 - 0,0029 ROUND NEW", "0,003 - 0,008 ROUND NEW"],
      color: ["C", "D", "Default", "E", "F"],
      clarity: ["1", "2", "3", "4", "8", "Default", "IF", "SI1"],
    }
  },
  "Diamond Dossier": {
    fields: ["shape", "size", "color", "clarity", "cutting", "brand", "category"],
    options: {
      shape: ["Default", "Kite", "Cushion", "Lily Cut"],
      size: ["0,750-0,799", "0.300 - 0.369", "0.370 - 0.399"],
      color: ["C", "D", "Default", "E", "F", "Faint Pink"],
      clarity: ["1", "2", "3", "4", "8", "Default", "FL", "IF"],
      cutting: ["ADA FAIR", "ANY FAIR", "Default"],
      brand: ["AR", "BR", "Default", "Maissonite"],
      category: ["Faint", "None", "PC"],
    }
  },
  "Colour Diamond": { fields: ["shape", "size", "color", "clarity"] },
  "Precious Stone": { fields: ["shape", "size", "color", "clarity"] },
  "Semi Precious": { fields: ["shape", "size", "color", "clarity"] },
  "Pearl": { fields: ["shape", "size", "color", "clarity", "cutting", "brand", "category"] },
  "DEFAULT": {
    fields: ["shape", "size", "color", "clarity"],
    options: {
      shape: ["Default", "Round", "Oval", "Princess"],
      size: ["Small", "Medium", "Large"],
      color: ["Red", "Blue", "Green", "White"],
      clarity: ["VVS", "VS", "SI"],
      cutting: ["Excellent", "Good", "Fair"],
      brand: ["Brand A", "Brand B"],
      category: ["Cat A", "Cat B"],
    }
  }
};


// Interface untuk tabel stone yang ditambahkan
export interface AddedStone {
  id: string;
  stoneDesc: string;
  p: string;
  l: string;
  t: string;
  caratPerButir: string;
  totalButir: string;
  totalCarat: string;
}

// Data dummy kombinasi stone
export const VALID_STONE_COMBINATIONS: Record<string, any>[] = [
  {
    stoneName: "Diamond Reguler",
    shape: "Default",
    size: "0,001 - 0,0029 ROUND",
    color: "C",
    clarity: "1"
  },
  {
    stoneName: "Diamond Reguler",
    shape: "Banjar",
    size: "0,001 - 0,0029 ROUND NEW",
    color: "D",
    clarity: "2"
  },
  {
    stoneName: "Diamond Dossier",
    shape: "Default",
    size: "0,750-0,799",
    color: "C",
    clarity: "1",
    cutting: "ADA FAIR",
    brand: "AR",
    category: "Faint"
  },
  {
    stoneName: "Pearl",
    shape: "Default",
    size: "Small",
    color: "D",
    clarity: "IF",
    cutting: "Default",
    brand: "Default",
    category: "Default"
  }
];

// Function untuk mengecek kombinasi stone
export async function checkStoneCombination(stoneName: string, filters: Record<string, string | null>): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 600));

  // Cek kombinasi stone
  const isFound = VALID_STONE_COMBINATIONS.some(combo => {
    if (combo.stoneName !== stoneName) return false;

    // Jika ada filter yang dipilih, cek apakah sama dengan isi database
    for (const key in filters) {
      if (filters[key] && combo[key] !== filters[key]) {
        return false;
      }
    }
    return true;
  });
  return isFound;
}