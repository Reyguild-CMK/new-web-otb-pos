"use client"

import { CustomBreadcrumbs } from "@/components/shared/Breadcrumbs/Breadcrumbs";
import { defaultBreadcrumb, appTodaysTransaction } from "@/app/(protected)/_data/breadcrumbItem";

export default function PawnApplicationLayout({ children }: { children: React.ReactNode }) {
  // Menggabungkan breadcrumb
  const thisBreadcrumb = [
    ...defaultBreadcrumb,
    ...appTodaysTransaction,
  ];

  return (
    <div>
      {/* Header (Breadcrumb) */}
      <div className="mt-4 mb-6">
        <CustomBreadcrumbs items={thisBreadcrumb} />
      </div>
        {children}
    </div>
  )
}