// Format ribuan dst
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

// Format Rupiah dengan prefix Rp
export function formatRupiah(value: number): string {
    return `Rp${formatCurrency(value)}`;
}