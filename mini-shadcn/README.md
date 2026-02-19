# Mini Shadcn UI - Tailwind CSS v4 + Vite + React 설정 가이드

## 개요

-tailwindcss와 shadcn/ui를 사용하는 방법을 익히는 연습프로젝트

## 프로젝트 생성

```bash
npm create vite@latest mini-shadcn -- --template react-ts
cd mini-shadcn
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install -D @types/node
npx shadcn@latest init
npm install -D tailwindcss @tailwindcss/vite
```

## 📦 주요 버전

```json
{
  "tailwindcss": "^4.1.18",
  "@tailwindcss/vite": "^4.1.18",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "vite": "^7.3.1"
}
```

## 🔧 필수 설정 파일

### 1. `vite.config.ts`

Tailwind CSS v4는 **Vite 플러그인 방식**을 사용합니다.

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // 필수
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // @tailwindcss/vite 플러그인 등록
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**⚠️ 중요:** `@tailwindcss/vite` 플러그인이 없으면 Tailwind CSS가 작동하지 않습니다.

### 2. `tailwind.config.cjs` (기본 설정)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. `src/index.css` (Tailwind CSS v4 문법)

```css
@import "tailwindcss";

:root {
    --radius: 0.625rem;
    --background: oklch(1 0 0);
    --foreground: oklch(0.129 0.042 264.695);
    /* ... 기타 CSS 변수 ... */
}

.dark {
    --background: oklch(0.129 0.042 264.695);
    /* ... 다크 모드 CSS 변수 ... */
}
```

**⚠️ 중요 (Tailwind CSS v4 문법):**

- ✅ `@import "tailwindcss";` 사용
- ❌ `@plugin` 직접 사용 불가 (PostCSS 플러그인에서 등록하는 방식은 구식)
- ❌ `@theme inline { }` 블록 사용 불가
- ❌ `@custom-variant` 사용 불가
- CSS 변수는 `:root` 및 `.dark` 클래스에서 정의

## ❌ 피해야 할 설정

### PostCSS 설정은 불필요

**`postcss.config.cjs` 파일을 만들지 마세요!**

Tailwind CSS v4 + Vite 조합에서는 PostCSS 플러그인 형식이 더 이상 필요 없습니다.

**구식 설정 (작동 안 함):**

```javascript
// ❌ 사용하지 마세요
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},  // 이것도 필요 없음
  },
}
```

### index.css에서 사용하면 안 되는 것들

```css
/* ❌ 다음은 모두 Tailwind CSS v4에서 사용 불가 */
@plugin "tailwindcss-animate";  /* 이 방식은 구식 */
@custom-variant dark (&:is(.dark *));  /* 문법 오류 */
@theme inline { /* ... */ }  /* 작동 안 함 */
```

## 🚀 개발 서버 실행

```bash
npm run dev
```

## 📝 주요 차이점: v3 vs v4

| 항목 | Tailwind CSS v3 | Tailwind CSS v4 |
|------|----------------|-----------------|
| 설정 방식 | PostCSS 플러그인 | Vite 플러그인 (`@tailwindcss/vite`) |
| 색상 형식 | HEX, RGB | oklch 권장 |
| CSS 문법 | `@layer`, `@apply` | `@import "tailwindcss"` |
| PostCSS 필요 | ✅ 필수 | ❌ 불필요 |

## 💡 트러블슈팅

### 에러: "Can't resolve 'tailwindcss'"

→ `vite.config.ts`에 `@tailwindcss/vite` 플러그인이 등록되어 있는지 확인

### 에러: "PostCSS 플러그인 로드 실패"

→ `postcss.config.cjs` 파일을 **삭제**하세요. v4에서는 필요 없습니다.

### 에러: "Can't parse @theme inline"

→ `index.css`에서 `@theme inline` 블록을 제거하고, CSS 변수를 `:root`에서 정의하세요.

### 에러: "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin"

→ 1. `postcss.config.cjs` 삭제
→ 2. `vite.config.ts`에 `tailwindcss()` 플러그인 확인

## 🎯 설정 체크리스트

- [ ] `vite.config.ts`에 `@tailwindcss/vite` 플러그인 등록됨
- [ ] `src/index.css`에 `@import "tailwindcss";` 있음
- [ ] `postcss.config.cjs` 파일이 **없음**
- [ ] CSS 변수가 `:root` 또는 `.dark`에서 정의됨
- [ ] `npm run dev` 정상 실행됨
