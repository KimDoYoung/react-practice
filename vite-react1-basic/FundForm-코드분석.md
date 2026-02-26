# FundForm 코드 분석 - 논리적 흐름 정리

---

## 전체 구조 한눈에 보기

```
FundForm.tsx
│
├── 1. import 영역          ← 필요한 도구들을 가져옴
├── 2. Props 인터페이스     ← 부모로부터 받을 값 정의
├── 3. useForm 훅           ← 폼 상태 관리 시작
├── 4. return (JSX)
│   ├── <form>             ← HTML 폼 태그
│   │   └── <div>         ← 가로 배치 컨테이너
│   │       ├── Controller (name)    ← 펀드명 필드
│   │       ├── Controller (type)    ← 유형 필드
│   │       ├── Controller (nav)     ← 기준가 필드
│   │       ├── Controller (status)  ← 상태 필드
│   │       └── Field (버튼)         ← 저장/취소 버튼
```

---

## 1단계 - import 영역

```tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fundSchema, type FundFormData } from "@/types/fund";
```

### 각 import가 하는 일

| import | 출처 | 역할 |
|--------|------|------|
| `useForm` | react-hook-form | 폼 전체 상태 관리 훅 |
| `Controller` | react-hook-form | 커스텀 컴포넌트를 폼에 연결 |
| `zodResolver` | @hookform/resolvers/zod | Zod 스키마를 react-hook-form에 연결 |
| `fundSchema` | @/types/fund | Zod로 정의한 유효성 검사 규칙 |
| `FundFormData` | @/types/fund | fundSchema에서 자동 생성된 TypeScript 타입 |

```tsx
import {
  Field, FieldLabel, FieldError, FieldDescription, FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
```

| import | 역할 |
|--------|------|
| `Field` | 하나의 필드를 감싸는 컨테이너 (에러 스타일 적용 담당) |
| `FieldLabel` | 입력 필드의 라벨 |
| `FieldError` | 유효성 검사 실패 시 에러 메시지 표시 |
| `FieldDescription` | 입력 안내 문구 |
| `FieldGroup` | 여러 필드를 묶는 컨테이너 |
| `Input` | 텍스트 입력 컴포넌트 |
| `Button` | 버튼 컴포넌트 |
| `Select` 관련 | 드롭다운 선택 컴포넌트 |

---

## 2단계 - Props 인터페이스

```tsx
interface Props {
    onSubmit: (data: FundFormData) => void;  // 부모가 넘겨주는 저장 함수
    onCancel: () => void;                    // 부모가 넘겨주는 취소 함수
    isPending: boolean;                      // 저장 중 여부 (true면 버튼 비활성화)
}
```

### 왜 Props가 필요한가

FundForm은 **UI와 유효성 검사만** 담당합니다.
실제 API 호출은 부모(ApiDocs)가 담당합니다.

```
ApiDocs (부모)
  └── createMutation.mutate(data)   ← 실제 API 호출
        ↑
  FundForm (자식)
    └── onSubmit(data) 호출          ← 유효성 검사 통과 시 부모에게 전달
```

이렇게 역할을 분리해야 FundForm을 다른 곳에서도 재사용할 수 있습니다.

---

## 3단계 - useForm 훅

```tsx
const form = useForm<FundFormData>({
    resolver: zodResolver(fundSchema),   // Zod 스키마 연결
    defaultValues: {
        name: "",
        type: "주식형",
        nav: 0,
        status: '운용중',
    },
});
```

### useForm이 반환하는 것들

`form` 객체 안에 들어있는 주요 항목들:

| 항목 | 역할 |
|------|------|
| `form.control` | Controller에 넘겨주는 연결고리 |
| `form.handleSubmit(fn)` | 유효성 검사 후 통과하면 fn 호출 |
| `form.reset()` | 폼을 defaultValues로 초기화 |

### zodResolver가 하는 일

```
사용자가 저장 버튼 클릭
    → form.handleSubmit 실행
    → zodResolver가 fundSchema로 현재 값 검사
    → 통과 O → onSubmit(data) 호출
    → 통과 X → 각 필드에 에러 상태 전달
```

### defaultValues가 중요한 이유

초기값을 지정하지 않으면 input이 `undefined`로 시작해서
controlled/uncontrolled 경고가 발생합니다.

---

## 4단계 - form 태그

```tsx
<form
    onSubmit={form.handleSubmit(onSubmit)}
    className="w-full bg-gray-50 border border-gray-200 rounded p-4 mb-6"
>
```

### 핵심: `form.handleSubmit(onSubmit)`

일반 HTML 폼이라면 `onSubmit={onSubmit}`으로 직접 연결합니다.
react-hook-form은 `handleSubmit`으로 한번 감쌉니다.

```
버튼 클릭 → form.handleSubmit 실행
    → 유효성 검사 (Zod)
    → 통과 O: onSubmit(data) 호출 → 부모의 createMutation 실행
    → 통과 X: 에러 표시, onSubmit 호출 안 함
```

---

## 5단계 - Controller 구조 (핵심)

### Controller가 필요한 이유

