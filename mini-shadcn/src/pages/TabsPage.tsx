import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import { FUNDS } from '@/data/funds'
import { ORDERS } from '@/data/orders'
import type { OrderStatus, OrderSide } from '@/data/orders'

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  PENDING:   'secondary',
  CONFIRMED: 'default',
  CANCELLED: 'destructive',
}

const sideVariant: Record<OrderSide, 'default' | 'outline'> = {
  BUY:  'default',
  SELL: 'outline',
}

export default function TabsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Tabs</h1>

      {/* ── 기본 Tabs 구조 실습 ─────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">기본 구조</h2>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p className="p-4 text-slate-500">탭 1 의 내용입니다.</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p className="p-4 text-slate-500">탭 2 의 내용입니다.</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p className="p-4 text-slate-500">탭 3 의 내용입니다.</p>
          </TabsContent>
        </Tabs>
      </section>

      {/* ── OMS 실전 : 주문목록 / 펀드목록 탭 ────────────── */}
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-slate-700">OMS 실전 예시</h2>
        </div>

        <div className="p-4">
          <Tabs defaultValue="orders">
            <TabsList className="mb-4">
              <TabsTrigger value="orders">
                주문 목록
                <Badge variant="secondary" className="ml-2">{ORDERS.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="funds">
                펀드 목록
                <Badge variant="secondary" className="ml-2">{FUNDS.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="summary">요약</TabsTrigger>
            </TabsList>

            {/* 주문 목록 탭 */}
            <TabsContent value="orders">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>종목명</TableHead>
                    <TableHead>구분</TableHead>
                    <TableHead className="text-right">수량</TableHead>
                    <TableHead className="text-right">단가</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>주문일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ORDERS.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.stockName}</TableCell>
                      <TableCell>
                        <Badge variant={sideVariant[order.side]}>
                          {order.side === 'BUY' ? '매수' : '매도'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.qty.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{order.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">{order.orderDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* 펀드 목록 탭 */}
            <TabsContent value="funds">
              <div className="grid grid-cols-3 gap-4">
                {FUNDS.map((fund) => (
                  <Card key={fund.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{fund.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm text-slate-500">
                      <p>{fund.type}</p>
                      <p>운용역 : {fund.manager}</p>
                      <p className="text-emerald-600 font-semibold">+{fund.returnRate}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 요약 탭 */}
            <TabsContent value="summary">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader><CardTitle className="text-sm text-slate-500">전체 주문</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{ORDERS.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-sm text-slate-500">미체결 (PENDING)</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-amber-500">
                      {ORDERS.filter(o => o.status === 'PENDING').length}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-sm text-slate-500">체결 (CONFIRMED)</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-emerald-500">
                      {ORDERS.filter(o => o.status === 'CONFIRMED').length}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>
    </div>
  )
}
