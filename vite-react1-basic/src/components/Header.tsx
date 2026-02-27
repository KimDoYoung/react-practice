import { cn } from '@/lib/class-utils';
import { getFormattedDate } from '@/lib/date-util';
import useMenuStore  from "@/stores/menuStore";
import ThemeSwitcher from './ThemeSwitcher';

type Section = 'Backend' | 'Frontend' | 'AI';
const Sections: Section[] = ['Backend', 'Frontend', 'AI'];

const getAnchorClassName = (section: Section, activeSection: Section) => cn(
  'transition-colors cursor-pointer',
  activeSection === section
    ? 'text-[var(--header-fg)] font-bold underline underline-offset-4'
    : 'text-[var(--header-muted)] hover:text-[var(--header-fg)]'
);

const Header = () => {
  const dateString = getFormattedDate();
  const {activeSection, setSection} = useMenuStore();

  return (
    <header className="bg-[var(--header-bg)] text-[var(--header-fg)] h-16 flex items-center px-6 shadow-md transition-colors duration-300">
      <div className="text-xl font-bold">Oms-technote</div>
      <nav className="flex gap-6 ml-6">
        {Sections.map((section) => (
          <a
            key={section}
            className={getAnchorClassName(section, activeSection)}
            onClick={() => setSection(section)}
          >
            {section}
          </a>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <ThemeSwitcher />
        <span className="text-sm">{dateString}</span>
      </div>
    </header>
  )
}

export default Header