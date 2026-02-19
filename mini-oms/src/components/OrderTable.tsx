import type {Fund, Order} from "@/types";
import { useDeleteOrder } from "@/hooks/useOrders";

interface Props {
    orders : Order[];
    funds : Fund[];
    onEdit : (order: Order) => void;
}

//상태별 색상
const statusColors: Record<string, string> = {
    'PENDING': '#f59e0b', //노란색
    'CONFIRMED': '#10b981', //초록색
    'CANCELED': '#ef4444', //빨간색
};

export default function OrderTable({ orders, funds, onEdit }: Props) {
    const deleteMutation = useDeleteOrder();
    const getFundName = (fundId: number) => {
        const fund = funds.find(f => f.id === fundId);
        return fund ? fund.name : 'Unknown Fund';
    };
    const handleDelete = (order: Order) => {
        if (window.confirm(`${order.stockName} 주문을 삭제하시겠습니까?`)) {
            deleteMutation.mutate(order.id);
        }
    };  
    if(orders.length === 0) {
        return <p className="text-center text-gray-500">주문이 없습니다.</p>;
    }
    return (
        <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
            <thead>
            <tr style={styles.thead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>펀드</th>
                <th style={styles.th}>종목코드</th>
                <th style={styles.th}>종목명</th>
                <th style={styles.th}>구분</th>
                <th style={styles.th}>수량</th>
                <th style={styles.th}>단가</th>
                <th style={styles.th}>금액</th>
                <th style={styles.th}>상태</th>
                <th style={styles.th}>작업</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order.id} style={styles.tr}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{getFundName(order.fundId)}</td>
                <td style={{ ...styles.td, fontFamily: 'monospace' }}>
                    {order.stockCode}
                </td>
                <td style={styles.td}>{order.stockName}</td>
                <td style={styles.td}>
                    <span style={{
                    ...styles.badge,
                    background: order.side === 'BUY' ? '#dbeafe' : '#fce7f3',
                    color:      order.side === 'BUY' ? '#1d4ed8' : '#be185d',
                    }}>
                    {order.side === 'BUY' ? '매수' : '매도'}
                    </span>
                </td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                    {order.qty.toLocaleString()}
                </td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                    {order.price.toLocaleString()}
                </td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                    {(order.qty * order.price).toLocaleString()}
                </td>
                <td style={styles.td}>
                    <span style={{
                    ...styles.badge,
                    background: statusColors[order.status] + '22',
                    color: statusColors[order.status],
                    }}>
                    {order.status}
                    </span>
                </td>
                <td style={styles.td}>
                    <button
                    onClick={() => onEdit(order)}
                    style={styles.btnEdit}
                    >
                    수정
                    </button>
                    <button
                    onClick={() => handleDelete(order)}
                    disabled={deleteMutation.isPending}
                    style={styles.btnDelete}
                    >
                    삭제
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}
const styles: Record<string, React.CSSProperties> = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
    background: '#fff',
  },
  thead: { background: '#1a1a2e' },
  th: {
    padding: '10px 12px',
    color: '#e2e8f0',
    fontWeight: 600,
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '10px 12px', color: '#374151', verticalAlign: 'middle' },
  badge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
  },
  btnEdit: {
    marginRight: 6,
    padding: '4px 10px',
    border: '1px solid #6366f1',
    borderRadius: 4,
    background: '#fff',
    color: '#6366f1',
    cursor: 'pointer',
    fontSize: 12,
  },
  btnDelete: {
    padding: '4px 10px',
    border: '1px solid #ef4444',
    borderRadius: 4,
    background: '#fff',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: 12,
  },
}