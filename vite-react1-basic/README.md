# React + TypeScript + Vite

## 개요

1. vite + react + ts 기본 프로젝트의 생성
2. 기초 연습용 프로젝트

## 프로젝트의 생성 swc 사용

```bash
npm create vite@latest vite-react1-basic -- --template react-swc-ts
```

## tailwindcss의 적용

- Tailwind v4 방식입니다.
- v4부터는 tailwind.config.js 파일이 필요 없고 @tailwindcss/vite 플러그인 방식으로 훨씬 간단해졌습니다.

1. 설치

```bash
npm install -D tailwindcss @tailwindcss/vite
```

2.vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // 추가
  ],
})
```

3.index.css

```css
@import "tailwindcss";

```

## pages - router

1. 설치

```bash
npm install react-router-dom
```

1. pages 폴더 생성

- 하위에 components를 만든다.

  ```ts
  // src/pages/Dashboard.tsx
  const Dashboard = () => <div><h2 className="text-2xl font-bold">대시보드</h2></div>
  export default Dashboard

  // src/pages/Orders.tsx
  const Orders = () => <div><h2 className="text-2xl font-bold">주문관리</h2></div>
  export default Orders

  // src/pages/Funds.tsx
  const Funds = () => <div><h2 className="text-2xl font-bold">펀드현황</h2></div>
  export default Funds
 
  ```

1. App.tsx에 router 설치
  
```ts
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto bg-white">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/funds" element={<Funds />} />
              {/* 다른 라우트 추가 가능 */}
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
```

3. 핵심개념

- BrowserRouter 라우터 최상위 감싸는 컨테이너
- Routes + Route URL에 따라 컴포넌트 매핑
- Link 일반 페이지 이동 (<a> 대체)
- NavLink 현재 경로 활성화 스타일 적용 가능
- Navigate 리다이렉트 처리
- useNavigate() 코드에서 프로그래밍 방식으로 이동
