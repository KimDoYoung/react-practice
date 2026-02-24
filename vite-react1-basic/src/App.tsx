
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Funds from './pages/Funds'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto bg-white">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/funds" element={<Funds />} />
              {/* 다른 라우트 추가 가능 */}
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
