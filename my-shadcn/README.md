# vite + react + shadcd-ui

## 개요

- vite,react, ts, shadcd-ui 프로젝트를 생성
- shadcd의 능력을 테스트

## 설치

- project 명 : my-shadcn

### 1. 프로젝트의 생성

  ```bash
    npm create vite@latest my-shadcn -- --template react-swc-ts
    cd my-shadcn
  ```

### 2. Tailwind css v4 및 관련 도구 설치

```bash
npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
```

### 3. src/index.css 설정

```css
@import "tailwindcss"
```

### 4. tsconfig.json 설정

```json
{
  "compilerOptions": {
    // ... 기존 설정 유지
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 5. vite.config.ts

```ts
import path from "path"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### 6. shadcn-ui 초기화

```bash
npx shadcn@latest init
```

## '@'의 사용

- tsconfig.app.json

```json
    /* 경로 별칭(Alias) 설정 추가 */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
```

## shadcd 각 UI component 추가

- src/component/ui에 생김

```bash
npx shadcn@latest add sidebar
npx shadcn@latest add breadcrumb
npx shadcn@latest add table
npx shadcn@latest add badge

```

## components 폴더 구성

```text
src/
├── components/
│   ├── ui/             # npx shadcn-ui로 설치되는 기본 컴포넌트 (Raw)
│   ├── shared/         # 앱 전역에서 쓰는 커스텀 UI (Layout, Navbar 등)
│   └── domains/        # oms-proto의 비즈니스 로직별 컴포넌트
│       └── orders/
│           ├── order-table.tsx
│           ├── order-detail-sheet.tsx
│           └── order-schema.ts
├── hooks/              # API 호출 logic (TanStack Query)
└── pages/              # 각 메뉴별 페이지 구성
````
