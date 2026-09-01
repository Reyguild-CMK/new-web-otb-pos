"use client"

import React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// tipe data untuk setiap item breadcrumb
interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: LucideIcon;
}

// props yang menyimpan array item breadcrumb
interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function CustomBreadcrumbs({ items }: BreadcrumbsProps) {
    // Jika data kosong atau hanya ada 1 halaman, hide breadcrumb
    if (!items || items.length <= 1) return null;
    return (
        <Breadcrumb className="mt-3">
            <BreadcrumbList>
                {items.map((item, index) => {
                    const Icon = item.icon;
                    const isLast = index === items.length - 1;
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {isLast || !item.href ? (
                                    // Halaman aktif saat ini
                                    <BreadcrumbPage className="text-foreground inline-flex items-center gap-1.5">
                                        {Icon && <Icon className="size-4" />}
                                        <span>{item.label}</span>
                                    </BreadcrumbPage>
                                ) : (
                                    // Halaman sebelumnya dirender dengan Link
                                    <BreadcrumbLink
                                        className="inline-flex items-center gap-1.5"
                                        render={<Link href={item.href} />}
                                    >
                                        {Icon && <Icon className="size-4" />}
                                        <span className="text-xs">{item.label}</span>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {/* Ada separator ">" jika bukan halaman terakhir */}
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}