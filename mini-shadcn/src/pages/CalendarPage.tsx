import { useState } from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ORDERS } from '@/data/orders'

export default function CalendarPage() {
  const [single, setSingle]     = useState<Date | undefined>(new Date())
  const [range, setRange]       = useState<{ from?: Date; to?: Date }>({})
  const [pickerDate, setPickerDate] = useState<Date | undefined>()
  const [popoverOpen, setPopoverOpen] = useState(false)

  // 주문 날짜 목록 (Calendar 에 마크 표시용)
  const orderDates = ORDERS.map(o => new Date(o.orderDate))

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Calendar · Popover</h1>

      {/* ── 단일 날짜 선택 ──────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">단일 날짜 선택</h2>
        <div className="flex gap-8 items-start">
          <Calendar
            mode="single"
            selected={single}
            onSelect={setSingle}
            locale={ko}
            className="rounded-md border"
          />
          <div className="space-y-2 pt-2">
            <p className="text-sm text-slate-500">선택된 날짜</p>
            {single ? (
              <p className="text-lg font-semibold">
                {format(single, 'yyyy년 MM월 dd일 (eee)', { locale: ko })}
              </p>
            ) : (
              <p className="text-slate-400">날짜를 선택하세요</p>
            )}
          </div>
        </div>
      </section>

      {/* ── 기간 선택 ───────────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">기간 선택 (Range)</h2>
        <div className="flex gap-8 items-start">
          <Calendar
            mode="range"
            selected={{ from: range.from, to: range.to }}
            onSelect={(r) => setRange(r ?? {})}
            locale={ko}
            className="rounded-md border"
          />
          <div className="space-y-2 pt-2">
            <p className="text-sm text-slate-500">선택된 기간</p>
            {range.from ? (
              <div className="space-y-1">
                <p className="text-sm">
                  시작 : <span className="font-semibold">
                    {format(range.from, 'yyyy-MM-dd')}
                  </span>
                </p>
                <p className="text-sm">
                  종료 : <span className="font-semibold">
                    {range.to ? format(range.to, 'yyyy-MM-dd') : '선택 중...'}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-slate-400">시작일을 선택하세요</p>
            )}
          </div>
        </div>
      </section>

      {/* ── Popover + Calendar (DatePicker 패턴) ────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">
          Popover + Calendar — DatePicker 패턴
        </h2>
        <p className="text-sm text-slate-400">
          Form 안에서 날짜를 선택할 때 사용하는 패턴입니다.
        </p>
        <div className="space-y-2">
          <p className="text-sm font-medium">주문일</p>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-56 justify-start">
                📅 {pickerDate
                  ? format(pickerDate, 'yyyy-MM-dd')
                  : '날짜를 선택하세요'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={pickerDate}
                onSelect={(date) => {
                  setPickerDate(date)
                  setPopoverOpen(false)   // 선택 즉시 Popover 닫기
                }}
                locale={ko}
              />
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* ── 주문 날짜 목록 ───────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">주문 날짜 목록</h2>
        <div className="flex gap-2 flex-wrap">
          {ORDERS.map((order) => (
            <div key={order.id}
              className="flex items-center gap-2 p-2 border rounded-md text-sm"
            >
              <span className="text-slate-400">{order.orderDate}</span>
              <span className="font-medium">{order.stockName}</span>
              <Badge variant={order.side === 'BUY' ? 'default' : 'outline'}>
                {order.side === 'BUY' ? '매수' : '매도'}
              </Badge>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
