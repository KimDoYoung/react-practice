import { type Section, type MenuMap } from "@/types/menu";

export const SECTIONS: Section[] = ['Backend', 'Frontend', 'AI'];

export const MENU_MAP: MenuMap = {
    Backend: [
        { label: 'API 문서', path: '/backend/api-docs', component: 'ApiDocs' },
        { label: '서버 상태', path: '/backend/server-status', component: 'ServerStatus' },
    ],
    Frontend: [
        { label: '디자인 시스템', path: '/frontend/design-system', component: 'DesignSystem' },
        { label: '컴포넌트 라이브러리', path: '/frontend/component-library', component: 'ComponentLibrary' },
    ],
    AI: [
        { label: '모델 관리', path: '/ai/model-management', component: 'ModelManagement' },
        { label: '데이터셋', path: '/ai/datasets', component: 'Datasets' },
    ],
};
