
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'


function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto bg-white">
          <h2 className="text-2xl font-bold text-gray-700">메인 콘텐츠</h2>
          <p className="mt-2 text-gray-500">여기에 페이지 내용이 들어옵니다.</p>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App
