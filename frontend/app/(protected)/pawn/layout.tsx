"use client"

import {
    HandCoins,
} from "lucide-react";

// Isi Default Breadcrumb
export const defaultBreadcrumb = [
  { label: "Pawn", href: "/pawn", icon: HandCoins },
]

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div> {children} </div>
    )
}
