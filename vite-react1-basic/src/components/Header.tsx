const Header = () => {
  return (
    <header className="bg-blue-500 text-white h-16 flex items-center px-6 shadow-md">
      <div className="text-xl font-bold">MyApp</div>
      <nav className="ml-auto flex gap-6">
        <a href="#" className="hover:text-blue-200 transition-colors">홈</a>
        <a href="#" className="hover:text-blue-200 transition-colors">서비스</a>
        <a href="#" className="hover:text-blue-200 transition-colors">설정</a>
      </nav>
    </header>
  )
}

export default Header