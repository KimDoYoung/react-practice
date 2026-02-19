import apiClient from "../lib/apiClient";
import type { Fund } from "../types";
/**
 * fundsApi
 *
 * axios 호출만 담당 — TanStack Query 를 전혀 모름
 * 순수한 async 함수들의 모음
 *
 * 이 함수들은 useFunds.ts 훅 안에서
 * queryFn 으로 사용됨
 */
export const fetchFunds = async () => {
    const {data} = await apiClient.get<Fund[]>('/funds');
    return data;
}