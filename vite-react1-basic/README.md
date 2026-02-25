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

1. 핵심개념

- BrowserRouter 라우터 최상위 감싸는 컨테이너
- Routes + Route URL에 따라 컴포넌트 매핑
- Link 일반 페이지 이동 (<a> 대체)
- NavLink 현재 경로 활성화 스타일 적용 가능
- Navigate 리다이렉트 처리
- useNavigate() 코드에서 프로그래밍 방식으로 이동

## component tree

- React 개발은 **"이 UI를 어떤 단위로 쪼갤까?"** 를 고민하는 작업

```text
src/
├── components/       ← 여러 페이지에서 공통으로 쓰는 것
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   └── common/
│       ├── StatsCard.tsx
│       └── DataTable.tsx
├── pages/            ← 라우터에 연결되는 페이지 단위
│   ├── Dashboard.tsx
│   ├── Orders.tsx
│   └── Funds.tsx
└── App.tsx
```

## zustand의 사용

- Header와 Sidebar는 부모-자식 관계가 아니라 형제 관계이기 때문에 props로 전달하기 어렵습니다.
- Header에서 **담고** Sidebar에서 **사용**

### store만들기

```ts
import {create} from 'zustand';

import { type Section, type MenuItem} from '@/types/menu';
import { MENU_MAP } from '@/constants/menuConfig';

interface MenuState {
    activeSection: Section;
    menuItems: MenuItem[];
    setSection: (section: Section) => void;
}

const useMenuStore = create<MenuState>((set) => ({
    activeSection: 'Backend',
    menuItems: MENU_MAP['Backend'],
    setSection: (section) => set(() => ({
        activeSection: section,
        menuItems: MENU_MAP[section],
    })),
}));

export default useMenuStore;
```

### Header에서 담기

```ts
const Header = () => {
  const dateString = getFormattedDate();
  const {activeSection, setSection} = useMenuStore();

  return (
    <header className="bg-blue-500 text-white h-16 flex items-center px-6 shadow-md">
      <div className="text-xl font-bold">Oms-technote</div>
      <nav className="flex gap-6 ml-6">
        {Sections.map((section) => (
          <a
            key={section}
            className={getAnchorClassName(section, activeSection)}
            onClick={() => setSection(section)}
          >
            {section}
          </a>
        ))}
      </nav>
      <div className="ml-auto mr-6 text-sm">{dateString}</div>
    </header>
  )
}
```

### Sidebar에서 사용

```ts
const Sidebar = () => {
  const { activeSection, menuItems } = useMenuStore();
  ...
```

## import문법

| 구분 | Named Export | Default Export |
| :--- | :--- | :--- |
| **문법 (내보내기)** | `export const ...` | `export default ...` |
| **문법 (가져오기)** | `import { 정확한이름 }` | `import 이름자유롭게` |
| **중괄호 사용** | **필수 `{ }`** | **중괄호 없음** |
| **파일당 개수** | **여러 개 가능 ✅** | **단 하나만 가능** |
| **주요 용도** | 상수, 유틸 함수, 타입(Type) | 컴포넌트, 클래스, Store |
| **Java 비유** | `public static` 멤버들 | 파일의 메인 `public class` |

## cn 유틸리티의 사용

- class명을 붙이는 유틸리티
- libs/class-utils.ts
- clsx와 중복클래스를 제거
- clsx는 문자열을 붙이고 tw-merge는 중복클래스를 제거한다

### 설치

```bash
npm install clsx tailwind-merge
```

## json-server를 이용한 tanstack query

### 특징

- cache를 관리한다.

### 설치

- 패키지 설치

```bash
npm install axios @tanstack/react-query
npm install -D json-server
```

- package.json 수정

```json
  "scripts": {
    ...
    "server" : "json-server --watch db.json --port 3001"
```

### 구현

1. main.tsx에

```tsx
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry : 1, // Retry failed requests once
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
```

- QueryClient      → 캐시/상태 관리하는 저장소 생성
- QueryClientProvider → 앱 전체에 그 저장소를 공급
- Zustand의 store가 전역으로 접근 가능한 것처럼, `QueryClientProvider`로 앱 전체를 감싸야 **어느 컴포넌트에서든** `useQuery`, `useMutation`을 쓸 수 있게 됩니다.

> Zustand의 create()로 store 만들고 앱 어디서나 useStore()로 쓰는 것과 비슷한 개념입니다. TanStack Query는 그 공급 과정을 Provider로 명시적으로 해줘야 한다는 차이가 있습니다.

1. apiClient.ts : axios.create 를 하고 주고 받을 때 interceptor를 구현해 둔다.
   - request하기전데 token등 삽입
   - response한 후에 error가 있으면 에러로그 인쇄
2. api/apiFund.ts
   1. `api` 폴더에  apiFund의 crud api함수를 만든다.
3. 각 component에서 사용

```tsx
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['funds'],
        queryFn: fetchFunds,
    });

    if (isLoading) return <div className="p-6 text-gray-500">로딩 중...</div>
    if (isError)   return <div className="p-6 text-red-500">에러: {String(error)}</div>

                <tbody>
                {data?.map((fund) => (
                    <tr key={fund.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{fund.id}</td>
```

---

### 전체흐름

```text
json-server (port 3001)
    ↓  HTTP GET /funds
apiClient.ts (axios 인터셉터)
    ↓
fundApi.ts (fetchFunds)
    ↓
useQuery({ queryKey: ['funds'], queryFn: fetchFunds })
    ↓
isLoading → isError → data 순으로 처리
    ↓
테이블 렌더링
```

### tanstack query의 철학

- **stale-while-revalidate 전략**
- 캐시 데이터를 먼저 보여줘서 빠른 UX제공
- 백그라운드에서 최신 데이터 확인 후 교체

### useMutation

- Mutation의 사전적 정의는 "돌연변이" 또는 **"변화"**입니다.
- 데이터를 다룰 때 Mutation은 단순히 데이터를 읽어오는 것(Read)이 아니라, 기존의 데이터를 "변형"시키거나 "새로 만드는" 모든 행위를 뜻합니다.
  
## react hook form 과 zod

### zod란?

- 스키마 기반 유효성 검사 라이브러리입니다. react-hook-form과 단짝처럼 같이 쓰입니다.
- 스키마를 한 곳에서 관리

```ts
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// 스키마 정의 (타입 + 유효성 검사 한번에)
const fundSchema = z.object({
  name: z.string().min(2).max(50),
  nav: z.number().min(0).max(999999),
  startDate: z.string(),
  endDate: z.string(),
}).refine(
  (data) => data.endDate > data.startDate,
  { message: '종료일은 시작일 이후여야 합니다' }  // 필드 간 비교 검증
)

// 타입 자동 생성
type FundFormData = z.infer<typeof fundSchema>

// useForm에 resolver로 연결
const { register, handleSubmit } = useForm<FundFormData>({
  resolver: zodResolver(fundSchema),
})

// input은 깔끔해짐
{...register('name')}
{...register('nav', { valueAsNumber: true })}
```

### 설치

```bash
npm install zod @hookform/resolvers
```

### types/fund.ts

- zod를 이용한 타입설정
