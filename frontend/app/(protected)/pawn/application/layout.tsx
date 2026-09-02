"use client"

import { Stepper } from "@/components/shared/Stepper/Stepper";
import { stepItems } from "@/app/(protected)/_data/stepper";

import { usePathname } from "next/navigation";
import { CustomBreadcrumbs } from "@/components/shared/Breadcrumbs/Breadcrumbs";
import { defaultBreadcrumb, appBreadcrumb } from "@/app/(protected)/_data/breadcrumbItem";

export default function PawnApplicationLayout({ children }: { children: React.ReactNode }) {
  // Mendapat pathname saat ini -> Menentukan step yang sedang aktif
  const pathname = usePathname();
  const activeStep = stepItems.find((step) => step.href === pathname) || stepItems[0];

  // Menggabungkan breadcrumb
  const thisBreadcrumb = [
    ...defaultBreadcrumb,
    ...appBreadcrumb,
    activeStep
  ];

  return (
    <div>
      {/* Header (Breadcrumb) */}
      <div className="mt-4 mb-6">
        <CustomBreadcrumbs items={thisBreadcrumb} />
      </div>

      <Stepper>
        {children}
      </Stepper>
    </div>
  )
}