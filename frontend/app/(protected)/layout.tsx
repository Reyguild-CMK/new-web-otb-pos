"use client"

import { ReactNode } from "react"

import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { AppSidebar } from "@/components/layout/Sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ProtectedLayout({ children }: { children: ReactNode; }) {
    return (
        <SidebarProvider className="flex flex-col min-h-full print:bg-white print:text-black">
            <div className="print:hidden sticky top-0 z-50 w-full">
                <Header>
                    <SidebarTrigger />
                </Header>
            </div>
            <div className="flex flex-1 w-full print:block">
                <div className="print:hidden h-full">
                    <AppSidebar />
                </div>
                <main className="flex-1 pt-2.5 px-5 mb-0 min-h-(--height-content) max-w-[100vw] overflow-x-hidden print:p-0 print:m-0 print:overflow-visible">
                    {children}
                </main>
            </div>
            <div className="print:hidden">
                <Footer />
            </div>
        </SidebarProvider >
    );
}