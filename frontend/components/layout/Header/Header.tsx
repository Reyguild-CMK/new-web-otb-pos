"use client";

import { useState, ReactNode } from "react";
import { ReceiptText, Menu, SquareX } from "lucide-react";
import Link from "next/link";
import { NotificationBell } from "./NotificationBell";
import { formatBusinessDate } from "@/lib/date";

import {
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

interface HeaderProps {
  userName?: string;
  brandName?: string;
  storeName?: string;
  storeCode?: string;
  tgpValue?: string | number;
  businessDate?: string;
  onMenuClick?: () => void;
  onTgpClick?: () => void;
  children?: ReactNode;
}

// Style Button & Side
const style_button = "hover:bg-navy-medium rounded-sm p-2 transition-colors";
const style_side = "flex items-center text-xs md:gap-2 md:px-2 gap-0.5 px-0.5";

export function Header({
  userName = "SM",
  brandName = "FRANK & CO",
  storeName = "Deli Park Medan",
  storeCode = "E43",
  tgpValue = "Rp. 0",
  businessDate,
  onMenuClick,
  onTgpClick,
  children,
}: HeaderProps) {
  const [isActive, setIsActive] = useState(false);
  const displayDate = businessDate || formatBusinessDate();
  return (
    <header className="bg-navy-dark text-white flex justify-between h-navbar md:px-6 w-full z-50 top-0 sticky">
      {/* Left Side */}
      <div className={style_side}>
        {/* Sidebar Button */}
        {children ? (children) : (
          <button onClick={onMenuClick} className={style_button}>
            <Menu size={16} />
          </button>
        )}
        {/* Title */}
        <Link href="/dashboard" className="hidden sm:inline">
          {userName} - {brandName} {storeName} ({storeCode})
        </Link>
      </div>

      {/* Right Side */}
      <div className={style_side}>
        <div className="flex items-center gap-2 md:mx-2 mx-1">
          {/* Notification */}
          <NotificationBell styleButton={style_button} />
          {/* Business Date & TGP */}
          <span suppressHydrationWarning>{displayDate}</span> <span className="font-bold text-gold">TGP: {tgpValue}</span>
        </div>

        <p className="font-bold">|</p>

        {/* TGP Sidebar */}
        <button
          onClick={() => {
            setIsActive(!isActive);
            if (onTgpClick) onTgpClick();
          }}
          className={style_button}>
          {isActive ? (<SquareX stroke="gold" size={16} />) : (<ReceiptText stroke="gold" size={16} />)}
        </button>
      </div>
    </header>
  );
}