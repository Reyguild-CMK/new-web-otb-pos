import {
    PackageSearch,
    ClipboardCheck,
    FileText,
    ScrollText ,
    UserRound,
} from "lucide-react";

import { Step } from "@/components/shared/Stepper/Stepper";

// Isi Stepper
export const stepItems: Step[] = [
  { label: "Daftar Barang", icon: PackageSearch, href: "/pawn/application/form-application" },
  { label: "Detail Pinjaman", icon: ScrollText, href: "/pawn/application/loan" },
  { label: "Data Pelanggan", icon: UserRound, href: "/pawn/application/customer_data" },
  { label: "Document", icon: FileText, href: "/pawn/application/document" },
  { label: "Summary", icon: ClipboardCheck, href: "/pawn/application/summary" },
];