"use client"
import { style_card } from "@/components/shared/Stepper/Stepper";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatRupiah } from "@/lib/currency";
import { Gem, ShoppingCartPlus } from "lucide-react";
import { filterPawnSummarybyDate, PawnSummary } from "../../_data/data-summary";
import { TodaysTransactionsTable } from "./_components/todaystransaction-table";
import { ItemListsTable } from "./_components/item-list";

export default function TransactionTodayPage(){
    const tanggal = new Date("2023-03-04");
    const todaysData = filterPawnSummarybyDate(tanggal);

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