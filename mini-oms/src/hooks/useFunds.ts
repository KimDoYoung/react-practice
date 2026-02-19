import { useQuery } from "@tanstack/react-query";
import { fetchFunds } from "../api/fundsApi";

export const useFunds = () => {
    //fetchFunds 는 fundsApi.ts 에 정의된 순수한 async 함수
    //이 함수는 axios 를 사용해서 API 서버에서 데이터를 가져오는 역할만 함
    //useFunds 훅은 TanStack Query 의 useQuery 훅을 사용해서 fetchFunds 함수를 queryFn 으로 전달함
    //useQuery 는 fetchFunds 함수를 실행하고, 그 결과를 캐싱하고, 로딩/에러 상태를 관리하는 역할을 함
    
    return useQuery({
        queryKey: ['funds'], //캐싱 키
        queryFn: fetchFunds, //데이터를 가져오는 함수
        staleTime: 5 * 60 * 1000, //5분 동안 데이터를 신선하게 유지 (캐시 유지 시간)
        gcTime: 10 * 60 * 1000, //10분 동안 캐시 유지 (캐시 삭제 시간)
    });
}