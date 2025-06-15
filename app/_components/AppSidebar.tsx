import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, DollarSignIcon, Home, Inbox, Paintbrush, } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Design",
        url: "/design",
        icon: Paintbrush,
    },

]

export function AppSidebar() {
    const page = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='flex items-center justify-center'>
                    <Image src={'/logo.png'} alt='logo' width={100} height={50}
                        className='height-[60px] w-[80px] object-contain' />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                                <a href={item.url} key={index} className={`${page === item.url && "text-primary shadow-sm bg-gray-200 rounded-md"} p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 text-gray-400 text-sm'></h2>
            </SidebarFooter>
        </Sidebar>
    )
}