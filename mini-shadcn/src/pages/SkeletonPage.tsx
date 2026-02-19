import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FUNDS } from '@/data/funds'
import { ORDERS } from '@/data/orders'

// ── 로딩 중 Skeleton UI ───────────────────────────────────────
function FundCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-2 w-full" />
      </CardContent>
    </Card>
  )
}

function TableRowSkeleton() {
  return (
    <tr className="border-b">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="p-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

export default function SkeletonPage() {
  const [loading, setLoading] = useState(true)

  // 타이머로 로딩 시뮬레이션
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  const handleReload = () => {
    setLoading(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skeleton · Alert</h1>
        <Button variant="outline" onClick={handleReload} disabled={loading}>
          {loading ? '로딩 중...' : '다시 로딩'}
        </Button>
      </div>

      {/* ── Alert ────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-700">Alert</h2>

        <Alert>
          <AlertTitle>ℹ️ 안내</AlertTitle>
          <AlertDescription>
            오늘 장 시작 전 시스템 점검이 있었습니다. 정상 운영 중입니다.
          </AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <AlertTitle>⚠️ 경고</AlertTitle>
          <AlertDescription>
            미체결 주문 {ORDERS.filter(o => o.status === 'PENDING').length}건이 있습니다.
            장 마감 전 확인하세요.
          </AlertDescription>
        </Alert>
      </section>

      {/* ── Skeleton : 펀드 카드 로딩 ───────────────────── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-700">
          Skeleton — 펀드 카드
          {loading && <span className="ml-2 text-sm text-slate-400 font-normal">로딩 중...</span>}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <FundCardSkeleton key={i} />)
            : FUNDS.map((fund) => (
                <Card key={fund.id}>
                  <CardHeader className="pb-2">
                    <p className="font-semibold">{fund.name}</p>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <Badge variant="outline">{fund.type}</Badge>
                    <p className="text-slate-500">운용역 : {fund.manager}</p>
                    <p className="text-emerald-600 font-semibold">+{fund.returnRate}%</p>
                  </CardContent>
                </Card>
              ))
          }
        </div>
      </section>

      {/* ── Skeleton : 테이블 로딩 ───────────────────────── */}
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-slate-700">
            Skeleton — 테이블
            {loading && <span className="ml-2 text-sm text-slate-400 font-normal">로딩 중...</span>}
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {['종목명', '구분', '수량', '단가', '상태', '주문일'].map(h => (
                <th key={h} className="p-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
              : ORDERS.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-3 font-medium">{order.stockName}</td>
                    <td className="p-3">
                      <Badge variant={order.side === 'BUY' ? 'default' : 'outline'}>
                        {order.side === 'BUY' ? '매수' : '매도'}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">{order.qty.toLocaleString()}</td>
                    <td className="p-3 text-right">{order.price.toLocaleString()}</td>
                    <td className="p-3">
                      <Badge variant={
                        order.status === 'CONFIRMED' ? 'default'
                        : order.status === 'CANCELLED' ? 'destructive'
                        : 'secondary'
                      }>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-slate-400">{order.orderDate}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </section>

    </div>
  )
}
