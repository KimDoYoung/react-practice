import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, deleteOrder, fetchOrders, updateOrder } from "../api/ordersApi";
import type { Order, OrderRequest } from "../types";

/**
 * 캐시 키 상수
 * 여러 곳에서 같은 키를 써야 하므로 한 곳에서 관리
 * invalidateQueries 호출 시 이 키를 사용해야 정확히 무효화됨
 */
export const QUERY_KEY_ORDERS = 'orders';



//-- 주문 목록
export const useOrders = () => {
    return useQuery({
        queryKey: [QUERY_KEY_ORDERS], //캐싱 키
        queryFn: fetchOrders, //데이터를 가져오는 함수
        staleTime: 30 * 1000, //30초 동안 데이터를 신선하게 유지 (캐시 유지 시간)
    });
}

//-- 주문 생성
export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (order: OrderRequest) => createOrder(order), //주문 생성 함수
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ORDERS] }); //주문 목록 캐시 무효화
        },
    });
}

//-- 주문 수정
export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (order: Order) => updateOrder(order), //주문 수정 함수
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ORDERS] }); //주문 목록 캐시 무효화
        }
    });
}

//-- 주문 삭제
export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: number) => deleteOrder(orderId), //주문 삭제 함수
        
        onMutate: async (orderId: number) => {
            // 진행중인 리패치 취소 (데이터 충돌 방지)
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY_ORDERS] });

            // 현재 캐쉬 저장 -> API실패시 롤백용
            const previousOrders = queryClient.getQueryData<Order[]>([QUERY_KEY_ORDERS]);

            // 캐시에서 해당 항목 즉시 제거 -> UI에서 바로 반영
            queryClient.setQueryData<Order[]>([QUERY_KEY_ORDERS], (old) => {
                return old ? old.filter(order => order.id !== orderId) : [];
            });
            return { previousOrders }; //롤백용 데이터 반환
        },
        // API 요청 실패 시 롤백
        onError: (err, orderId, context) => {
            // API 실패 시 롤백
            queryClient.setQueryData<Order[]>([QUERY_KEY_ORDERS], context?.previousOrders);
        },

        // 성공,실패 관계없이 서버 데이터와 동기화
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ORDERS] });
        }
    });
}