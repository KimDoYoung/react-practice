import { useQuery, useQueryClient} from '@tanstack/react-query';
import { fetchFunds } from '@/api/funcApi';

const ApiDocs = () => {
    const queryClient = useQueryClient()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['funds'],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay
            return fetchFunds();
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
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">펀드명</th>
                    <th className="border border-gray-300 px-4 py-2">유형</th>
                    <th className="border border-gray-300 px-4 py-2">기준가</th>
                    <th className="border border-gray-300 px-4 py-2">상태</th>
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
                    </tr>
                ))}
                </tbody>
            </table>            
        </div>
    );
};

export default ApiDocs;