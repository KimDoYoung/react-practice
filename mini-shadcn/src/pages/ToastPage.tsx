import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function ToastPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Sonner Toast</h1>

      {/* ── 기본 Toast 종류 ──────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Toast 종류</h2>
        <div className="flex gap-3 flex-wrap">
          <Button variant="outline"
            onClick={() => toast('기본 알림 메시지입니다')}>
            기본
          </Button>
          <Button variant="outline"
            onClick={() => toast.success('주문이 성공적으로 접수되었습니다')}>
            success
          </Button>
          <Button variant="outline"
            onClick={() => toast.error('주문 처리 중 오류가 발생했습니다')}>
            error
          </Button>
          <Button variant="outline"
            onClick={() => toast.warning('잔고가 부족합니다. 확인하세요')}>
            warning
          </Button>
          <Button variant="outline"
            onClick={() => toast.info('장 마감 10분 전입니다')}>
            info
          </Button>
        </div>
      </section>

      {/* ── 옵션 설정 ────────────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">옵션</h2>
        <div className="flex gap-3 flex-wrap">

          {/* 지속 시간 */}
          <Button variant="outline" onClick={() => toast('5초 동안 표시됩니다', { duration: 5000 })}>
            5초 유지
          </Button>

          {/* 닫기 버튼 */}
          <Button variant="outline" onClick={() => toast('닫기 버튼 포함', { closeButton: true })}>
            닫기 버튼
          </Button>

          {/* 설명 포함 */}
          <Button variant="outline" onClick={() =>
            toast('주문 접수 완료', {
              description: '삼성전자 100주 매수 주문이 접수되었습니다',
            })
          }>
            설명 포함
          </Button>

          {/* 액션 버튼 */}
          <Button variant="outline" onClick={() =>
            toast('주문을 취소하시겠습니까?', {
              action: {
                label: '취소 확인',
                onClick: () => toast.error('주문이 취소되었습니다'),
              },
            })
          }>
            액션 버튼
          </Button>

        </div>
      </section>

      {/* ── OMS 실전 예시 ────────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">OMS 실전 예시</h2>
        <div className="flex gap-3 flex-wrap">

          <Button onClick={() =>
            toast.success('주문 접수 완료', {
              description: '삼성전자 100주 매수 | 75,000원',
              duration: 4000,
            })
          }>
            주문 접수
          </Button>

          <Button variant="destructive" onClick={() =>
            toast.error('주문 실패', {
              description: '잔고가 부족합니다. 현재 잔고를 확인하세요.',
              duration: 5000,
            })
          }>
            주문 실패
          </Button>

          <Button variant="outline" onClick={() =>
            toast.warning('미체결 주문 알림', {
              description: '오늘 마감 전 미체결 주문 3건이 있습니다',
              action: {
                label: '확인',
                onClick: () => console.log('미체결 주문 확인'),
              },
            })
          }>
            미체결 알림
          </Button>

        </div>
      </section>
    </div>
  )
}
