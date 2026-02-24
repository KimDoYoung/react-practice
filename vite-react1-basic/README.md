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

##
