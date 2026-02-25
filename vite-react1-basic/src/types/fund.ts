import { z } from 'zod';

//1. Schema 정의
export const fundSchema = z.object({
    name: z.string()
        .min(1, { message: '펀드명은 필수입니다.' })
        .max(100, { message: '펀드명은 최대 100자까지 입력 가능합니다.' }),        
    type: z.enum(['주식형', '채권형', '혼합형', '부동산형', '기타'], {
        message: '유효한 펀드 유형을 선택해주세요.'
    }),
    nav: z.number({ message: '기준가는 숫자여야 합니다.'})
        .positive({ message: '기준가는 양수여야 합니다.' }),
    status: z.enum(['운용중', '청산', '판매중지'])
});

//2. FormData
export type FundFormData = z.infer<typeof fundSchema>;

//3. id를 포함하는 전체 타입
export interface Fund extends FundFormData {
    id: number;
}
