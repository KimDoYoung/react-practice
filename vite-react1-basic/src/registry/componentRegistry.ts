import React from 'react';

const componentRegistry: Record<string, React.ComponentType<any>> = {
    // Backend
    ApiDocs: React.lazy(() => import('@/pages/backend/ApiDocs')),
    ServerStatus: React.lazy(() => import('@/pages/backend/ServerStatus')),
    // Frontend
    DesignSystem: React.lazy(() => import('@/pages/frontend/DesignSystem')),
    ComponentLibrary: React.lazy(() => import('@/pages/frontend/ComponentLibrary')),
    // AI
    ModelManagement: React.lazy(() => import('@/pages/ai/ModelManagement')),
    Datasets: React.lazy(() => import('@/pages/ai/Datasets')),

};

export default componentRegistry;