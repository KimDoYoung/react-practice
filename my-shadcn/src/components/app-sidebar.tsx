import * as React from "react"
import { LayoutDashboard, ShoppingCart, Package, Users, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar" 

// 메뉴 데이터 (넥사크로의 메뉴 트리와 비슷하게 구성)
const data = {
  navMain: [
    { title: "대시보드", url: "#", icon: LayoutDashboard },
    { title: "주문 관리", url: "#", icon: ShoppingCart },
    { title: "상품 관리", url: "#", icon: Package },
    { title: "고객 관리", url: "#", icon: Users },
    { title: "시스템 설정", url: "#", icon: Settings },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 flex items-center justify-center border-b">
        <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">OMS ADMIN</span>
        <span className="font-bold text-lg hidden group-data-[collapsible=icon]:block">O</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메인 메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}