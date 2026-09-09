import {
  HandCoins,
  FilePenLine,
  ShoppingCartPlus,
  List,
} from "lucide-react";

// Isi Default Breadcrumb
export const defaultBreadcrumb = [
  { label: "Pawn", href: "/pawn", icon: HandCoins },
]

// Isi Pawn Breadcrumb
export const appBreadcrumb = [
  { label: "Form Pengajuan", href: "#", icon: FilePenLine },
]

export const appTodaysTransaction = [
  { label: "Today's Transactions", href: "/pawn/todays_transaction", icon: ShoppingCartPlus },
]

export const appPawnList = [
  { label: "List", href: "/pawn/list", icon: List },
]