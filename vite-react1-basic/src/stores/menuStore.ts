import {create} from 'zustand';

import { type Section, type MenuItem} from '@/types/menu';
import { MENU_MAP } from '@/constants/menuConfig';

interface MenuState {
    activeSection: Section;
    menuItems: MenuItem[];
    setSection: (section: Section) => void;
}

const useMenuStore = create<MenuState>((set) => ({
    activeSection: 'Backend',
    menuItems: MENU_MAP['Backend'],
    setSection: (section) => set(() => ({
        activeSection: section,
        menuItems: MENU_MAP[section],
    })),
}));

export default useMenuStore;