import apiClient from "@/libs/apiClient";

export interface Fund {
    id: number;
    name: string;
    type: string;
    nav: number;
    status: string;
}

// 목록조회
export const fetchFunds = async (): Promise<Fund[]> => {
    const response = await apiClient.get('/funds');
    return response.data;
};

// 상세조회
export const fetchFundById = async (id: number): Promise<Fund> => {
    const response = await apiClient.get(`/funds/${id}`);
    return response.data;
}

// 생성
export const createFund = async (fund: Omit<Fund, 'id'>): Promise<Fund> => {
    const response = await apiClient.post('/funds', fund);
    return response.data;
}

// 수정
export const updateFund = async (id: number, fund: Omit<Fund, 'id'>): Promise<Fund> => {
    const response = await apiClient.put(`/funds/${id}`, fund);
    return response.data;
}

// 삭제
export const deleteFund = async (id: number): Promise<void> => {
    await apiClient.delete(`/funds/${id}`);
}
