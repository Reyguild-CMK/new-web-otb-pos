"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ReceiveItem {
  id: number;
  delivery_code: string;
}

const receiveItemsDummy: ReceiveItem[] = [
  { id: 1, delivery_code: "Contoh kode 1" },
  { id: 2, delivery_code: "Contoh kode 2" },
];

// Style
const header_style = "px-4 py-2.5 font-semibold border-b border-gray-light text-[13px] text-navy-dark flex justify-between items-center";
const row_style = "px-4 py-2 border-b last:border-b-0 border-gray-light hover:bg-gray-light/50 transition-colors block text-[12px]";

export function NotificationBell({ styleButton }: { styleButton: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  const closePopover = () => setIsOpen(false);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setHasNotification(false);
      }}>
      <PopoverTrigger className={`${styleButton} relative flex items-center justify-center`}>
        <Bell fill="white" size={16} />
        {receiveItemsDummy.length > 0 && hasNotification && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-medium text-[9px] font-bold text-white leading-none shadow-sm border border-navy-dark">
            {receiveItemsDummy.length}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={0}
        className="p-0 sm:w-[50vw] w-[90vw] max-w-70 bg-white border border-gray-light rounded-lg shadow-card py-1 z-60 text-gray-dark overflow-hidden">
        <div className={header_style}>
          <span>Notifikasi</span>
          <button onClick={closePopover} className="text-[10px] text-gray-medium hover:text-navy-dark transition-colors">
            Tutup
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {receiveItemsDummy.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-medium text-[12px]">
              No delivery need approval
            </div>
          ) : (
            receiveItemsDummy.map((receive) => (
              <Link
                key={receive.id}
                href={`/pawn/approval/${receive.id}`}
                className={row_style}
                onClick={closePopover}
              >
                <div className="flex flex-col gap-1.5">
                  <p className="text-gray-medium leading-relaxed">
                    <span className="font-semibold text-navy-dark">[{receive.delivery_code}]</span> has been sent from <span className="font-semibold text-gray-dark">Central</span>
                  </p>
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-gold text-navy-dark rounded hover:bg-yellow-medium transition-colors w-fit">
                    Detail
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
