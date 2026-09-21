import {
  HandCoins,
  FilePenLine,
  ShoppingCartPlus,
  List,
  CalendarDays,
  icons
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

export const appDueDateList = [
  { label: "Due Date Pawn List", href: "/pawn/due_date_list", icon: CalendarDays},
]