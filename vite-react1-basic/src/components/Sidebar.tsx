import { NavLink } from 'react-router-dom'
import useMenuStore from '@/stores/menuStore'
import { cn } from '@/lib/class-utils'

const getNavClassName = ({ isActive }: { isActive: boolean }) => cn(
  'px-6 py-3 transition-colors',
  isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-bold' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
)

const Sidebar = () => {
  const { activeSection, menuItems } = useMenuStore();
  return (
    <aside className="bg-sidebar text-sidebar-foreground w-60 min-h-full flex flex-col py-4 border-r border-sidebar-border transition-colors duration-300">
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