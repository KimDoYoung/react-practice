import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { createFund, deleteFund, fetchFunds } from '@/api/funcApi';
import FundForm from '@/components/FundForm';
import type { FundFormData } from "@/types/fund";
import { useState } from 'react';

const ApiDocs = () => {
    const queryClient = useQueryClient()
    const [showForm, setShowForm] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['funds'],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay
            return fetchFunds();
        }
    });
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await new Promise((resolve) => setTimeout(resolve, 2000)) // 2초 딜레이
            return deleteFund(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['funds']});
        },
        onError: (error) => {
            console.error('펀드 삭제 실패:', error);
        }
    });
    const createMutation = useMutation({
        mutationFn: (data: FundFormData) => createFund(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['funds']});
            setShowForm(false);
        },
        onError: (error) => {
            console.error('펀드 생성 실패:', error);
        }        
    });

    if (isLoading) return <div className="p-6 text-gray-500">로딩 중...</div>
    if (isError)   return <div className="p-6 text-red-500">에러: {String(error)}</div>


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">펀드 목록</h1>
            
            <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={() => queryClient.invalidateQueries({queryKey: ['funds']})}
            >새로고침</button>
            <button className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => setShowForm(prev => !prev)}
            >
                {showForm ? '폼 닫기' : '펀드 추가'}
            </button>
            <div className="w-full">
            {showForm && (
                <FundForm
                    onSubmit={(data) => createMutation.mutate(data)}
                    onCancel={() => setShowForm(false)}
                    isPending={createMutation.isPending}
                />
            )}
            </div>
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">펀드명</th>
                    <th className="border border-gray-300 px-4 py-2">유형</th>
                    <th className="border border-gray-300 px-4 py-2">기준가</th>
                    <th className="border border-gray-300 px-4 py-2">상태</th>
                    <th className="border border-gray-300 px-4 py-2">액션</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((fund) => (
                    <tr key={fund.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{fund.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{fund.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{fund.type}</td>
                        <td className="border border-gray-300 px-4 py-2">{fund.nav}</td>
                        <td className="border border-gray-300 px-4 py-2">{fund.status}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                    onClick={() => deleteMutation.mutate(fund.id)}
                                    disabled={deleteMutation.isPending}
                            >{deleteMutation.isPending && deleteMutation.variables === fund.id ? '삭제 중...' : '삭제'}</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>            
        </div>
    );
};

export default ApiDocs;
