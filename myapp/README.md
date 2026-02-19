# React Hooks 연습 프로젝트

이 프로젝트는 React의 주요 Hooks를 직접 구현하고 연습하기 위한 학습 프로젝트입니다.

## 📚 학습 주제

각 탭에서 다음의 React Hooks을 연습할 수 있습니다:

### 1. **useState**

- 상태(state) 관리의 기초
- 숫자, 문자열, 배열, 객체 등 다양한 데이터 타입 관리
- 상태 업데이트 함수 사용

### 2. **useEffect**

- 컴포넌트 생명주기 이해
- 부작용(side effects) 관리
- 의존성 배열(dependency array) 활용
- 정리(cleanup) 함수 작성

### 3. **useRef**

- DOM 요소에 직접 접근
- 렌더링을 유발하지 않는 값 저장
- 포커스 관리, 텍스트 선택 등

### 4. **useReducer**

- 복잡한 상태 로직 관리
- useState를 대체하는 방법
- 여러 상태를 하나로 관리

### 5. **useContext**

- Props drilling 피하기
- 전역 상태 관리
- Context API 이해

### 6. **Custom Hook**

- 재사용 가능한 로직 추출
- 커스텀 Hook 만드는 방법
- Hook 규칙 이해

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속하면 애플리케이션이 실행됩니다.

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── hooks/              # 각 Hook 예제 컴포넌트
│   │   ├── UseStateExample.jsx
│   │   ├── UseEffectExample.jsx
│   │   ├── UseRefExample.jsx
│   │   ├── UseReducerExample.jsx
│   │   ├── UseContextExample.jsx
│   │   └── CustomHookExample.jsx
│   └── HookNav.jsx         # Hook 탭 네비게이션
├── App.jsx                 # 메인 애플리케이션
└── App.css                 # 애플리케이션 스타일
```

## 💡 학습 방법

1. **각 Hook 별 폴더에서 코드 작성**
   - `src/components/hooks/` 폴더에 각 Hook별 예제 파일이 준비되어 있습니다.
   - 빈 파일에 직접 코드를 작성하면서 학습합니다.

2. **위에서 제시한 개념 학습**
   - 각 Hook의 기본 개념을 이해합니다.
   - 실제 사용 사례를 만들어봅니다.

3. **단계별 심화**
   - 간단한 예제부터 시작합니다.
   - 점차 복잡한 로직으로 확장합니다.

## 📖 추가 학습 자료

- [React 공식 문서 - Hooks](https://react.dev/reference/react/hooks)
- [React Hooks 총정리](https://react.dev/learn)

## 🔧 기술 스택

- **React 18+** - UI 라이브러리
- **Vite** - 빌드 도구
- **CSS** - 스타일링

## 📝 주의사항

- Hook은 컴포넌트의 최상위 또는 커스텀 Hook에서만 호출해야 합니다.
- 조건부로 Hook을 호출하면 안 됩니다.
- 반복문이나 조건부 블록에서 Hook을 호출하면 안 됩니다.

---

**즐거운 학습 되세요! 🎉**
