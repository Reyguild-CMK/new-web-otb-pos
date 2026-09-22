"use client";

import { CustomBreadcrumbs } from "@/components/shared/Breadcrumbs/Breadcrumbs";
import {
  defaultBreadcrumb,
  appDueDateList,
} from "@/app/(protected)/_data/breadcrumbItem";

export default function DueDateListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = [
    ...defaultBreadcrumb,
    ...appDueDateList,
  ];

  return (
    <div>
      <div className="mb-6 mt-4">
        <CustomBreadcrumbs items={breadcrumbs} />
      </div>

      {children}
    </div>
  );
}