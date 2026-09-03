"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  House,
  List,
  CreditCard,
  SquareArrowRightExit,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" className="text-white h-[calc(100vh-var(--height-navbar))] top-(--height-navbar)">
      {/* logo */}
      <SidebarHeader>
        <div className={`relative mx-auto my-4 transition-all duration-300 
        ${isCollapsed ? "h-8 w-8" : "h-16 w-16"}`}>
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
        <SidebarMenu className="gap-6">
          {/* dashboard */}
          <hr className="border-t border-white mb-2" />
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard"
              render={<Link href="/dashboard" />}
              className={`flex items-center group-data-[collapsible=icon]:p-1! ${isCollapsed ? "mx-auto" : "px-5"}`}>
              <House className={isCollapsed ? "size-6!" : "size-5!"} />
              {!isCollapsed && <span>Dashboard</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* daftar transaksi */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Daftar Transaksi"
              render={<Link href="/pawn/list" />}
              className={`flex items-center group-data-[collapsible=icon]:p-1! ${isCollapsed ? "mx-auto" : "px-5"}`}>
              <List className={isCollapsed ? "size-6!" : "size-5!"} />
              {!isCollapsed && <span>Daftar Transaksi</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* pembayaran */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Pembayaran"
              render={<Link href="/payment" />}
              className={`flex items-center group-data-[collapsible=icon]:p-1! ${isCollapsed ? "mx-auto" : "px-5"}`}>
              <CreditCard className={isCollapsed ? "size-6!" : "size-5!"} />
              {!isCollapsed && <span>Pembayaran</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>


          {/* logout */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout"
              render={<Link href="/logout" />}
              className={`flex items-center group-data-[collapsible=icon]:p-1! ${isCollapsed ? "mx-auto" : "px-5"}`}>
              <SquareArrowRightExit className={isCollapsed ? "size-6!" : "size-5!"} />
              {!isCollapsed && <span>Keluar</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}