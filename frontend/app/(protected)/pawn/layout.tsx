"use client"

import {
    Home,
} from "lucide-react";

// Isi Default Breadcrumb
export const defaultBreadcrumb = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
]

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div> {children} </div>
    )
}
