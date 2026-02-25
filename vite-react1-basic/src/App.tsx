
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { MENU_MAP } from './constants/menuConfig'
import componentRegistry from './registry/componentRegistry';

const allMenuItems = Object.values(MENU_MAP).flat();

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto bg-white">
            <Routes>
              <Route path="/" element={<Navigate to="/backend/springboot" replace />} />
              {allMenuItems.map((item) => {
                const Component = componentRegistry[item.component];
                return <Route key={item.path} path={item.path} element={<Component />} />;
              })}
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
