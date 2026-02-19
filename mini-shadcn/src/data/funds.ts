export interface Fund {
  id: number;
  name: string;
  type: string;
  manager: string;
  returnRate: number;
  aumRate: number; //운용규모 진행율
}

export const FUNDS: Fund[] = [
  { id: 1, name: '삼성 성장형',    type: '주식형',    manager: '김운용', returnRate: 12.5, aumRate: 75 },
  { id: 2, name: 'KB 안정형',      type: '채권형',    manager: '이운용', returnRate:  4.2, aumRate: 60 },
  { id: 3, name: '미래에셋 글로벌', type: '해외주식형', manager: '박운용', returnRate:  8.7, aumRate: 45 },
];