# mino-oms

## 개요

json server, tanstack, axio를 사용해서 api 호출을 공부하는 proejct

## tables

### funds

```text
id | name          | type   | manager
 1 | 삼성 성장형   | 주식형  | 김운용
 2 | KB 안정형     | 채권형  | 이운용
```

### orders

```text
id | fundId | stockCode | side | qty | price  | status
 1 |   1    |  005930   | BUY  | 100 | 75000  | PENDING
 2 |   1    |  000660   | SELL |  50 | 180000 | CONFIRMED
```

## 기능

1. 펀드목록조회 useQuery
2. 주문 목록 조회 useQuery
3. 주문 등록 useMutation
4. 주문 수정 useMutation
5. 주문 삭제 useMutation

## 폴더 구조

```text
mini-oms/
├── db.json                  ← json-server 데이터
├── package.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── lib/
    │   └── apiClient.ts     ← axios 인스턴스
    ├── api/
    │   ├── fundsApi.ts      ← funds HTTP 함수
    │   └── ordersApi.ts     ← orders HTTP 함수
    ├── hooks/
    │   ├── useFunds.ts      ← useQuery
    │   └── useOrders.ts     ← useQuery + useMutation
    └── components/
        ├── OrderTable.tsx
        └── OrderForm.tsx
```

## 작성단계

```
Step 1  : Vite로 React 프로젝트 생성
Step 2  : 패키지 설치 (axios, tanstack query, json-server)
Step 3  : 폴더 구조 만들기
Step 4  : db.json 작성 (json-server 데이터)
Step 5  : vite.config.ts 수정 (proxy 설정)
Step 6  : main.tsx 수정 (QueryClientProvider)
Step 7  : apiClient.ts 작성 (axios 인스턴스)
Step 8  : types.ts 작성 (TypeScript 타입)
Step 9  : fundsApi.ts 작성 (axios HTTP 함수)
Step 10 : ordersApi.ts 작성 (axios HTTP 함수)
Step 11 : useFunds.ts 작성 (useQuery)
Step 12 : useOrders.ts 작성 (useQuery + useMutation)
Step 13 : OrderTable.tsx 작성
Step 14 : OrderForm.tsx 작성
Step 15 : App.tsx 작성
Step 16 : 실행 및 확인
```

### step-1,2

```bash
npm create vite@latest mini-oms -- --template react-ts
cd mini-oms
npm install
npm install axios @tanstack/react-query @tanstack/react-query-devtools
npm install -D json-server concurrently
```

### step-3

- folder 구조
- mkdir -p src/lib src/api src/hooks src/components src/types

```text
mini-oms/
└── src/
    ├── lib/          ← axios 인스턴스
    ├── api/          ← HTTP 함수 (axios 직접 사용)
    ├── hooks/        ← TanStack Query 훅
    ├── components/   ← React 컴포넌트
    └── types/        ← TypeScript 타입 정의
```

### step-4

- package.json과 같은 폴더에 db.json 작성
- json-server가 이 파일을 읽어서 자동으로 REST API를 만들어 줍니다.
자동 생성되는 API설명GET    /funds펀드 목록 조회GET    /orders주문 목록 조회POST   /orders주문 등록PUT    /orders/:id주문 수정DELETE /orders/:id주문 삭제

### step-5

- package.json

```json
"scripts": {
  "dev": "concurrently \"npm run api\" \"npm run client\"",
  "client": "vite",
  "api": "json-server --watch db.json --port 3001",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
},
```

---

### 각 script 역할

| script | 설명 |
|--------|------|
| `npm run api` | json-server를 3001 포트로 실행 |
| `npm run client` | vite 개발서버를 3000 포트로 실행 |
| `npm run dev` | 위 두 개를 **동시에** 실행 |

---

### 동작 구조

```text
npm run dev 실행
    ├── json-server → <http://localhost:3001>  (API 서버)
    └── vite        → <http://localhost:3000>  (React 앱)
```

## STEP-6

- vite.config.ts 수정
-

### proxy가 필요한 이유

직접 `localhost:3001` 로 요청하면 **CORS 에러**가 발생합니다.
proxy를 쓰면 React 앱 입장에서는 같은 서버에 요청하는 것처럼 보여서 CORS 문제가 없습니다.

```
❌ 직접 요청
React(3000) → localhost:3001/orders    CORS 에러 발생

✅ proxy 사용
React(3000) → /api/orders
                  ↓ vite가 자동 변환
             localhost:3001/orders     정상 동작
```

### STEP-7,8

- code 작성

### STEP 9

- apiClient.ts 작성

#### 핵심 개념 — 인터셉터란?

```
요청 흐름
컴포넌트 → apiClient.get('/orders')
                  ↓
         [요청 인터셉터] ← JWT 토큰 첨부, 로그 출력
                  ↓
           json-server
                  ↓
         [응답 인터셉터] ← 에러 공통 처리, 로그 출력
                  ↓
            컴포넌트로 데이터 반환
```

#### 응답구조

```ts
// axios 응답 구조
{
  data: [ ... ],   // ← 실제 서버가 보낸 데이터
  status: 200,
  headers: { ... },
  config: { ... },
}

// 구조분해로 data 만 꺼냄
const { data } = await apiClient.get('/orders')

// 타입도 같이 지정 가능
const { data } = await apiClient.get<Order[]>('/orders')
//                                  ^^^^^^^^
//                          data 가 Order[] 타입임을 TypeScript 에 알려줌
```

## STEP-12

- useFunds.ts

```
const {
  data,        // API 가 반환한 실제 데이터 (Fund[])
  isLoading,   // 최초 로딩 중 여부 (true/false)
  isFetching,  // 백그라운드 재조회 중 여부 (true/false)
  isError,     // 에러 발생 여부 (true/false)
  error,       // 에러 객체
  refetch,     // 수동으로 다시 조회하는 함수
} = useFunds()
```

---

### 핵심 개념 — queryKey 란?

```
queryKey: ['funds']
              │
              └── 이 키로 캐시에 데이터를 저장/조회
                  같은 키를 쓰는 useQuery 는 캐시를 공유

예시)
['funds']              → 펀드 전체 목록
['orders']             → 주문 전체 목록
['orders', 'detail', 1] → id 가 1인 주문 상세
```

---

### staleTime 동작 흐름

```
useFunds() 첫 호출
    │
    ▼
API 호출 → 데이터 캐시 저장
    │
    ▼
5분간 fresh 상태
    │  다른 컴포넌트에서 useFunds() 를 또 호출해도
    │  API 를 다시 부르지 않고 캐시에서 즉시 반환
    ▼
5분 경과 → stale 상태
    │  컴포넌트 마운트 or 탭 포커스 시 API 재호출
```

## OrderTables.tsx, OrderForm.tsx 작성

-

## App.tsx

```
### App.tsx 의 역할 정리
```

App.tsx
  │
  ├── useFunds()   → 펀드 데이터 조회 (캐시)
  ├── useOrders()  → 주문 데이터 조회 (캐시)
  │
  ├── OrderTable   → 목록 표시 + 삭제
  │     props: orders, funds, onEdit
  │
  └── OrderForm    → 등록/수정 모달
        props: funds, editTarget, onClose

```

## 요약
```

HTTP 호출        axios        apiClient.ts
                              fundsApi.ts
                              ordersApi.ts
                                  ↓
서버 상태 관리   TanStack     useFunds.ts
                Query        useOrders.ts
                                  ↓
화면 표시        React        OrderTable.tsx
                              OrderForm.tsx
                              App.tsx

```
