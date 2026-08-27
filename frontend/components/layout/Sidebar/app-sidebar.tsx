"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

import{
  House,
  List,
  CreditCard,
  SquareArrowRightExit,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon"className="text-white">
      {/* logo */}
      <SidebarHeader>
        <div className="relative mx-auto my-4 h-16 w-16">
          <Image
            src="/image/logo/cmk.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </SidebarHeader>
      {/* menu */}
      <SidebarContent>
        <SidebarMenu>
          {/* dashboard */}
          <SidebarMenuItem>
            <hr className="border-t border-white" />
            <SidebarMenuButton tooltip="Dashboard" className="mt-10 py-6">
              <Link href="dashboard" className="flex gap-4 px-2 text-sm">
                <House />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* daftar transaksi */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Daftar Transaksi" className="mt-2 py-6">
              <Link href="transactions" className="flex gap-4 px-2 text-sm">
                <List />
                <span>Daftar Transaksi</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* pembayaran */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Pembayaran" className="mt-2 py-6">
              <Link href="payment" className="flex gap-4 px-2 text-sm">
                <CreditCard />
                <span>Pembayaran</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* logout */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" className="mt-2 py-6">
              <Link href="logout" className="flex gap-4 px-2 text-sm">
                <SquareArrowRightExit />
                <span>Keluar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}