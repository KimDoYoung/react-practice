import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FUNDS } from '@/data/funds'

// ── Zod 스키마 정의 ───────────────────────────────────────────
const orderSchema = z.object({
  fundId:    z.string().min(1, '펀드를 선택하세요'),
  stockCode: z.string()
    .min(6, '종목코드는 6자리입니다')
    .max(6, '종목코드는 6자리입니다')
    .regex(/^\d+$/, '숫자만 입력하세요'),
  stockName: z.string().min(1, '종목명을 입력하세요'),
  side:      z.enum(['BUY', 'SELL'], { required_error: '매수/매도를 선택하세요' }),
  qty:       z.coerce.number()
    .min(1,      '수량은 1 이상이어야 합니다')
    .int(        '정수만 입력하세요'),
  price:     z.coerce.number()
    .min(1,      '단가는 1 이상이어야 합니다'),
})

type OrderForm = z.infer<typeof orderSchema>

export default function FormPage() {
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fundId:    '',
      stockCode: '',
      stockName: '',
      side:      undefined,
      qty:       0,
      price:     0,
    },
  })

  const onSubmit = (data: OrderForm) => {
    console.log('제출 데이터:', data)
    alert(`주문 등록 완료!\n종목: ${data.stockName}\n수량: ${data.qty}\n단가: ${data.price}`)
    form.reset()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Input · Select · Form + Zod</h1>

      {/* ── Input 단독 실습 ──────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Input 기본</h2>
        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <div className="space-y-1">
            <label className="text-sm font-medium">기본</label>
            <Input placeholder="텍스트 입력" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">숫자</label>
            <Input type="number" placeholder="0" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">비밀번호</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">비활성</label>
            <Input disabled placeholder="disabled" />
          </div>
        </div>
      </section>

      {/* ── Select 단독 실습 ─────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Select 기본</h2>
        <div className="max-w-xs space-y-1">
          <label className="text-sm font-medium">펀드 선택</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="펀드를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {FUNDS.map((f) => (
                <SelectItem key={f.id} value={String(f.id)}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* ── Form + Zod 실전 ──────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">
          Form + Zod 유효성 검사
        </h2>
        <p className="text-sm text-slate-400">
          아무것도 입력하지 않고 등록 버튼을 눌러보세요 → 에러 메시지 확인
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">

            {/* 펀드 선택 */}
            <FormField control={form.control} name="fundId" render={({ field }) => (
              <FormItem>
                <FormLabel>펀드</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="펀드를 선택하세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FUNDS.map((f) => (
                      <SelectItem key={f.id} value={String(f.id)}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage /> {/* ← Zod 에러 메시지 자동 표시 */}
              </FormItem>
            )} />

            {/* 종목코드 */}
            <FormField control={form.control} name="stockCode" render={({ field }) => (
              <FormItem>
                <FormLabel>종목코드</FormLabel>
                <FormControl>
                  <Input placeholder="005930" maxLength={6} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* 종목명 */}
            <FormField control={form.control} name="stockName" render={({ field }) => (
              <FormItem>
                <FormLabel>종목명</FormLabel>
                <FormControl>
                  <Input placeholder="삼성전자" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* 매수/매도 */}
            <FormField control={form.control} name="side" render={({ field }) => (
              <FormItem>
                <FormLabel>구분</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="매수/매도 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BUY">매수</SelectItem>
                    <SelectItem value="SELL">매도</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            {/* 수량 / 단가 나란히 */}
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="qty" render={({ field }) => (
                <FormItem>
                  <FormLabel>수량</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>단가</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="75000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* 예상 금액 */}
            {form.watch('qty') > 0 && form.watch('price') > 0 && (
              <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-md">
                예상 금액 :&nbsp;
                <span className="font-semibold text-slate-800">
                  {(form.watch('qty') * form.watch('price')).toLocaleString()} 원
                </span>
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                초기화
              </Button>
              <Button type="submit">등록</Button>
            </div>

          </form>
        </Form>
      </section>
    </div>
  )
}
