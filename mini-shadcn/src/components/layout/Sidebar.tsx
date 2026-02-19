interface MenuItem {
    key: string
    label: string
    emoji: string
}

const MENU: MenuItem[] = [
    { key: 'button', label: 'Button', emoji: '🔘' },
    { key: 'card-badge', label: 'Card · Badge · Progress', emoji: '🃏' },
    { key: 'table', label: 'Table', emoji: '📋' },
    { key: 'tabs', label: 'Tabs', emoji: '📑' },
    { key: 'form', label: 'Input · Select · Form', emoji: '📝' },
    { key: 'dialog', label: 'Dialog', emoji: '💬' },
    { key: 'calendar', label: 'Calendar', emoji: '📅' },
    { key: 'toast', label: 'Sonner Toast', emoji: '🔔' },
    { key: 'skeleton', label: 'Skeleton', emoji: '💀' },
]

interface Props {
    current: string
    onChange: (key: string) => void
}

export default function Sidebar({ current, onChange }: Props) {
    return (
        <aside className="w-56 min-h-screen bg-slate-900 text-white flex flex-col">
            <div className="p-5 border-b border-slate-700">
                <h1 className="text-lg font-bold">📊 Mini Shadcn</h1>
                <p className="text-xs text-slate-400 mt-1">UI 컴포넌트 학습</p>
            </div>
            <nav className="flex-1 p-3 space-y-1">
                {MENU.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => onChange(item.key)}
                        className={`
              w-full text-left px-3 py-2 rounded-md text-sm transition-colors
              ${current === item.key
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-300 hover:bg-slate-800'
                            }
            `}
                    >
                        {item.emoji} {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    )
}