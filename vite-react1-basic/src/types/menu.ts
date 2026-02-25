//
// src/types/menu.ts
// 메뉴 관련 타입 정의
//
export type Section = 'Backend' | 'Frontend' | 'AI';

export interface MenuItem {
    label: string;
    path: string;
    component: string; // 동적 import를 위한 문자열 타입
}

export type MenuMap = Record<Section, MenuItem[]>;