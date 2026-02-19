export interface Fund {
    id: number;
    name: string;
    type: string;
    manager: string;
}
//매도/매수 구분
export type OrderSide= 'BUY' | 'SELL';

//주문상태
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED';

export interface Order {
    id: number;
    fundId: number;
    stockCode: string;
    stockName: string;
    side: OrderSide;
    qty: number;
    price: number;
    status: OrderStatus;
}
export type OrderRequest = Omit<Order, 'id'>;