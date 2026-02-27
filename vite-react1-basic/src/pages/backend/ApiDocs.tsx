import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { createFund, deleteFund, fetchFunds, updateFund } from '@/api/funcApi';
import FundForm from '@/components/FundForm';
import type { Fund, FundFormData } from "@/types/fund";
import { useState } from 'react';
import { OmsStatusBadge } from '@/components/common/oms-status-badge';
import OmsIconButton from '@/components/common/oms-icon-button';
import {Pencil, CircleX, RotateCw} from 'lucide-react';

const ApiDocs = () => {
    const queryClient = useQueryClient()
    const [showForm, setShowForm] = useState(false);
    const [editTarget, setEditTarget] = useState<Fund | null>(null);

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
    const updateMutation = useMutation({
        mutationFn: (data: Fund) => updateFund(editTarget!.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['funds']});
            setEditTarget(null);
        },
        onError: (error) => {
            console.error('펀드 업데이트 실패:', error);
        }        
    });
    

    if (isLoading) return <div className="p-6 text-muted-foreground">로딩 중...</div>
    if (isError)   return <div className="p-6 text-destructive">에러: {String(error)}</div>


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">펀드 목록</h1>
            
            <OmsIconButton icon={RotateCw} variant="outline" label="새로고침" onClick={() => queryClient.invalidateQueries({queryKey: ['funds']})} className="mb-4 mx-1" />
            <OmsIconButton icon={showForm ? CircleX : Pencil} variant="outline" onClick={() => setShowForm(prev => !prev)} label={showForm ? '폼 닫기' : '펀드 추가'} />
            <div className="w-full">
            {/* 등록 폼 */}
            {showForm && (
                <FundForm
                    onSubmit={(data) => createMutation.mutate(data)}
                    onCancel={() => setShowForm(false)}
                    isPending={createMutation.isPending}
                />
            )}
            {/* 수정 폼 */}
            {editTarget && (
                <FundForm
                    onSubmit={(data) => updateMutation.mutate({...data, id: editTarget.id})}
                    onCancel={() => setEditTarget(null)}
                    isPending={updateMutation.isPending}
                    initialData={editTarget}
                />
            )}
            </div>
            <table className="min-w-full bg-card text-card-foreground border border-border">
                <thead className="bg-muted">
                <tr>
                    <th className="border border-border px-4 py-2">ID</th>
                    <th className="border border-border px-4 py-2">펀드명</th>
                    <th className="border border-border px-4 py-2">유형</th>
                    <th className="border border-border px-4 py-2">기준가</th>
                    <th className="border border-border px-4 py-2">상태</th>
                    <th className="border border-border px-4 py-2">액션</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((fund) => (
                    <tr key={fund.id} className="hover:bg-muted/50">
                        <td className="border border-border px-4 py-2">{fund.id}</td>
                        <td className="border border-border px-4 py-2">{fund.name}</td>
                        <td className="border border-border px-4 py-2">{fund.type}</td>
                        <td className="border border-border px-4 py-2 font-mono text-right">{fund.nav}</td>
                        <td className="border border-border px-4 py-2">
                            <OmsStatusBadge status={fund.status === "청산" ? "error" : "success"} label={fund.status} showIcon />
                        </td>
                        <td className="border border-border px-4 py-2">
                            <button className="px-2 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors mr-2"
                                    onClick={() => {setShowForm(false); setEditTarget(fund)}}
                                    disabled={updateMutation.isPending}
                            >
                                {updateMutation.isPending && updateMutation.variables?.id === fund.id ? '업데이트 중...' : '수정'}
                            </button>
                            <button className="px-2 py-1 bg-destructive text-primary-foreground rounded hover:bg-destructive/80 transition-colors"
                                    onClick={() => deleteMutation.mutate(fund.id)}
                                    disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending && deleteMutation.variables === fund.id ? '삭제 중...' : '삭제'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>            
        </div>
    );
};

export default ApiDocs;
