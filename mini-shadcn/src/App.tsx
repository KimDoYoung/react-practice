import { JSX, useState } from 'react'
import { Toaster } from 'sonner'
import Sidebar from '@/components/layout/Sidebar'
import ButtonPage from '@/pages/ButtonPage'
import CardBadgePage from '@/pages/CardBadgePage'
import TablePage from '@/pages/TablePage'
import TabsPage from '@/pages/TabsPage'
import FormPage from '@/pages/FormPage'
import DialogPage from '@/pages/DialogPage'
import CalendarPage from '@/pages/CalendarPage'
import ToastPage from '@/pages/ToastPage'
import SkeletonPage from '@/pages/SkeletonPage'

const PAGES: Record<string, JSX.Element> = {
  'button': <ButtonPage />,
  'card-badge': <CardBadgePage />,
  'table': <TablePage />,
  'tabs': <TabsPage />,
  'form': <FormPage />,
  'dialog': <DialogPage />,
  'calendar': <CalendarPage />,
  'toast': <ToastPage />,
  'skeleton': <SkeletonPage />,
}

export default function App() {
  const [current, setCurrent] = useState('button')

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <Sidebar current={current} onChange={setCurrent} />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8 bg-slate-100 overflow-y-auto">
        {PAGES[current] ?? (
          <p className="text-slate-400">준비 중입니다.</p>
        )}
      </main>

      {/* Sonner Toast — 앱 전체에서 사용 가능 */}
      <Toaster richColors position="top-right" />
    </div>
  )
}
