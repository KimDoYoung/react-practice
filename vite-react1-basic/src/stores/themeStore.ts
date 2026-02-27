import { create } from 'zustand';

export type Theme = 'blue' | 'mocha' | 'cyber';

export const THEME_LABELS: Record<Theme, string> = {
  blue: 'Soft Luxe Blue',
  mocha: 'Mocha Mousse',
  cyber: 'Cyberpunk',
};

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const THEME_CLASSES: Record<Theme, string | null> = {
  blue: null,
  mocha: 'theme-mocha',
  cyber: 'theme-cyber',
};

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  // 기존 테마 클래스 제거
  root.classList.remove('theme-mocha', 'theme-cyber');
  // 새 테마 클래스 적용
  const cls = THEME_CLASSES[theme];
  if (cls) root.classList.add(cls);
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('app-theme') as Theme) || 'blue',
  setTheme: (theme) => {
    localStorage.setItem('app-theme', theme);
    applyThemeClass(theme);
    set({ theme });
  },
}));

// 앱 시작 시 저장된 테마 적용
const savedTheme = (localStorage.getItem('app-theme') as Theme) || 'blue';
applyThemeClass(savedTheme);

export default useThemeStore;
