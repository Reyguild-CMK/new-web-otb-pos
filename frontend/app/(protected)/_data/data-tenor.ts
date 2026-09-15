export interface Tenor {
    id: string;
    tenor: number;
    label: string;
    status: string;
    rate: number;
    createdAt: string;
}

export const tenor: Tenor[] = [
    { id: "1", tenor: 15, label: "15 Days", status: "active", rate: 0.75, createdAt: "2021-01-12 12:24:30" },
    { id: "2", tenor: 30, label: "30 Days", status: "active", rate: 1.50, createdAt: "2021-01-12 12:24:30" },
    { id: "3", tenor: 45, label: "45 Days", status: "active", rate: 2.25, createdAt: "2021-01-12 12:24:30" },
    { id: "4", tenor: 60, label: "60 Days", status: "active", rate: 3.00, createdAt: "2021-01-12 12:24:30" },
    { id: "5", tenor: 75, label: "75 Days", status: "active", rate: 3.75, createdAt: "2021-01-12 12:24:30" },
    { id: "6", tenor: 90, label: "90 Days", status: "active", rate: 4.50, createdAt: "2021-01-12 12:24:30" },
    { id: "7", tenor: 105, label: "105 Days", status: "active", rate: 5.25, createdAt: "2021-01-12 12:24:30" },
    { id: "8", tenor: 120, label: "120 Days", status: "active", rate: 6.00, createdAt: "2021-01-12 12:24:30" },
    { id: "9", tenor: 140, label: "140 Days", status: "active", rate: 6.00, createdAt: "2021-01-12 12:24:30" },
];