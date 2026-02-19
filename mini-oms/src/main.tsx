import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
/**
 * QueryClient 생성
 * 앱 전체의 캐시를 관리하는 핵심 객체
 *
 * defaultOptions 로 앱 전체 기본 동작을 설정
 * 각 useQuery 에서 개별적으로 오버라이드 가능
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30초 동안 캐시를 fresh 로 유지
      refetchOnWindowFocus: true, // 탭 포커스 시 자동 재조회
      retry: 1, // API 실패 시 1회 자동 재시도
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 
      QueryClientProvider 로 앱 전체에 QueryClient 공급 
      이 안에 있는 모든 useQuery, useMutation 이 같은 캐시를 공유
    */}
    <QueryClientProvider client={queryClient}>
    <App />
    {/* 
    React Query 개발자 도구는 앱의 쿼리 상태를 시각적으로 확인할 수 있는 도구 
    프로덕션 빌드 시 자동으로 제거됨
    */}
    <ReactQueryDevtools initialIsOpen={false} /> {/* React Query 개발자 도구 */}
    </QueryClientProvider>
    
  </StrictMode>,
)
