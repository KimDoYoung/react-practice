import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

export default function TablePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Table</h1>

      {/* ── 기본 Table ─────────────────────────────────────── */}
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-700">주문 목록</h2>
          <Button size="sm">+ 주문 등록</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>펀드</TableHead>
              <TableHead>종목코드</TableHead>
              <TableHead>종목명</TableHead>
              <TableHead>구분</TableHead>
              <TableHead className="text-right">수량</TableHead>
              <TableHead className="text-right">단가</TableHead>
              <TableHead className="text-right">금액</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>주문일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ORDERS.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-slate-400">{order.id}</TableCell>
                <TableCell>{order.fundName}</TableCell>
                <TableCell className="font-mono text-sm">{order.stockCode}</TableCell>
                <TableCell className="font-medium">{order.stockName}</TableCell>
                <TableCell>
                  <Badge variant={sideVariant[order.side]}>
                    {order.side === 'BUY' ? '매수' : '매도'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{order.qty.toLocaleString()}</TableCell>
                <TableCell className="text-right">{order.price.toLocaleString()}</TableCell>
                <TableCell className="text-right font-medium">
                  {(order.qty * order.price).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-slate-400 text-sm">{order.orderDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 합계 행 */}
        <div className="p-4 border-t bg-slate-50 flex justify-end gap-4 text-sm">
          <span className="text-slate-500">총 {ORDERS.length}건</span>
          <span className="font-semibold">
            총 금액 : {ORDERS.reduce((sum, o) => sum + o.qty * o.price, 0).toLocaleString()} 원
          </span>
        </div>
      </section>
    </div>
  )
}
