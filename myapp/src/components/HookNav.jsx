import './HookNav.css'

export default function HookNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'useState', label: '📊 useState' },
    { id: 'useEffect', label: '⚡ useEffect' },
    { id: 'useRef', label: '🎯 useRef' },
    { id: 'useReducer', label: '♻️ useReducer' },
    { id: 'useContext', label: '🌍 useContext' },
    { id: 'custom', label: '🛠️ Custom Hook' },
  ]

  return (
    <nav className="hook-nav">
      <h2>React Hooks</h2>
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
