# Tailwind CSS v4 + Shadcn UI 설정 가이드

이 문서는 React, Vite, Tailwind CSS v4 환경에서 Shadcn UI를 수동으로 설정하는 방법을 설명합니다. 특히 Tailwind v4의 "CSS-first configuration" 방식에 맞춰져 있습니다.

## 1. 프로젝트 생성 (Vite + React + TypeScript)

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

## 2. 모듈 설치 및 호환 버전

아래 버전들은 현재 프로젝트에서 검증된 호환 버전입니다.

| 패키지 | 버전 (예시) | 설명 |
| --- | --- | --- |
| `react` | `^19.0.0` | React 라이브러리 |
| `vite` | `^6.0.0` 이상 | 빌드 도구 (Tailwind v4는 Vite 플러그인 방식 권장) |
| `tailwindcss` | `^4.0.0` | Tailwind CSS v4 |
| `@tailwindcss/vite` | `^4.0.0` | Tailwind용 Vite 플러그인 |
| `lucide-react` | `^0.300.0` 이상 | 아이콘 라이브러리 |
| `clsx`, `tailwind-merge` | 최신 | 유틸리티 함수용 |

### 필수 패키지 설치 명령어

```bash
# Tailwind CSS v4 및 관련 플러그인 설치
npm install tailwindcss @tailwindcss/vite

# Shadcn UI 및 유틸리티 의존성 설치
npm install clsx tailwind-merge class-variance-authority lucide-react tailwindcss-animate @radix-ui/react-slot
```

## 3. 설정 파일 구성

### 3.1. `vite.config.ts` 설정

`@tailwindcss/vite` 플러그인을 추가하고, `@` 경로 별칭(alias)을 설정합니다. `path` 모듈을 사용하기 위해 `@types/node`가 필요할 수 있습니다 (`npm install -D @types/node`).

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 3.2. `tsconfig.json` (또는 `tsconfig.app.json`) 설정

TypeScript가 `@` 별칭을 인식하도록 `baseUrl`과 `paths`를 추가합니다.

```json
{
  "compilerOptions": {
    // ... 기존 설정들 ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 3.3. `src/index.css` 설정 (Tailwind v4 핵심)

Tailwind v4에서는 `tailwind.config.js` 대신 CSS 파일 내에서 직접 설정을 관리하는 것이 권장됩니다. Shadcn UI의 색상 변수들도 여기에 정의합니다.

```css
@import "tailwindcss";

@plugin "tailwindcss-animate";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --popover: #ffffff;
  --popover-foreground: #0f172a;
  --primary: #2563eb;
  --primary-foreground: #ffffff;
  --secondary: #e2e8f0;
  --secondary-foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #06b6d4;
  --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #3b82f6;
  --radius: 0.625rem;
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #0f172a;
  --card-foreground: #f8fafc;
  --popover: #0f172a;
  --popover-foreground: #f8fafc;
  --primary: #3b82f6;
  --primary-foreground: #0f172a;
  --secondary: #1e293b;
  --secondary-foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --accent: #0e7490;
  --accent-foreground: #f8fafc;
  --destructive: #ef4444;
  --destructive-foreground: #f8fafc;
  --border: #1e293b;
  --input: #1e293b;
  --ring: #1d4ed8;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## 4. 유틸리티 파일 생성 (`src/lib/utils.ts`)

Shadcn UI 컴포넌트가 사용하는 `cn` 함수를 만듭니다.

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 5. 컴포넌트 추가 (`src/components/ui/button.tsx`)

이제 `components/ui` 폴더에 원하는 컴포넌트 소스를 복사해 넣으면 바로 작동합니다. Tailwind v4가 `src/index.css`의 설정을 자동으로 읽어옵니다.

**참고:** `tailwind.config.js` 파일은 생성하지 **않습니다**. 만약 존재한다면 Tailwind v4가 이를 우선순위로 읽으려 하거나 충돌이 발생할 수 있으므로 삭제하는 것이 좋습니다(ESM 환경인 경우 특히 주의).

## 6. 체크리스트

- [ ] `package.json`에 `type: "module"`이 설정되어 있는가?
- [ ] `tailwind.config.js` 파일이 **없는가**? (CSS 파일로 설정 통합)
- [ ] `vite.config.ts`에 `tailwindcss()` 플러그인이 추가되었는가?
- [ ] 개발 서버(`npm run dev`)를 재시작했는가? (설정 변경 후 재시작 필요)
