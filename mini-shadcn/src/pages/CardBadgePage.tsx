import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { FUNDS } from '@/data/funds'
import { ORDERS } from '@/data/orders'
import type { OrderStatus, OrderSide } from '@/data/orders'

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    PENDING: 'secondary',
    CONFIRMED: 'default',
    CANCELLED: 'destructive',
}

const sideVariant: Record<OrderSide, 'default' | 'outline'> = {
    BUY: 'default',
    SELL: 'outline',
}

export default function CardBadgePage() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Card · Badge · Progress</h1>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-700">Card — 펀드 요약</h2>
                <div className="grid grid-cols-3 gap-4">
                    {FUNDS.map((fund) => (
                        <Card key={fund.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{fund.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Badge variant="outline">{fund.type}</Badge>
                                <p className="text-sm text-slate-500">운용역 : {fund.manager}</p>
                                <p className="text-sm font-semibold text-emerald-600">
                                    수익률 : +{fund.returnRate}%
                                </p>
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400">운용규모</p>
                                    <Progress value={fund.aumRate} className="h-2" />
                                    <p className="text-xs text-slate-400 text-right">{fund.aumRate}%</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-slate-700">Badge — 주문 상태 / 구분</h2>
                <div className="space-y-2">
                    <p className="text-sm text-slate-500">주문 상태</p>
                    <div className="flex gap-3">
                        <Badge variant="outline">   PENDING   </Badge>
                        <Badge variant="default">     CONFIRMED  </Badge>
                        <Badge variant="destructive"> CANCELLED  </Badge>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-sm text-slate-500">매수 / 매도</p>
                    <div className="flex gap-3">
                        <Badge variant="default" className="text-green-500"> 매수 BUY  </Badge>
                        <Badge variant="outline" className="text-red-500 bg-amber-100 p-2"> 매도 SELL </Badge>
                    </div>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-slate-700">주문 목록에서 Badge 활용</h2>
                <div className="space-y-2">
                    {ORDERS.map((order) => (
                        <div key={order.id}
                            className="flex items-center justify-between p-3 border rounded-md"
                        >
                            <div className="flex items-center gap-3">
                                <Badge variant={sideVariant[order.side]}>
                                    {order.side === 'BUY' ? '매수' : '매도'}
                                </Badge>
                                <span className="text-sm font-medium">{order.stockName}</span>
                                <span className="text-xs text-slate-400">{order.stockCode}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-slate-500">{order.fundName}</span>
                                <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}