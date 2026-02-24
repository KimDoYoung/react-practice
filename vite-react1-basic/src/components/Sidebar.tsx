const menuItems = [
  { label: '대시보드', icon: '📊' },
  { label: '주문관리', icon: '📋' },
  { label: '펀드현황', icon: '💹' },
  { label: '보고서', icon: '📄' },
  { label: '설정', icon: '⚙️' },
]

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-60 min-h-full flex flex-col py-4">
      {menuItems.map((item) => (
        <a
          key={item.label}
          href="#"
          className="flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition-colors"
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </aside>
  )
}

export default Sidebar