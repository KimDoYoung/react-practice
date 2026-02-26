# ApiDocs 코드 분석 - 논리적 흐름 정리

---

## 전체 구조 한눈에 보기

```
ApiDocs.tsx
│
├── 1. import 영역
├── 2. 상태(State) 선언
├── 3. useQuery          ← 목록 조회
├── 4. deleteMutation    ← 삭제
├── 5. createMutation    ← 등록
├── 6. updateMutation    ← 수정
├── 7. 로딩/에러 처리
└── 8. return (JSX)
    ├── 버튼 영역 (새로고침, 펀드 추가)
    ├── 등록 폼 (showForm일 때만)
    ├── 수정 폼 (editTarget일 때만)
    └── 테이블
        └── 행마다: 수정 버튼 / 삭제 버튼
```

---

## 1단계 - import 영역

```tsx
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { createFund, deleteFund, fetchFunds, updateFund } from '@/api/funcApi';
import FundForm from '@/components/FundForm';
import type { Fund, FundFormData } from "@/types/fund";
import { useState } from 'react';
```

| import | 역할 |
|--------|------|
| `useQuery` | 목록 조회 (GET) |
| `useQueryClient` | 캐시 무효화 (목록 갱신) |
| `useMutation` | 데이터 변경 (POST/PUT/DELETE) |
| `createFund` | POST /funds |
| `deleteFund` | DELETE /funds/:id |
| `fetchFunds` | GET /funds |
| `updateFund` | PUT /funds/:id |
| `FundForm` | 등록/수정 폼 컴포넌트 |
| `Fund` | id 포함 전체 타입 |
| `FundFormData` | id 제외 폼 입력 타입 |
| `useState` | 로컬 상태 관리 |

---

## 2단계 - 상태(State) 선언

```tsx
const queryClient = useQueryClient()
const [showForm, setShowForm]     = useState(false);
const [editTarget, setEditTarget] = useState<Fund | null>(null);
```

### 각 상태의 역할

**`queryClient`**
- TanStack Query의 캐시를 직접 조작하는 도구
- `invalidateQueries`로 특정 쿼리 캐시를 무효화 → 자동 재조회

**`showForm`**
- 등록 폼의 열림/닫힘 제어
- `false`: 폼 숨김 / `true`: 폼 표시

**`editTarget`**
- 수정 대상 펀드 데이터 저장
- `null`: 수정 폼 숨김 / `Fund 객체`: 수정 폼 표시 + 초기값으로 사용

### 상태 조합에 따른 화면 상태

| showForm | editTarget | 화면 상태 |
|----------|------------|-----------|
| false | null | 폼 없음 (기본) |
| true | null | 등록 폼 표시 |
| false | Fund 객체 | 수정 폼 표시 |
| true | Fund 객체 | ⚠️ 둘 다 표시 (의도하지 않은 상태) |

> 수정 버튼 클릭 시 `setShowForm(false)`를 같이 호출하는 이유가 바로 이 때문입니다.
> 등록 폼이 열려있는 상태에서 수정 폼이 동시에 열리면 안 됩니다.

---

## 3단계 - useQuery (목록 조회)

```tsx
const { data, isLoading, isError, error } = useQuery({
    queryKey: ['funds'],
    queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 3000)); // 테스트용 딜레이
        return fetchFunds();
    }
});
```

### 반환값 역할

| 반환값 | 타입 | 역할 |
|--------|------|------|
| `data` | `Fund[] \| undefined` | 조회된 펀드 목록 |
| `isLoading` | `boolean` | 최초 로딩 중 여부 |
| `isError` | `boolean` | 에러 발생 여부 |
| `error` | `Error` | 에러 객체 |

### queryKey가 중요한 이유

```tsx
queryKey: ['funds']
```

이 키로 캐시를 식별합니다. mutation의 `onSuccess`에서
`invalidateQueries({ queryKey: ['funds'] })` 를 호출하면
이 키와 일치하는 캐시를 무효화 → 자동으로 재조회합니다.

```
등록/수정/삭제 성공
    → invalidateQueries(['funds'])
    → useQuery(['funds']) 자동 재실행
    → 화면 갱신
```

---

## 4단계 - deleteMutation (삭제)

```tsx
const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
        await new Promise((resolve) => setTimeout(resolve, 2000)) // 테스트용 딜레이
        return deleteFund(id);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['funds']});
    },
    onError: (error) => {
        console.error('펀드 삭제 실패:', error);
    }
});
```

### mutationFn의 인자 타입

`mutationFn: (id: number)` → `deleteMutation.mutate(fund.id)` 호출 시 `id`에 전달됩니다.

### 삭제 버튼과의 연결

```tsx
// 테이블의 삭제 버튼
onClick={() => deleteMutation.mutate(fund.id)}
//                              ↑
//                    mutationFn의 id로 전달됨
```

### isPending + variables 패턴

```tsx
disabled={deleteMutation.isPending && deleteMutation.variables === fund.id}
```

- `deleteMutation.isPending`: 현재 삭제 진행 중
- `deleteMutation.variables`: 현재 삭제 중인 fund.id
- 두 조건을 AND로 조합 → **삭제 중인 그 행만** 버튼 비활성화

---

## 5단계 - createMutation (등록)

```tsx
const createMutation = useMutation({
    mutationFn: (data: FundFormData) => createFund(data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['funds']});
        setShowForm(false);   // ← 등록 성공 시 폼 닫기
    },
    onError: (error) => {
        console.error('펀드 생성 실패:', error);
    }
});
```

### mutationFn의 인자 타입

`mutationFn: (data: FundFormData)` → FundForm의 `onSubmit(data)`에서 전달됩니다.

### FundForm과의 연결

