// Format ke rupiah
export function formatRupiah(value: number): string {
    const formatted = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

    return `Rp ${formatted}`;
}