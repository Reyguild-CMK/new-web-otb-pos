"use client"
import { style_card } from "@/components/shared/Stepper/Stepper";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatRupiah } from "@/lib/currency";
import { Gem, ShoppingCartPlus } from "lucide-react";
import { getPawnSummary, PawnSummary } from "../../_data/data-summary";
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";
import { TodaysTransactionsTable } from "./_components/todaystransaction-table";
import { ItemListsTable } from "./_components/item-list";

export default function TransactionTodayPage(){
    const transactionList = usePawnStore((state) => state.transactionList);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysData = transactionList
        .map((pawn) => getPawnSummary(pawn))
        .filter((pawn): pawn is PawnSummary => pawn !== undefined)
        .filter((pawn) => pawn.status === "disbursed")
        .filter((pawn) => {
            const pawnDate = new Date(pawn.tanggalTransaksi);
            pawnDate.setHours(0, 0, 0, 0);
            return pawnDate.getTime() === today.getTime();
        });

    return(
        <div className={`w-full`}>
            {/* Judul */}
            <div className="flex flex-col gap-4">
                <h1 className="font-bold flex gap-2 self-center"><ShoppingCartPlus size={22}/>Today's Transactions</h1>
                
                <div className={`${style_card} w-full mb-6`}>
                    <TodaysTransactionsTable data={todaysData}/>
                </div>

                <h1 className="font-bold flex gap-2 text-center self-center"><Gem size={22}/>Item List</h1>
                
                <div className={`${style_card} w-full`}>
                    <ItemListsTable data={todaysData}/>
                </div>
            </div>

            
        </div>
    )
}