```tsx
<FundForm
    onSubmit={(data) => createMutation.mutate(data)}
    //                               ↑
    //                  FundForm이 유효성 검사 통과 후 넘겨주는 data
    onCancel={() => setShowForm(false)}
    isPending={createMutation.isPending}
/>
```

### onSuccess 흐름

```
createFund(data) API 성공
    → invalidateQueries(['funds'])  : 목록 갱신
    → setShowForm(false)            : 등록 폼 닫기
```

---

## 6단계 - updateMutation (수정)

```tsx
const updateMutation = useMutation({
    mutationFn: (data: Fund) => updateFund(editTarget!.id, data),
    //                    ↑                       ↑
    //            id 포함 전체 타입        수정 대상 id (느낌표: null이 아님을 단언)
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['funds']});
        setEditTarget(null);   // ← 수정 성공 시 폼 닫기
    },
    onError: (error) => {
        console.error('펀드 업데이트 실패:', error);
    }
});
```

### `editTarget!.id` 의 `!` (Non-null assertion)

```tsx
editTarget!.id
//        ↑
// TypeScript에게 "editTarget이 null이 아님을 내가 보장한다"는 단언
// updateMutation은 editTarget이 있을 때만 호출되므로 안전
```

### FundForm과의 연결

```tsx
<FundForm
    onSubmit={(data) => updateMutation.mutate({...data, id: editTarget.id})}
    //                                         ↑
    //                          FundFormData에 id를 합쳐서 Fund 타입으로 전달
    onCancel={() => setEditTarget(null)}
    isPending={updateMutation.isPending}
    initialData={editTarget}   // ← 기존 데이터를 폼 초기값으로 전달
/>
```

### `{...data, id: editTarget.id}` 스프레드 패턴

```
FundFormData = { name, type, nav, status }         ← id 없음
editTarget   = { id: 1, name, type, nav, status }  ← id 있음

{...data, id: editTarget.id}
= { name, type, nav, status, id: 1 }               ← Fund 타입 완성
```

---

## 7단계 - 로딩/에러 처리

```tsx
if (isLoading) return <div className="p-6 text-gray-500">로딩 중...</div>
if (isError)   return <div className="p-6 text-red-500">에러: {String(error)}</div>
```

### 왜 return 전에 처리하는가

```
useQuery 실행
    → isLoading: true  → "로딩 중..." 화면만 보여주고 나머지 JSX 렌더링 안 함
    → isError: true    → "에러" 화면만 보여주고 나머지 JSX 렌더링 안 함
    → 둘 다 false      → 아래 return (JSX) 실행
```

`data`가 `undefined`인 상태에서 `data.map()`이 실행되면 에러가 납니다.
로딩/에러를 먼저 걸러내야 `data`가 안전하게 사용됩니다.

---

## 8단계 - JSX 구조

### 버튼 영역

```tsx
// 새로고침 버튼
<button onClick={() => queryClient.invalidateQueries({queryKey: ['funds']})}>
    새로고침
</button>
// → 캐시 무효화 → useQuery 재실행 → 목록 갱신

// 펀드 추가 버튼
<button onClick={() => setShowForm(prev => !prev)}>
    {showForm ? '폼 닫기' : '펀드 추가'}
</button>
// prev => !prev : 현재 값의 반대로 토글
```

### 폼 렌더링 분기

```tsx
{/* 등록 폼: showForm이 true일 때만 */}
{showForm && <FundForm onSubmit={...} ... />}

{/* 수정 폼: editTarget이 null이 아닐 때만 */}
{editTarget && <FundForm onSubmit={...} initialData={editTarget} ... />}
```

**같은 FundForm 컴포넌트를 두 용도로 사용합니다.**
`initialData` 유무로 등록/수정이 구분됩니다.

### 수정 버튼 클릭 시

```tsx
onClick={() => {
    setShowForm(false);    // 1. 등록 폼이 열려있으면 닫기
    setEditTarget(fund);   // 2. 클릭한 행의 데이터를 수정 대상으로 설정
}}
```

두 줄이 동시에 실행되어야 하는 이유:
등록 폼과 수정 폼이 동시에 열리면 안 되기 때문입니다.

---

## 전체 데이터 흐름 요약

```
■ 조회
  컴포넌트 마운트
      → useQuery 자동 실행
      → fetchFunds() API 호출
      → data에 저장 → 테이블 렌더링

■ 등록
  [펀드 추가] 클릭 → showForm=true → 등록 FundForm 표시
      → 사용자 입력 → [저장] 클릭
      → FundForm 유효성 검사 통과
      → createMutation.mutate(data)
      → createFund(data) API 호출
      → onSuccess: invalidateQueries + setShowForm(false)
      → 목록 자동 갱신 + 폼 닫힘

■ 수정
  [수정] 클릭 → setShowForm(false) + setEditTarget(fund)
      → 수정 FundForm 표시 (기존 데이터로 채워짐)
      → 사용자 수정 → [수정] 클릭
      → updateMutation.mutate({...data, id: editTarget.id})
      → updateFund(id, data) API 호출
      → onSuccess: invalidateQueries + setEditTarget(null)
      → 목록 자동 갱신 + 폼 닫힘

■ 삭제
  [삭제] 클릭
      → deleteMutation.mutate(fund.id)
      → deleteFund(id) API 호출
      → onSuccess: invalidateQueries
      → 목록 자동 갱신
```

---

## 핵심 개념 4줄 요약

1. **useQuery** - 자동으로 데이터를 가져오고 캐시로 관리
2. **useMutation** - 데이터 변경 후 onSuccess에서 캐시 무효화
3. **invalidateQueries** - 캐시 무효화 → useQuery 재실행 → 화면 자동 갱신
4. **showForm / editTarget** - 어떤 폼을 보여줄지 결정하는 두 상태
