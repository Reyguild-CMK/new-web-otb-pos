"use client";

import { useState } from "react";
import { ReceiptText, Menu, SquareX } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  role?: string;
  storeName?: string;
  storeCode?: string;
  tgpValue?: string | number;
  businessDate?: string;
  onMenuClick?: () => void;
  onTgpClick?: () => void;
}

const style_button = "hover:bg-navy-medium rounded-sm p-2 transition-colors";
const style_side = "flex items-center text-xs gap-2";

export function Header({
  role = "SM",
  storeName = "FRANK & CO Deli Park Medan",
  storeCode = "E43",
  tgpValue = "Rp. 0",
  businessDate = "Wednesday, 26 Aug 26",
  onMenuClick,
  onTgpClick,
}: HeaderProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <header className="bg-navy-dark text-white flex justify-between h-navbar md:px-8 px-2 w-full z-50">
      {/* Left Side */}
      <div className={style_side}>
        {/* Sidebar Button */}
        <button onClick={onMenuClick} className={style_button}>
          <Menu size={16} />
        </button>
        {/* Title */}
        <Link href="/dashboard" className="flex hidden sm:inline">
          {role} - {storeName} ({storeCode})
        </Link>
      </div>

      {/* Right Side */}
      <div className={style_side}>
        {/* Business Date & TGP */}
        {businessDate} <span className="font-bold text-gold">TGP: {tgpValue}</span>
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
    </header >
  );
}