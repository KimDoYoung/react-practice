import { NavLink } from 'react-router-dom'

const menuItems = [
  { label: '대시보드', icon: '📊', path: '/dashboard' },
  { label: '주문관리', icon: '📋', path: '/orders' },
  { label: '펀드현황', icon: '💹', path: '/funds' },
]

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-60 min-h-full flex flex-col py-4">
      {menuItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`
          }
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  )
}

export default Sidebar