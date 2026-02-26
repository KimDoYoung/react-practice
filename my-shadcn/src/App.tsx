import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
const orders = [
  { id: "ORD-001", customer: "김철수", product: "프리미엄 원두 1kg", status: "배송중", amount: "45,000원" },
  { id: "ORD-002", customer: "이영희", product: "에스프레소 머신", status: "결제완료", amount: "1,250,000원" },
  { id: "ORD-003", customer: "박지성", product: "텀블러 세트", status: "취소요청", amount: "32,000원" },
]

export default function App() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        {/* 우리가 곧 만들 커스텀 사이드바 컴포넌트 */}
        <AppSidebar />
        <SidebarInset>
          {/* 상단 헤더 영역 */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">대시보드</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>주문 관리 현황</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* 메인 컨텐츠 영역 */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-slate-50/50">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-4">
              <div className="aspect-video rounded-xl bg-white border shadow-sm p-4">
                <p className="text-sm font-medium text-muted-foreground">금일 신규 주문</p>
                <p className="text-3xl font-bold mt-2">128건</p>
              </div>
              <div className="aspect-video rounded-xl bg-white border shadow-sm p-4">
                <p className="text-sm font-medium text-muted-foreground">배송 준비중</p>
                <p className="text-3xl font-bold mt-2">45건</p>
              </div>
              <div className="aspect-video rounded-xl bg-white border shadow-sm p-4">
                <p className="text-sm font-medium text-muted-foreground">취소/환불 요청</p>
                <p className="text-3xl font-bold mt-2 text-red-500">3건</p>
              </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-white border shadow-sm md:min-h-min p-6">
               <h2 className="text-xl font-semibold mb-4">주문 목록 실시간 현황</h2>
               <div className="text-sm text-muted-foreground">여기에 그리드(DataTable)가 들어갈 예정입니다.</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">주문번호</TableHead>
                      <TableHead>고객명</TableHead>
                      <TableHead>상품명</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead className="text-right">결제금액</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === "취소요청" ? "destructive" : "secondary"}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{order.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>               
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}