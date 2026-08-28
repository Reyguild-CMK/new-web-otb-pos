"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatRupiah } from "@/lib/currency";


interface LogamMulia {
    id: number;
    name: string;
    price: number;
}

interface BeliEmas {
    id: number;
    name: string;
    price: number;
}

const LogamMuliaDummy: LogamMulia[] = [
    {
        id: 1,
        name: "LM Antam Certieye",
        price: 2952025,
    },
    {
        id: 2,
        name: "LM Antam Retro, UBS, Lotus Archi",
        price: 1500000,
    }
]

const EmasDummy: BeliEmas[] = [
    {
        id: 1,
        name: "24K (99%)",
        price: 2420000,
    },
    {
        id: 2,
        name: "23K",
        price: 2085000,
    },
    {
        id: 3,
        name: "22K",
        price: 1997000,
    },
    {
        id: 4,
        name: "21K",
        price: 1909000,
    },
    {
        id: 5,
        name: "20K",
        price: 1816000,
    },
    {
        id: 6,
        name: "19K",
        price: 1724000,
    },
    {
        id: 7,
        name: "18K",
        price: 1634000,
    },
    {
        id: 8,
        name: "17K",
        price: 1539000,
    },
    {
        id: 9,
        name: "16K",
        price: 1447000,
    },
    {
        id: 10,
        name: "15K",
        price: 1357000,
    },
    {
        id: 11,
        name: "14K",
        price: 1265000,
    },
    {
        id: 12,
        name: "13K",
        price: 1175000,
    },
    {
        id: 13,
        name: "12K",
        price: 1083000,
    },
    {
        id: 14,
        name: "11K",
        price: 990000,
    },
    {
        id: 15,
        name: "10K",
        price: 900000,
    },
    {
        id: 16,
        name: "9K",
        price: 808000,
    }
]

// Style
const cell_padding = "px-2 py-1";
const header = `text-gold text-lg ${cell_padding}`;
const cell_left = `text-left ${cell_padding}`;
const cell_right = `text-right ${cell_padding} whitespace-nowrap`;
const row_cell = "hover:bg-navy-dark border-none";

export function SidebarTGP() {
    return (
        <div className="flex flex-col gap-4 bg-[#111] text-white sm:w-87.5 w-full p-4 h-[calc(100vh-var(--height-navbar))] top-(--height-navbar) z-50 fixed right-0 overflow-y-auto overflow-x-hidden **:data-[slot=table-container]:overflow-visible">
            <Table className="w-full">
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead colSpan={2} className={`${header} whitespace-normal`}>
                            Harga Beli Batangan Logam Mulia
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                    {LogamMuliaDummy.map((logammulia: LogamMulia) => (
                        <TableRow key={logammulia.id} className={row_cell}>
                            <TableCell className={cell_left}>
                                {logammulia.name}
                            </TableCell>
                            <TableCell className={cell_right}>
                                {formatRupiah(logammulia.price)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead colSpan={2} className={header}>
                            Harga Beli Emas
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                    {EmasDummy.map((beliemas: BeliEmas) => (
                        <TableRow key={beliemas.id} className={row_cell}>
                            <TableCell className={cell_left}>
                                {beliemas.name}
                            </TableCell>
                            <TableCell className={cell_right}>
                                {formatRupiah(beliemas.price)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}