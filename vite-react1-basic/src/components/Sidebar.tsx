import { NavLink } from 'react-router-dom'
import useMenuStore from '@/stores/menuStore'

const getNavClassName = ({ isActive }: { isActive: boolean }) =>  `px-6 py-3 transition-colors ${
    isActive ? 'bg-gray-700 text-white font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
  }`.trim();

const Sidebar = () => {
  const { activeSection, menuItems } = useMenuStore();
  return (
    <aside className="bg-gray-800 text-white w-60 min-h-full flex flex-col py-4">
      <div className="px-6 py-3 font-bold text-lg">{activeSection}</div>
      {menuItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={getNavClassName}
        >
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  )
}

export default Sidebar