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

