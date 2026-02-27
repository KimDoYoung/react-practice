import useThemeStore, { type Theme, THEME_LABELS } from '@/stores/themeStore';
import { cn } from '@/lib/class-utils';

const THEME_PREVIEWS: Record<Theme, { bg: string; accent: string; label: string }> = {
  blue: { bg: 'bg-blue-50', accent: 'bg-blue-500', label: 'text-blue-700' },
  mocha: { bg: 'bg-amber-50', accent: 'bg-amber-700', label: 'text-amber-800' },
  cyber: { bg: 'bg-gray-900', accent: 'bg-green-400', label: 'text-green-400' },
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center gap-1.5">
      {(Object.keys(THEME_LABELS) as Theme[]).map((t) => {
        const preview = THEME_PREVIEWS[t];
        const isActive = theme === t;

        return (
          <button
            key={t}
            onClick={() => setTheme(t)}
            title={THEME_LABELS[t]}
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all cursor-pointer',
              'border',
              isActive
                ? 'border-white/60 bg-white/20 shadow-sm'
                : 'border-transparent hover:bg-white/10'
            )}
          >
            <span
              className={cn(
                'w-3 h-3 rounded-full border border-white/40',
                preview.accent
              )}
            />
            <span className="hidden sm:inline">{THEME_LABELS[t]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
