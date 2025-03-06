'use client'
import {UserButton} from "@clerk/nextjs";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const DashboardLayout = ({children} ) =>{
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <header className={" h-[40px] border-b border-black/10 flex justify-between"}>
                    <SidebarTrigger/>

                    <UserButton/>

                </header>

                <div className={"h-[calc(100vh-60px)]"}>{children}</div>

            </div>

        </SidebarProvider>
    )
}
export default DashboardLayout;