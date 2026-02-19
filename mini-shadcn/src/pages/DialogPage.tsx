import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage,
} from '@/components/ui/form'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FUNDS } from '@/data/funds'
import { ORDERS } from '@/data/orders'
import type { Order } from '@/data/orders'

// ── Zod 스키마 ────────────────────────────────────────────────
const orderSchema = z.object({
  fundId:    z.string().min(1, '펀드를 선택하세요'),
  stockCode: z.string().length(6, '종목코드는 6자리입니다').regex(/^\d+$/, '숫자만 입력하세요'),
  stockName: z.string().min(1, '종목명을 입력하세요'),
  side:      z.enum(['BUY', 'SELL'], { required_error: '구분을 선택하세요' }),
  qty:       z.coerce.number().min(1, '수량은 1 이상'),
  price:     z.coerce.number().min(1, '단가는 1 이상'),
})
type OrderForm = z.infer<typeof orderSchema>

// ── 주문 등록 Dialog ──────────────────────────────────────────
function AddOrderDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: { fundId: '', stockCode: '', stockName: '', qty: 0, price: 0 },
  })

  const onSubmit = (data: OrderForm) => {
    console.log('등록:', data)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ 주문 등록</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>주문 등록</DialogTitle>
          <DialogDescription>새로운 주문을 등록합니다.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField control={form.control} name="fundId" render={({ field }) => (
              <FormItem>
                <FormLabel>펀드</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="펀드 선택" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FUNDS.map(f => (
                      <SelectItem key={f.id} value={String(f.id)}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="stockCode" render={({ field }) => (
                <FormItem>
                  <FormLabel>종목코드</FormLabel>
                  <FormControl><Input placeholder="005930" maxLength={6} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="stockName" render={({ field }) => (
                <FormItem>
                  <FormLabel>종목명</FormLabel>
                  <FormControl><Input placeholder="삼성전자" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="side" render={({ field }) => (
              <FormItem>
                <FormLabel>구분</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="매수/매도 선택" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BUY">매수</SelectItem>
                    <SelectItem value="SELL">매도</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="qty" render={({ field }) => (
                <FormItem>
                  <FormLabel>수량</FormLabel>
                  <FormControl><Input type="number" placeholder="100" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>단가</FormLabel>
                  <FormControl><Input type="number" placeholder="75000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>취소</Button>
              <Button type="submit">등록</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

// ── 삭제 확인 Dialog ──────────────────────────────────────────
function DeleteConfirmDialog({ order }: { order: Order }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">삭제</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>주문 삭제</DialogTitle>
          <DialogDescription>
            아래 주문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-slate-50 p-3 rounded-md text-sm space-y-1">
          <p><span className="text-slate-400">종목명</span> : {order.stockName}</p>
          <p><span className="text-slate-400">수량</span> : {order.qty.toLocaleString()}</p>
          <p><span className="text-slate-400">단가</span> : {order.price.toLocaleString()}</p>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>삭제 확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── 메인 페이지 ───────────────────────────────────────────────
export default function DialogPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dialog</h1>

      {/* 기본 Dialog */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">기본 Dialog</h2>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">간단한 안내</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>안내</DialogTitle>
                <DialogDescription>
                  이것은 기본 Dialog 입니다. ESC 키 또는 바깥 클릭으로 닫을 수 있습니다.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-slate-500 py-2">Dialog 안에 원하는 내용을 자유롭게 넣을 수 있습니다.</p>
              <DialogFooter>
                <Button>확인</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* 주문 등록 Dialog + Form */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">주문 등록 — Dialog + Form + Zod</h2>
        <AddOrderDialog />
      </section>

      {/* 삭제 확인 Dialog */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">삭제 확인 Dialog</h2>
        <div className="space-y-2">
          {ORDERS.slice(0, 3).map((order) => (
            <div key={order.id}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{order.stockName}</span>
                <Badge variant={order.side === 'BUY' ? 'default' : 'outline'}>
                  {order.side === 'BUY' ? '매수' : '매도'}
                </Badge>
              </div>
              <DeleteConfirmDialog order={order} />
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
