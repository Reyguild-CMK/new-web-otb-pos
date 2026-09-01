"use client"

import {
    Home,
    FilePenLine,
    LucideIcon,
    PackageSearch,
    ClipboardCheck,
    FileText,
    ScrollText ,
    UserRound,
} from "lucide-react";

import { Step } from "@/components/shared/Stepper/Stepper";
import { defaultBreadcrumb } from "../layout";

// Isi Stepper
export const stepItems: Step[] = [
  { label: "Daftar Barang", icon: PackageSearch, href: "/pawn/application/form-application" },
  { label: "Detail Pinjaman", icon: ScrollText, href: "/pawn/application/loan" },
  { label: "Data Pelanggan", icon: UserRound, href: "/pawn/application/customer_data" },
  { label: "Document", icon: FileText, href: "/pawn/application/document" },
  { label: "Summary", icon: ClipboardCheck, href: "/pawn/application/summary" },
];

// Isi Default Breadcrumb
export const breadcrumbItems = [
  ...defaultBreadcrumb,
  { label: "Form Pengajuan", href: "#", icon: FilePenLine },
]

export default function PawnFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div> {children} </div>
    )
}
