"use client"

import { ReactNode } from "react"

import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { AppSidebar } from "@/components/layout/Sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ProtectedLayout({ children }: { children: ReactNode; }) {
    return (
        <SidebarProvider className="flex flex-col min-h-full">
            <Header>
                <SidebarTrigger />
            </Header>
            <div className="flex flex-1 w-full">
                <AppSidebar />
                <main className="flex-1 pt-2.5 px-5 mb-0 min-h-(--height-content)">
                    {children}
                </main>
            </div>
            <Footer />
        </SidebarProvider >
    );
}