import { getFormattedDate } from '@/utils/date-util';
import useMenuStore  from "@/stores/menuStore";

type Section = 'Backend' | 'Frontend' | 'AI';
const Sections: Section[] = ['Backend', 'Frontend', 'AI'];

const getAnchorClassName = (section: Section, activeSection: Section) => {
  return `transition-colors cursor-pointer ${
    activeSection === section
      ? 'text-white font-bold underline underline-offset-4'
      : 'text-blue-200 hover:text-white'
  }`;
};

const Header = () => {
  const dateString = getFormattedDate();
  const {activeSection, setSection} = useMenuStore();

  return (
    <header className="bg-blue-500 text-white h-16 flex items-center px-6 shadow-md">
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
      <div className="ml-auto mr-6 text-sm">{dateString}</div>
    </header>
  )
}

export default Header