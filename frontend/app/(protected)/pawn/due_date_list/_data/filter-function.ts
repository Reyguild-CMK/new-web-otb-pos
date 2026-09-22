import type { PawnSummary } from "@/app/(protected)/_data/data-summary";

export function filterDueDateData(
    data: PawnSummary[],
    filter: string) 
{
    if (filter === "all") return data;

    const today = new Date();

    return data.filter((item) => {
        const diffDays = Math.ceil((item.jatuhTempo.getTime()-today.getTime()) / (1000 * 60 * 60 * 24));

        if (filter === "h-7") return diffDays >= 0 && diffDays <= 7;
        if (filter === "h-14") return diffDays >= 0 && diffDays <= 14;
        if (filter === "h-30") return diffDays >= 0 && diffDays <=30;
        if (filter === "overdue") return diffDays < 0;

        return true;
    });
}