export type OrderSide   = 'BUY' | 'SELL'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'

export interface Order {
  id: number
  fundId: number
  fundName: string
  stockCode: string
  stockName: string
  side: OrderSide
  qty: number
  price: number
  status: OrderStatus
  orderDate: string   // 'YYYY-MM-DD'
}

export const ORDERS: Order[] = [
  { id: 1, fundId: 1, fundName: '삼성 성장형',    stockCode: '005930', stockName: '삼성전자',  side: 'BUY',  qty: 100, price: 75000,  status: 'PENDING',   orderDate: '2026-02-10' },
  { id: 2, fundId: 1, fundName: '삼성 성장형',    stockCode: '000660', stockName: 'SK하이닉스', side: 'SELL', qty:  50, price: 180000, status: 'CONFIRMED', orderDate: '2026-02-11' },
  { id: 3, fundId: 2, fundName: 'KB 안정형',      stockCode: '035420', stockName: 'NAVER',    side: 'BUY',  qty:  30, price: 220000, status: 'PENDING',   orderDate: '2026-02-12' },
  { id: 4, fundId: 2, fundName: 'KB 안정형',      stockCode: '051910', stockName: 'LG화학',   side: 'BUY',  qty:  20, price: 350000, status: 'CANCELLED', orderDate: '2026-02-13' },
  { id: 5, fundId: 3, fundName: '미래에셋 글로벌', stockCode: '247540', stockName: '에코프로비엠', side: 'SELL', qty:  10, price: 150000, status: 'CONFIRMED', orderDate: '2026-02-14' },
]