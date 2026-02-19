import {useState} from 'react';
import { useFunds } from '@/hooks/useFunds';
import { useOrders } from '@/hooks/useOrders';
import OrderTable from '@/components/OrderTable';
import OrderForm from '@/components/OrderForm';
import type { Order } from './types';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  // 수정 주문, null 이면 새 주문
  const [editTarget, setEditTarget] = useState<Order | null>(null);

  //-- 데이터 조회
  const {data : funds = [], isLoading : fundsLoading} = useFunds();
  const  {
      data : orders = [], 
      isLoading : ordersLoading,
      isError
    } = useOrders();
  const handleAddClick = () => {
    setEditTarget(null);
    setShowForm(true);
  }
  const handleEditClick = (order: Order) => {
    setEditTarget(order);
    setShowForm(true);
  }
  const handleClose = () => {
    setShowForm(false);
    setEditTarget(null);
  }
  return (
    <div style={styles.layout}>

      {/* ── 헤더 ───────────────────────────────────────────── */}
      <header style={styles.header}>
        <h1 style={styles.logo}>📊 Mini OMS</h1>
        <span style={styles.subtext}>axios + TanStack Query 학습용</span>
      </header>

      {/* ── 메인 ───────────────────────────────────────────── */}
      <main style={styles.main}>

        {/* 펀드 카드 목록 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>펀드 목록</h2>
          {fundsLoading ? (
            <p>로딩 중...</p>
          ) : (
            <div style={styles.cardRow}>
              {funds.map((f) => (
                <div key={f.id} style={styles.card}>
                  <strong>{f.name}</strong>
                  <span style={styles.cardSub}>
                    {f.type} | {f.manager}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 주문 목록 테이블 */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>주문 목록</h2>
            <button onClick={handleAddClick} style={styles.btnAdd}>
              + 주문 등록
            </button>
          </div>

          {ordersLoading && <p>주문 데이터 로딩 중...</p>}
          {isError      && <p style={{ color: 'red' }}>⚠️ 데이터 로드 실패</p>}

          {!ordersLoading && !isError && (
            <OrderTable
              orders={orders}
              funds={funds}
              onEdit={handleEditClick}
            />
          )}
        </section>

      </main>

      {/* ── 모달 폼 ────────────────────────────────────────── */}
      {showForm && (
        <OrderForm
          funds={funds}
          editTarget={editTarget}
          onClose={handleClose}
        />
      )}

    </div>    
  )
}

const styles: Record<string, React.CSSProperties> = {
  layout: { minHeight: '100vh', background: '#f0f2f5' },
  header: {
    background: '#1a1a2e',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  logo: { color: '#fff', fontSize: 22, fontWeight: 700 },
  subtext: { color: '#94a3b8', fontSize: 13 },
  main: { padding: '24px 32px', maxWidth: 1200, margin: '0 auto' },
  section: {
    background: '#fff',
    borderRadius: 10,
    padding: 24,
    marginBottom: 24,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 12,
  },
  cardRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minWidth: 160,
  },
  cardSub: { fontSize: 12, color: '#94a3b8' },
  btnAdd: {
    padding: '8px 18px',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
  },
}