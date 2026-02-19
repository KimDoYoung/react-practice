import { useState } from 'react'
import HookNav from './components/HookNav'
import UseStateExample from './components/hooks/UseStateExample'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('useState')

  const renderContent = () => {
    switch (activeTab) {
      case 'useState':
        return <UseStateExample />
      case 'useEffect':
        return <div className="hook-content"><p>여기에 useEffect 연습 코드를 작성하세요</p></div>
      case 'useRef':
        return <div className="hook-content"><p>여기에 useRef 연습 코드를 작성하세요</p></div>
      case 'useReducer':
        return <div className="hook-content"><p>여기에 useReducer 연습 코드를 작성하세요</p></div>
      case 'useContext':
        return <div className="hook-content"><p>여기에 useContext 연습 코드를 작성하세요</p></div>
      case 'custom':
        return <div className="hook-content"><p>여기에 Custom Hook 연습 코드를 작성하세요</p></div>
      default:
        return null
    }
  }

  return (
    <div className="App">
      <div className="layout-wrapper">
        <aside className="sidebar">
          <HookNav activeTab={activeTab} onTabChange={setActiveTab} />
        </aside>
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
