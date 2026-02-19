import type { Fund } from "@/types";
import type { Order, OrderRequest } from "../types";
import { useEffect, useState } from "react";
import { useCreateOrder, useUpdateOrder } from "../hooks/useOrders";

interface Props {
    funds : Fund[];
    editTarget : Order | null; // null 추가, Order 수정
    onClose: () => void;
}

const EMPTY_FORM = {
    fundId: 0,
    stockCode: '',
    stockName: '',
    side: 'BUY' as const,
    qty: 0,
    price: 0,
    status : 'PENDING' as const,
}
export default function OrderForm({ funds, editTarget, onClose }: Props) {
    const [form, setForm] = useState<OrderRequest>(EMPTY_FORM);
    const createMutation = useCreateOrder();
    const updateMutation = useUpdateOrder();
    const isEdit = editTarget !== null;

    //편집 모드 진입 시 폼 초기화
    useEffect(() => {
        if (editTarget) {
            const { id, ...rest } = editTarget; //id 제외한 나머지 필드만 폼에 설정
            setForm(rest);
        } else {
            setForm(EMPTY_FORM);
        }
    }, [editTarget]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'qty' || name === 'price' || name === 'fundId' ? Number(value) : value, //숫자 필드 변환
        }));
        };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.fundId === 0)  return alert('펀드를 선택해주세요.');
        if (form.stockCode.trim() === '') return alert('종목코드를 입력해주세요.');
        if (form.stockName.trim() === '') return alert('종목명을 입력해주세요.');
        if (form.qty <= 0) return alert('수량은 1 이상이어야 합니다.');
        if (form.price <= 0) return alert('단가는 1 이상이어야 합니다.');

        if (isEdit && editTarget) {
            updateMutation.mutate({ id: editTarget.id, ...form }, { onSuccess: onClose });
        } else {
            createMutation.mutate(form, { onSuccess: onClose });
        }
    }
    return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>
          {isEdit ? '✏️ 주문 수정' : '➕ 주문 등록'}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* 펀드 선택 */}
          <label style={styles.label}>펀드</label>
          <select
            name="fundId"
            value={form.fundId}
            onChange={handleChange}
            style={styles.input}
          >
            <option value={0}>-- 선택 --</option>
            {funds.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>

          {/* 종목코드 */}
          <label style={styles.label}>종목코드</label>
          <input
            name="stockCode"
            value={form.stockCode}
            onChange={handleChange}
            placeholder="005930"
            maxLength={6}
            style={styles.input}
          />

          {/* 종목명 */}
          <label style={styles.label}>종목명</label>
          <input
            name="stockName"
            value={form.stockName}
            onChange={handleChange}
            placeholder="삼성전자"
            style={styles.input}
          />

          {/* 매수/매도 */}
          <label style={styles.label}>구분</label>
          <select
            name="side"
            value={form.side}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="BUY">매수</option>
            <option value="SELL">매도</option>
          </select>

          {/* 수량 */}
          <label style={styles.label}>수량</label>
          <input
            name="qty"
            type="number"
            value={form.qty}
            onChange={handleChange}
            min={1}
            style={styles.input}
          />

          {/* 단가 */}
          <label style={styles.label}>단가</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            min={1}
            style={styles.input}
          />

          {/* 상태 — 수정 모드일 때만 표시 */}
          {isEdit && (
            <>
              <label style={styles.label}>상태</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="CANCELED">CANCELED</option>
              </select>
            </>
          )}

          <div style={styles.btnRow}>
            <button
              type="button"
              onClick={onClose}
              style={styles.btnCancel}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              style={styles.btnSubmit}
            >
              {createMutation.isPending || updateMutation.isPending ? '처리 중...' : isEdit ? '수정' : '등록'}
            </button>
          </div>

        </form>
      </div>
    </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  modal: {
    background: '#fff',
    borderRadius: 10,
    padding: 32,
    width: 400,
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
  title: { marginBottom: 20, fontSize: 18, color: '#1a1a2e' },
  form: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 12, color: '#666', fontWeight: 600, marginTop: 4 },
  input: {
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: 6,
    fontSize: 14,
    outline: 'none',
  },
  btnRow: {
    display: 'flex',
    gap: 8,
    marginTop: 16,
    justifyContent: 'flex-end',
  },
  btnCancel: {
    padding: '8px 20px',
    border: '1px solid #ddd',
    borderRadius: 6,
    background: '#f5f5f5',
    cursor: 'pointer',
    fontSize: 14,
  },
  btnSubmit: {
    padding: '8px 20px',
    border: 'none',
    borderRadius: 6,
    background: '#4f46e5',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
}