```tsx
// 일반 input이라면 이렇게 가능
<input {...register('name')} />

// shadcn Input, Select 같은 커스텀 컴포넌트는 register가 안 됨
// → Controller로 감싸야 함
<Controller name="name" control={form.control} render={...} />
```

### Controller 기본 구조

```tsx
<Controller
    name="name"           // ← 필드 이름 (fundSchema의 키와 일치해야 함)
    control={form.control} // ← useForm과 연결하는 연결고리
    render={({ field, fieldState }) => (
        // field     : 값과 핸들러
        // fieldState: 이 필드의 현재 상태
        ...
    )}
/>
```

### field 객체 상세

```tsx
field.name      // "name", "type", "nav", "status"
field.value     // 현재 입력된 값
field.onChange  // 값이 바뀔 때 호출 (react-hook-form에 알림)
field.onBlur    // 포커스가 벗어날 때 호출
```

### fieldState 객체 상세

```tsx
fieldState.invalid   // 유효성 검사 실패 여부 (true/false)
fieldState.error     // 에러 객체 { message: "펀드명은 필수입니다." }
fieldState.isDirty   // 초기값에서 변경됐는지
fieldState.isTouched // 한 번이라도 포커스가 됐는지
```

---

## 6단계 - 각 필드 분해

### Input 필드 (펀드명)

```tsx
<Controller
    name="name"
    control={form.control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-48">
        {/*   ↑ invalid=true 이면 Field 전체가 빨간색 스타일로 변함 */}

            <FieldLabel>펀드명</FieldLabel>

            <Input
                {...field}                        // field.value, onChange, onBlur 전달
                id="name"
                aria-invalid={fieldState.invalid} // 스크린리더 접근성용
                placeholder="펀드명을 입력하세요"
                disabled={isPending}              // 저장 중이면 입력 불가
                className="w-48"
            />

            {fieldState.invalid && (              // 에러 있을 때만 표시
                <FieldError errors={[fieldState.error]} />
            )}
        </Field>
    )}
/>
```

### Select 필드 (유형)

```tsx
<Controller
    name="type"
    control={form.control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-48">
            <FieldLabel>펀드유형</FieldLabel>
            <Select
                name={field.name}
                value={field.value}               // 현재 선택된 값
                onValueChange={field.onChange}    // 선택 변경 시 react-hook-form에 알림
                disabled={isPending}
            >
                <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="w-48"
                >
                    <SelectValue placeholder="펀드유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="주식형">주식형</SelectItem>
                    {/* ... */}
                </SelectContent>
            </Select>
            {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
            )}
        </Field>
    )}
/>
```

**Input과 Select의 차이점:**

| | Input | Select |
|---|---|---|
| 값 전달 | `{...field}` 스프레드 | `value={field.value}` 명시 |
| 변경 감지 | `onChange` 자동 포함 | `onValueChange={field.onChange}` 명시 |
| 이유 | HTML input과 호환 | 커스텀 컴포넌트라 명시 필요 |

### number Input 필드 (기준가)

```tsx
<Input
    {...field}
    type="number"
    step="0.01"
    onChange={(e) => field.onChange(e.target.valueAsNumber)}
    {/* ↑ 주의: {...field}의 onChange를 덮어씀 */}
    {/* e.target.value는 문자열 → valueAsNumber로 숫자 변환 */}
/>
```

**왜 onChange를 별도로 지정하는가:**

```
{...field}로 spread 시 onChange는 문자열을 반환
Zod의 nav: z.number() 는 숫자를 기대
→ e.target.valueAsNumber로 숫자 변환 후 전달
```

---

## 7단계 - 버튼 영역

```tsx
<Field orientation="horizontal" className="w-48 flex gap-2 justify-end">
    <Button type="submit" disabled={isPending}>
        {isPending ? "저장 중..." : "저장"}
        {/* isPending이 true면 "저장 중...", false면 "저장" */}
    </Button>
    <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
        취소
        {/* type="button" 없으면 form submit이 됨 - 주의! */}
    </Button>
</Field>
```

**`type="button"` 이 중요한 이유:**

```
<form> 안의 button은 기본값이 type="submit"
취소 버튼에 type="button" 없으면 클릭 시 폼이 제출됨
```

---

## 전체 데이터 흐름 요약

```
1. 사용자 입력
       ↓
2. Controller의 field.onChange 호출
       ↓
3. react-hook-form이 내부 상태 업데이트
       ↓
4. 저장 버튼 클릭
       ↓
5. form.handleSubmit 실행
       ↓
6. zodResolver가 fundSchema로 전체 값 검사
       ↓
   ┌── 실패 ──→ fieldState.invalid = true → FieldError 표시
   └── 성공 ──→ onSubmit(data) 호출
                    ↓
               부모(ApiDocs)의 createMutation.mutate(data)
                    ↓
               API POST 요청
                    ↓
               성공: setShowForm(false) + 목록 갱신
```

---

## 핵심 개념 3줄 요약

1. **useForm** - 폼 전체의 상태(값, 에러, 제출 여부)를 관리하는 두뇌
2. **Controller** - shadcn 같은 커스텀 컴포넌트를 useForm과 연결하는 다리
3. **fieldState** - 각 필드의 현재 상태(에러 여부, 변경 여부)를 알려주는 정보
