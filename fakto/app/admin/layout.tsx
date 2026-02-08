"use client";

import { ReactNode } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function AdminSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
